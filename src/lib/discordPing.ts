import { apiBase } from './api';

const VISIT_KEY = 'hatchly_visit_pinged';

/** Off when VITE_DISCORD_PING_ENABLED=false (local .env). On when unset/true (prod). */
function isDiscordPingEnabled(): boolean {
  return import.meta.env.VITE_DISCORD_PING_ENABLED !== 'false';
}

let lastClickAt = 0;

type PingPayload = {
  kind: 'visit' | 'click';
  url: string;
  userAgent: string;
  label?: string;
};

async function postPing(payload: PingPayload): Promise<void> {
  if (!isDiscordPingEnabled()) return;
  try {
    await fetch(`${apiBase()}/analytics/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

/** Once per browser session — cute “visitor spotted” card via API. */
export async function pingSiteVisit(): Promise<void> {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, '1');
  } catch {
    // private mode / blocked storage — still ping once this load
  }

  await postPing({
    kind: 'visit',
    url: pageUrl(),
    userAgent: navigator.userAgent,
  });
}

async function pingButtonClick(el: HTMLElement): Promise<void> {
  const now = Date.now();
  if (now - lastClickAt < 400) return;
  lastClickAt = now;

  await postPing({
    kind: 'click',
    url: pageUrl(),
    userAgent: navigator.userAgent,
    label: clickLabel(el),
  });
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
