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
npx wrangler login                       # opens browser, links Cloudflare account
npx wrangler secret put NASA_KEY         # paste personal NASA key
npx wrangler secret put TURNSTILE_SECRET # paste Turnstile site secret
npx wrangler deploy
```

`wrangler deploy` prints a URL like `https://apod-proxy.<account>.workers.dev`. The portfolio reads:

- `REACT_APP_MAIL_WORKER_URL` → contact form fetches `${URL}/send-mail`
- `Hero.jsx` constant → APOD proxy URL

## Rotate a secret

```bash
npx wrangler secret put NASA_KEY
# or
npx wrangler secret put TURNSTILE_SECRET
```

No redeploy required — the worker picks up the new value on its next cold start.

## Cloudflare Turnstile setup

1. Cloudflare dashboard → Turnstile → **Add site**
   - Domain: `paraskcd.com` (and any preview domains)
   - Widget mode: **Managed** (recommended)
2. Copy the **Site Key** → portfolio env: `REACT_APP_TURNSTILE_SITE_KEY=<site-key>`
3. Copy the **Secret Key** → worker secret: `npx wrangler secret put TURNSTILE_SECRET`
4. Redeploy portfolio (so the new env var bakes into the static bundle).

### Local dev bypass

If `REACT_APP_TURNSTILE_SITE_KEY` is unset, the form auto-submits a `dev-skip` token. The worker accepts that token **only when `Origin` starts with `http://localhost`** — never in production.

## Local dev

```bash
echo 'NASA_KEY="<key>"' > .dev.vars       # gitignored
echo 'TURNSTILE_SECRET="<secret>"' >> .dev.vars
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
| `204` | Accepted (real send wires in PORT-130 / MailChannels) |
| `400` | Validation failed (`{ error, fields }`) — invalid JSON, bad name/email/subject/message |
| `403` | Origin denied OR Turnstile token missing/failed |
| `405` | Wrong HTTP method |

## Cost

Free. Cloudflare Workers free tier: 100,000 requests/day. MailChannels (Step 3) is free for Workers traffic.
