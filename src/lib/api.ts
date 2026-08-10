type WaitlistResult =
  | { ok: true; alreadyJoined: boolean; message: string }
  | { ok: false; message: string };

/**
 * Join the beta waitlist.
 * Prefers the 2026 API (`VITE_API_URL/waitlist`), falls back to legacy
 * `https://api.hatchly.me/api/waitlist` so signup works before the new API is deployed.
 */
export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  const configured = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  const endpoints = configured
    ? [`${configured}/waitlist`]
    : ['https://api.hatchly.me/api/waitlist'];

  let lastError = 'Failed to join waitlist';

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'marketing-2026' }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; data?: { message?: string; alreadyJoined?: boolean }; message?: string; error?: string }
        | null;

      if (!response.ok) {
        lastError = payload?.error || payload?.message || lastError;
        continue;
      }

      const message =
        payload?.data?.message || payload?.message || 'Successfully joined the beta waitlist';
      const alreadyJoined = Boolean(payload?.data?.alreadyJoined) || /already/i.test(message);

      return { ok: true, alreadyJoined, message };
    } catch {
      lastError = 'Network error — please try again';
    }
  }

  return { ok: false, message: lastError };
}
