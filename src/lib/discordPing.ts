const DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1370569083266928781/EAz5cIcX_9pud9-qm0eoEDV5auwppwlN9CjjX6mkWboKdAVS_6TkulduWNAdTkmjyqgV';

/** Hatchly pink — left bar on the cute Discord card */
const EMBED_PINK = 0xff6b9d;

const FOOTER = "Let's make their day magical! (ノ◕ヮ◕)ノ*:・ﾟ✧";

const VISIT_KEY = 'hatchly_visit_pinged';

/** Off when VITE_DISCORD_PING_ENABLED=false (local .env). On when unset/true (prod). */
function isDiscordPingEnabled(): boolean {
  return import.meta.env.VITE_DISCORD_PING_ENABLED !== 'false';
}

let cachedIp: string | null = null;
let ipPromise: Promise<string> | null = null;
let lastClickAt = 0;

type DiscordEmbed = {
  title: string;
  description: string;
  color: number;
  fields: { name: string; value: string; inline?: boolean }[];
  footer: { text: string };
  timestamp: string;
};

async function resolveIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  if (!ipPromise) {
    ipPromise = fetch('https://api.ipify.org?format=json')
      .then((r) => r.json())
      .then((data: { ip?: string }) => {
        cachedIp = data.ip?.trim() || 'unknown';
        return cachedIp;
      })
      .catch(() => {
        cachedIp = 'unknown';
        return cachedIp;
      });
  }
  return ipPromise;
}

async function postEmbed(embed: DiscordEmbed): Promise<void> {
  if (!isDiscordPingEnabled()) return;
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
      keepalive: true,
    });
  } catch {
    // Fire-and-forget — never block UI
  }
}

function pageUrl(): string {
  return window.location.href;
}

function clickLabel(el: HTMLElement): string {
  const aria = el.getAttribute('aria-label')?.trim();
  if (aria) return aria;

  const text = el.textContent?.replace(/\s+/g, ' ').trim();
  if (text) return text.slice(0, 120);

  const href = el.getAttribute('href');
  if (href) return href;

  const type = el.getAttribute('type');
  if (type) return `${el.tagName.toLowerCase()}[${type}]`;

  return el.tagName.toLowerCase();
}

function isTrackableClick(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>(
    'button, input[type="submit"], input[type="button"], [role="button"], a.btn-primary, a.btn-ghost, a.nav-cta, a.cta-pop',
  );
}

function cuteCard(opts: {
  title: string;
  description: string;
  fields: { name: string; value: string }[];
}): DiscordEmbed {
  return {
    title: opts.title,
    description: opts.description,
    color: EMBED_PINK,
    fields: opts.fields.map((f) => ({ ...f, inline: false })),
    footer: { text: FOOTER },
    timestamp: new Date().toISOString(),
  };
}

/** Once per browser session — cute “visitor spotted” card. */
export async function pingSiteVisit(): Promise<void> {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, '1');
  } catch {
    // private mode / blocked storage — still ping once this load
  }

  const ip = await resolveIp();
  await postEmbed(
    cuteCard({
      title: '✨ Hatchly Visitor Spotted! ✨',
      description: `A User has visited ${pageUrl()}`,
      fields: [
        { name: 'Browser', value: navigator.userAgent.slice(0, 1024) || 'unknown' },
        { name: 'IP Address', value: ip },
      ],
    }),
  );
}

async function pingButtonClick(el: HTMLElement): Promise<void> {
  const now = Date.now();
  if (now - lastClickAt < 400) return;
  lastClickAt = now;

  const ip = await resolveIp();
  const label = clickLabel(el);
  await postEmbed(
    cuteCard({
      title: '✨ Hatchly Click Spotted! ✨',
      description: `A User clicked **${label}** on ${pageUrl()}`,
      fields: [
        { name: 'Clicked', value: label },
        { name: 'Browser', value: navigator.userAgent.slice(0, 1024) || 'unknown' },
        { name: 'IP Address', value: ip },
      ],
    }),
  );
}

/** Capture button / CTA clicks sitewide. */
export function installClickPing(): void {
  document.addEventListener(
    'click',
    (event) => {
      const el = isTrackableClick(event.target);
      if (!el) return;
      void pingButtonClick(el);
    },
    true,
  );
}
