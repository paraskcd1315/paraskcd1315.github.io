/**
 * NASA APOD proxy — Cloudflare Worker.
 *
 * Holds the NASA API key as an encrypted secret server-side. The
 * browser only sees this worker's URL; the real key never leaves
 * Cloudflare's vault, never lands in the static JS bundle, and never
 * appears in git.
 *
 * Allowed origins are restricted so random sites can't burn through
 * your rate limit by hot-linking this proxy.
 */

const ALLOWED_ORIGINS = ['https://paraskcd.com', 'https://paraskcd1315.github.io', 'http://localhost:3000'];

function corsHeaders(req) {
	const origin = req.headers.get('Origin');
	const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
	return {
		'access-control-allow-origin': allow,
		vary: 'Origin'
	};
}

export default {
	async fetch(req, env) {
		// CORS preflight (defensive — APOD is a simple GET, browser likely
		// won't preflight, but answer correctly if it does).
		if (req.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					...corsHeaders(req),
					'access-control-allow-methods': 'GET, OPTIONS',
					'access-control-allow-headers': 'content-type',
					'access-control-max-age': '86400'
				}
			});
		}

		if (req.method !== 'GET') {
			return new Response('Method not allowed', { status: 405 });
		}

		if (!env.NASA_KEY) {
			return new Response(JSON.stringify({ error: 'NASA_KEY secret not configured' }), {
				status: 500,
				headers: { 'content-type': 'application/json', ...corsHeaders(req) }
			});
		}

		const url = new URL(req.url);
		const date = url.searchParams.get('date') || '';

		// Validate date shape (YYYY-MM-DD) before forwarding — avoids using
		// the proxy as an arbitrary URL appender.
		if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return new Response(JSON.stringify({ error: 'Invalid date format' }), {
				status: 400,
				headers: { 'content-type': 'application/json', ...corsHeaders(req) }
			});
		}

		const upstream = `https://api.nasa.gov/planetary/apod?api_key=${env.NASA_KEY}${date ? `&date=${date}` : ''}`;

		const upstreamRes = await fetch(upstream, {
			cf: { cacheTtl: date ? 86400 : 300, cacheEverything: true }
		});

		// Per-date responses never change → cache 24h. "Today" varies → 5min.
		const cacheTtl = date ? 86400 : 300;

		return new Response(upstreamRes.body, {
			status: upstreamRes.status,
			headers: {
				'content-type': 'application/json',
				'cache-control': `public, max-age=${cacheTtl}`,
				...corsHeaders(req)
			}
		});
	}
};
