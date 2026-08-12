const DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1370569083266928781/EAz5cIcX_9pud9-qm0eoEDV5auwppwlN9CjjX6mkWboKdAVS_6TkulduWNAdTkmjyqgV';

const EMBED_PINK = 0xff6b9d;
const FOOTER = "Let's make their day magical! (ノ◕ヮ◕)ノ*:・ﾟ✧";

type PingBody = {
  kind?: 'visit' | 'click';
  url?: string;
  userAgent?: string;
  label?: string;
};

function clientIp(req: { headers: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.trim();
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0].trim();
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();
  return 'unknown';
}

function buildEmbed(body: PingBody, ip: string) {
  const url = (body.url || 'https://hatchly.me/').slice(0, 500);
  const ua = (body.userAgent || 'unknown').slice(0, 1024);
  const label = (body.label || 'button').slice(0, 120);

  if (body.kind === 'click') {
    return {
      title: '✨ Hatchly Click Spotted! ✨',
      description: `A User clicked **${label}** on ${url}`,
      color: EMBED_PINK,
      fields: [
        { name: 'Clicked', value: label, inline: false },
        { name: 'Browser', value: ua, inline: false },
        { name: 'IP Address', value: ip, inline: false },
      ],
      footer: { text: FOOTER },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    title: '✨ Hatchly Visitor Spotted! ✨',
    description: `A User has visited ${url}`,
    color: EMBED_PINK,
    fields: [
      { name: 'Browser', value: ua, inline: false },
      { name: 'IP Address', value: ip, inline: false },
    ],
    footer: { text: FOOTER },
    timestamp: new Date().toISOString(),
  };
}

/** Proxies cute Discord cards server-side (avoids browser CORS). */
export default async function handler(
  req: {
    method?: string;
    body?: PingBody | string;
    headers: Record<string, string | string[] | undefined>;
  },
  res: {
    status: (code: number) => { json: (body: unknown) => void; end: () => void };
    setHeader: (name: string, value: string) => void;
  },
) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  let body: PingBody = {};
  try {
    body = typeof req.body === 'string' ? (JSON.parse(req.body) as PingBody) : (req.body ?? {});
  } catch {
    res.status(400).json({ ok: false, error: 'bad_json' });
    return;
  }

  const embed = buildEmbed(body, clientIp(req));

  try {
    const discordRes = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text().catch(() => '');
      res.status(502).json({ ok: false, error: 'discord_failed', status: discordRes.status, text });
      return;
    }

    res.status(204).end();
  } catch {
    res.status(502).json({ ok: false, error: 'discord_unreachable' });
  }
}
