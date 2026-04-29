# APOD Proxy (Cloudflare Worker)

Tiny edge function that holds the NASA APOD API key server-side and proxies the browser's calls. The portfolio's `Hero.jsx` calls *this* URL instead of `api.nasa.gov` directly, so the key never lands in the static JS bundle.

## Deploy (first time)

```bash
cd worker
npm install
npx wrangler login        # opens browser, links to your Cloudflare account
npx wrangler secret put NASA_KEY
# paste your personal NASA key when prompted (encrypted at rest)
npx wrangler deploy
```

`wrangler deploy` prints a URL like:

```
https://apod-proxy.<your-account>.workers.dev
```

Copy that URL. The portfolio's `Hero.jsx` reads it from a constant — paste the URL in there, commit + redeploy the portfolio.

## Rotate the key later

```bash
npx wrangler secret put NASA_KEY
# paste new key
```

No redeploy required. The Worker picks up the new secret on its next cold start.

## Local dev (optional)

```bash
echo 'NASA_KEY="<your-key>"' > .dev.vars   # gitignored
npx wrangler dev
# proxy now runs at http://localhost:8787
```

## Allowed origins

CORS is restricted to `paraskcd.com`, `paraskcd1315.github.io`, and `localhost:3000`. Edit `ALLOWED_ORIGINS` in `src/index.js` if that changes.

## Cost

Free. Cloudflare Workers free tier is 100,000 requests/day — plenty for portfolio traffic.
