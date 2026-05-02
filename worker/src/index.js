/**
 * paraskcd.com edge worker.
 *
 * Routes:
 *   GET  /            → NASA APOD proxy (holds NASA_KEY server-side)
 *   POST /send-mail   → Contact form receiver (validates Origin + honeypot
 *                       + Turnstile token; relays to MailChannels)
 *
 * Allowed origins are restricted so random sites can't burn through
 * the rate limit by hot-linking this worker.
 */

const ALLOWED_ORIGINS = [
  "https://paraskcd.com",
  "https://paraskcd1315.github.io",
  "http://localhost:3000",
];

const MAX_NAME = 80;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_DEV_TOKEN = "dev-skip";

const MAILCHANNELS_URL = "https://api.mailchannels.net/tx/v1/send";
const MAIL_TO_EMAIL = "dev@paraskcd.com";
const MAIL_TO_NAME = "Paras KCD";
const MAIL_FROM_EMAIL = "noreply@paraskcd.com";
const MAIL_FROM_NAME = "paraskcd.com contact form";

function corsHeaders(req) {
  const origin = req.headers.get("Origin");
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "access-control-allow-origin": allow,
    vary: "Origin",
  };
}

function jsonResponse(status, body, req) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...corsHeaders(req),
    },
  });
}

function originAllowed(req) {
  const origin = req.headers.get("Origin");
  return Boolean(origin) && ALLOWED_ORIGINS.includes(origin);
}

async function verifyTurnstile(token, env, req) {
  const origin = req.headers.get("Origin") || "";
  if (token === TURNSTILE_DEV_TOKEN && origin.startsWith("http://localhost")) {
    return true;
  }
  if (!env.TURNSTILE_SECRET) return false;
  const params = new URLSearchParams();
  params.append("secret", env.TURNSTILE_SECRET);
  params.append("response", token);
  const remoteIp = req.headers.get("CF-Connecting-IP");
  if (remoteIp) params.append("remoteip", remoteIp);
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendViaMailChannels({ name, email, subject, message }) {
  const plain = `From: ${name} <${email}>
Subject: ${subject}

${message}

---
Sent via paraskcd.com contact form.`;

  const payload = {
    personalizations: [{ to: [{ email: MAIL_TO_EMAIL, name: MAIL_TO_NAME }] }],
    from: { email: MAIL_FROM_EMAIL, name: MAIL_FROM_NAME },
    reply_to: { email, name },
    subject: `[paraskcd.com] ${subject}`,
    content: [{ type: "text/plain", value: plain }],
  };

  const res = await fetch(MAILCHANNELS_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`MailChannels ${res.status}: ${text.slice(0, 200)}`);
  }
}

function validateMailFields(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || name.length > MAX_NAME) errors.name = "Invalid name.";
  if (!email || !EMAIL_RE.test(email)) errors.email = "Invalid email.";
  if (!subject || subject.length > MAX_SUBJECT)
    errors.subject = "Invalid subject.";
  if (!message || message.length > MAX_MESSAGE)
    errors.message = "Invalid message.";
  return { errors, normalized: { name, email, subject, message } };
}

async function handleSendMail(req, env) {
  if (!originAllowed(req)) {
    return jsonResponse(403, { error: "Origin not allowed" }, req);
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON" }, req);
  }
  if (typeof body.honeypot === "string" && body.honeypot.trim() !== "") {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }
  const { errors, normalized } = validateMailFields(body);
  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      400,
      { error: "Validation failed", fields: errors },
      req,
    );
  }
  const token =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token) {
    return jsonResponse(403, { error: "Turnstile token missing" }, req);
  }
  const verified = await verifyTurnstile(token, env, req);
  if (!verified) {
    return jsonResponse(403, { error: "Turnstile verification failed" }, req);
  }

  try {
    await sendViaMailChannels(normalized);
  } catch (err) {
    return jsonResponse(
      502,
      {
        error: "Mail relay failed",
        detail: err instanceof Error ? err.message : String(err),
      },
      req,
    );
  }

  return new Response(null, { status: 204, headers: corsHeaders(req) });
}

async function handleApod(req, env) {
  if (!env.NASA_KEY) {
    return jsonResponse(500, { error: "NASA_KEY secret not configured" }, req);
  }

  const url = new URL(req.url);
  const date = url.searchParams.get("date") || "";

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return jsonResponse(400, { error: "Invalid date format" }, req);
  }

  const datePart = date ? `&date=${date}` : "";
  const upstream = `https://api.nasa.gov/planetary/apod?api_key=${env.NASA_KEY}${datePart}`;

  const upstreamRes = await fetch(upstream, {
    cf: { cacheTtl: date ? 86400 : 300, cacheEverything: true },
  });

  const cacheTtl = date ? 86400 : 300;

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: {
      "content-type": "application/json",
      "cache-control": `public, max-age=${cacheTtl}`,
      ...corsHeaders(req),
    },
  });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      const isMail = url.pathname === "/send-mail";
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(req),
          "access-control-allow-methods": isMail
            ? "POST, OPTIONS"
            : "GET, OPTIONS",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
        },
      });
    }

    if (url.pathname === "/send-mail") {
      if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
      }
      return handleSendMail(req, env);
    }

    if (req.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }
    return handleApod(req, env);
  },
};
