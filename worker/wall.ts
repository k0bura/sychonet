interface Env {
  WALL_KV: KVNamespace;
  ALLOWED_ORIGINS: string;
}

interface WallEntry {
  name: string;
  location: string;
  message: string;
  date: string;
}

const MAX_NAME = 20;
const MAX_MSG = 140;
const MAX_MESSAGES = 500;
const RATE_LIMIT_SEC = 60;

const PREFIXES = [
  'Ne0n', 'V4nta', 'H3x', 'Z3ro', 'V0id', 'T0xic', 'Shad0w', 'C1pher',
  'N3xus', 'Bl1ght', '0mega', 'Dark', 'Pulse', 'Vect0r', 'Raz0r',
  'Mal1ce', 'Specter', '0bsidian', 'Flux', 'C1nder', 'Hav0c',
  'Kernel', 'Ven0m', 'Warp', 'Xen0', 'Dr1ft', 'Sable', 'Fract',
  'Dusk', 'Quanta'
];

const SUFFIXES = [
  'C0re', 'Gr1d', 'Hub', 'Vault', 'F0rge', 'Cache', 'Sect0r',
  'Relay', 'Matr1x', 'Archive', 'Shell', 'C1rcuit', 'Subnet',
  'Pr0xy', 'Terminal', 'Databank', 'Sanctum', 'Lab', 'Array',
  'Mainframe', 'Cluster', 'Gateway', 'Sandbox', 'N0de', 'Pipeline',
  'Backd00r', 'Interface', 'Module', 'Chamber'
];
function hashColo(colo: string): number {
  let h = 0;
  for (let i = 0; i < colo.length; i++) {
    h = (h * 31 + colo.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

async function getBoardName(colo: string, kv: KVNamespace): Promise<string> {
  const key = `board:${colo}`;
  const cached = await kv.get(key);
  if (cached) return cached;

  const h = hashColo(colo);
  const usePrefix = h % 2 === 0;
  let name: string;
  if (usePrefix) {
    name = PREFIXES[h % PREFIXES.length] + colo;
  } else {
    name = colo + '-' + SUFFIXES[h % SUFFIXES.length];
  }

  await kv.put(key, name);
  return name;
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = (env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim());
    const reqOrigin = request.headers.get('Origin') || '';
    const origin = allowed.includes('*') ? '*' : allowed.includes(reqOrigin) ? reqOrigin : allowed[0];
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname !== '/api/wall') {
      return json({ error: 'Not found' }, 404, origin);
    }

    if (request.method === 'GET') {
      const raw = await env.WALL_KV.get('messages');
      const messages: WallEntry[] = raw ? JSON.parse(raw) : [];
      return json(messages, 200, origin);
    }

    if (request.method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const rateKey = `rate:${ip}`;
      const existing = await env.WALL_KV.get(rateKey);
      if (existing) {
        return json({ error: 'Slow down. 1 message per minute.' }, 429, origin);
      }

      let body: { name?: string; message?: string };
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Invalid JSON' }, 400, origin);
      }

      const name = (body.name || 'ANONYMOUS').trim().slice(0, MAX_NAME);
      const message = (body.message || '').trim().slice(0, MAX_MSG);

      if (!message) {
        return json({ error: 'Message is required' }, 400, origin);
      }

      const cf = (request as any).cf || {};
      const colo = (cf.colo || '???').toUpperCase();
      const location = await getBoardName(colo, env.WALL_KV);

      const entry: WallEntry = {
        name,
        location,
        message,
        date: new Date().toISOString(),
      };

      const raw = await env.WALL_KV.get('messages');
      const messages: WallEntry[] = raw ? JSON.parse(raw) : [];
      messages.unshift(entry);
      if (messages.length > MAX_MESSAGES) messages.length = MAX_MESSAGES;

      await env.WALL_KV.put('messages', JSON.stringify(messages));
      await env.WALL_KV.put(rateKey, '1', { expirationTtl: RATE_LIMIT_SEC });

      return json(entry, 201, origin);
    }

    return json({ error: 'Method not allowed' }, 405, origin);
  },
};
