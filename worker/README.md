# paraskcd.com Edge Worker (Cloudflare)

Tiny edge function with two routes:

| Route | Purpose |
|-------|---------|
| `GET /` | NASA APOD proxy — holds `NASA_KEY` server-side so the static portfolio bundle never sees it |
| `POST /send-mail` | Contact form receiver — validates Origin + honeypot + Cloudflare Turnstile token, then relays to MailChannels (DKIM-signed) |

CORS is restricted to `paraskcd.com`, `paraskcd1315.github.io`, and `localhost:3000`. Edit `ALLOWED_ORIGINS` in `src/index.js` if that changes.

## Deploy (first time)

```bash
cd worker
npm install
npx wrangler login                                   # opens browser, links Cloudflare account
npx wrangler kv namespace create RATE_LIMIT_KV       # paste printed id into wrangler.toml
npx wrangler secret put NASA_KEY                     # paste personal NASA key
npx wrangler secret put TURNSTILE_SECRET             # paste Turnstile site secret
npx wrangler deploy
```

`wrangler deploy` prints a URL like `https://apod-proxy.<account>.workers.dev`. The portfolio reads:

- `REACT_APP_MAIL_WORKER_URL` → contact form fetches `${URL}/send-mail`
- `Hero.jsx` constant → APOD proxy URL

## Rate-limit (KV)

`POST /send-mail` is rate-limited to **5 sends per hour per IP** via the `RATE_LIMIT_KV` namespace. The worker reads `CF-Connecting-IP`, looks up `mail:<ip>`, and stores `{ count, windowStart }` JSON with a 1-hour TTL. When the count hits 5 within the same window, the worker returns `429` with a `Retry-After` header.

Create the namespace once:

```bash
npx wrangler kv namespace create RATE_LIMIT_KV
```

The command prints something like:

```
{ binding = "RATE_LIMIT_KV", id = "abc123def456..." }
```

Paste the `id` into `wrangler.toml` (replacing `REPLACE_WITH_KV_NAMESPACE_ID`), then redeploy.

If the KV binding is missing at runtime (e.g. local `wrangler dev` without the namespace), the worker **falls open** — rate-limit check is skipped and requests proceed. Production must keep the binding live.

To clear a stuck IP manually:

```bash
npx wrangler kv key delete --binding=RATE_LIMIT_KV "mail:<ip>"
```

## Rotate a secret

All three rotations follow the same pattern — no redeploy needed. The worker picks up the new value on the next cold start (typically within seconds).

```bash
npx wrangler secret put NASA_KEY            # NASA APOD upstream
npx wrangler secret put TURNSTILE_SECRET    # Turnstile siteverify
npx wrangler secret put DKIM_PRIVATE_KEY    # MailChannels custom DKIM
```

When rotating `DKIM_PRIVATE_KEY`, regenerate the public key via `openssl rsa -in dkim.priv.pem -pubout -outform der | openssl base64 -A` and update the `mailchannels._domainkey.paraskcd.com` TXT record at the same time. Recommended cadence: yearly for `DKIM_PRIVATE_KEY`, immediately after suspected compromise for `TURNSTILE_SECRET`, opportunistic for `NASA_KEY`.

To list which secrets are currently set (without revealing values):

```bash
npx wrangler secret list
```

## Cloudflare Turnstile setup

1. Cloudflare dashboard → Turnstile → **Add site**
   - Domain: `paraskcd.com` (and any preview domains)
   - Widget mode: **Managed** (recommended)
2. Copy the **Site Key** → portfolio env: `REACT_APP_TURNSTILE_SITE_KEY=<site-key>`
3. Copy the **Secret Key** → worker secret: `npx wrangler secret put TURNSTILE_SECRET`
4. Redeploy portfolio (so the new env var bakes into the static bundle).

### Local dev bypass

If `REACT_APP_TURNSTILE_SITE_KEY` is unset, the form auto-submits a `dev-skip` token. The worker accepts that token **only when `Origin` starts with `http://localhost`** — never in production.

## DNS records (MailChannels)

Three TXT records on `paraskcd.com` so MailChannels accepts and signs outgoing mail. Add them in **Cloudflare dashboard → DNS → Records**.

### 1. SPF — authorize MailChannels relay

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `paraskcd.com` (root, "@") |
| Content | `v=spf1 a mx include:relay.mailchannels.net ~all` |
| TTL | Auto |

If a SPF record already exists, *merge* the include — never duplicate. Multiple SPF TXT records on the same name break SPF entirely.

### 2. Domain lockdown — block other Cloudflare accounts from spoofing

MailChannels honors a per-domain TXT record listing which Cloudflare account subdomains are allowed to send as `paraskcd.com`. Find your account subdomain in the Workers & Pages dashboard ("Subdomain" — looks like `paraskhanchandani1315.workers.dev`).

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `_mailchannels.paraskcd.com` |
| Content | `v=mc1 cfid=paraskhanchandani1315.workers.dev` |
| TTL | Auto |

### 3. DKIM — let receivers verify the signature

Generate a 2048-bit RSA keypair (one-time):

```bash
openssl genrsa 2048 -out dkim.priv.pem
openssl rsa -in dkim.priv.pem -pubout -outform der | openssl base64 -A > dkim.pub.b64
```

`dkim.priv.pem` → goes into the worker secret `DKIM_PRIVATE_KEY` (paste the body **between** `-----BEGIN…-----` and `-----END…-----`, on a single line, no line breaks).

`dkim.pub.b64` → goes into a TXT record:

| Field | Value |
|-------|-------|
| Type | `TXT` |
| Name | `mailchannels._domainkey.paraskcd.com` |
| Content | `v=DKIM1; p=<paste contents of dkim.pub.b64>` |
| TTL | Auto |

Then set the worker secrets:

```bash
npx wrangler secret put DKIM_DOMAIN          # paraskcd.com
npx wrangler secret put DKIM_SELECTOR        # mailchannels
npx wrangler secret put DKIM_PRIVATE_KEY     # single-line key body
```

When all three are set, the worker passes them to MailChannels' `personalizations[0].dkim_*` so the message is signed by `mailchannels._domainkey.paraskcd.com`. When any of them is unset, MailChannels falls back to its Cloudflare-default DKIM identity (still delivers — just shows "via mailchannels.net" in some clients).

**Cleanup:** delete `dkim.priv.pem` and `dkim.pub.b64` from your local disk after pasting. They're never needed again — rotate by generating a new keypair and updating both the secret and the TXT record.

## Local dev

```bash
echo 'NASA_KEY="<key>"' > .dev.vars       # gitignored
echo 'TURNSTILE_SECRET="<secret>"' >> .dev.vars
# Optional, only if you want to test custom DKIM locally:
# echo 'DKIM_DOMAIN="paraskcd.com"' >> .dev.vars
# echo 'DKIM_SELECTOR="mailchannels"' >> .dev.vars
# echo 'DKIM_PRIVATE_KEY="<single-line-key>"' >> .dev.vars
npx wrangler dev
# worker now runs at http://localhost:8787
```

Point the portfolio at it via `.env.development.local`:

```
REACT_APP_MAIL_WORKER_URL=http://localhost:8787
```

## Send-mail request shape

```http
POST /send-mail
Origin: https://paraskcd.com
Content-Type: application/json

{
  "name": "...",
  "email": "...",
  "subject": "...",
  "message": "...",
  "honeypot": "",
  "turnstileToken": "..."
}
```

Responses:

| Status | Meaning |
|--------|---------|
| `204` | Accepted and relayed to MailChannels |
| `400` | Validation failed (`{ error, fields }`) — invalid JSON, bad name/email/subject/message |
| `403` | Origin denied OR Turnstile token missing/failed |
| `405` | Wrong HTTP method |
| `429` | Rate limit exceeded (`{ error, retryAfter }`) — 5 sends per IP per hour. `Retry-After` header set in seconds |
| `502` | MailChannels relay failed (`{ error, detail }`) — usually a missing/wrong DNS record |

## Cost

Free. Cloudflare Workers free tier: 100,000 requests/day. MailChannels is free for traffic originating from Cloudflare Workers.
