const DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1370569083266928781/EAz5cIcX_9pud9-qm0eoEDV5auwppwlN9CjjX6mkWboKdAVS_6TkulduWNAdTkmjyqgV';

const VISIT_KEY = 'hatchly_visit_pinged';

let cachedIp: string | null = null;
let ipPromise: Promise<string> | null = null;
let lastClickAt = 0;

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

async function postDiscord(content: string): Promise<void> {
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      keepalive: true,
    });
  } catch {
    // Fire-and-forget — never block UI
  }
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
  const el = target.closest<HTMLElement>(
    'button, input[type="submit"], input[type="button"], [role="button"], a.btn-primary, a.btn-ghost, a.nav-cta, a.cta-pop',
  );
  return el;
}

/** Once per browser session — “someone’s viewing hatchly.me”. */
export async function pingSiteVisit(): Promise<void> {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, '1');
  } catch {
    // private mode / blocked storage — still ping once this load
  }

  const ip = await resolveIp();
  const path = `${window.location.pathname}${window.location.search}` || '/';
  await postDiscord(
    `👀 Someone's viewing **hatchly.me**\n` +
      `• Path: \`${path}\`\n` +
      `• IP: \`${ip}\`\n` +
      `• UA: \`${navigator.userAgent.slice(0, 140)}\``,
  );
}

async function pingButtonClick(el: HTMLElement): Promise<void> {
  const now = Date.now();
  if (now - lastClickAt < 400) return;
  lastClickAt = now;

  const ip = await resolveIp();
  const label = clickLabel(el);
  const path = `${window.location.pathname}${window.location.search}` || '/';
  await postDiscord(
    `🖱️ Click on **hatchly.me**\n` +
      `• Button: \`${label}\`\n` +
      `• Path: \`${path}\`\n` +
      `• IP: \`${ip}\``,
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
