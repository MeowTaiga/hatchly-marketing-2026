/**
 * Hatchly API base URL.
 * - Local: VITE_API_URL or http://localhost:5000
 * - Production build: VITE_API_URL or https://api.hatchly.me
 */
export function apiBase(): string {
  const configured = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  if (configured) return configured;
  if (import.meta.env.DEV) return 'http://localhost:5000';
  return 'https://api.hatchly.me';
}

type WaitlistResult =
  | { ok: true; alreadyJoined: boolean; message: string }
  | { ok: false; message: string };

/**
 * Join the beta waitlist → POST /waitlist on hatchly-server-2026
 * (persists to the `waitlists` collection).
 */
export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  const url = `${apiBase()}/waitlist`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'marketing-2026' }),
    });

    const payload = (await response.json().catch(() => null)) as
      | {
          success?: boolean;
          data?: { message?: string; alreadyJoined?: boolean };
          message?: string;
          error?: string;
        }
      | null;

    if (!response.ok) {
      return {
        ok: false,
        message: payload?.error || payload?.message || 'Failed to join waitlist',
      };
    }

    const message =
      payload?.data?.message || payload?.message || 'Successfully joined the beta waitlist';
    const alreadyJoined = Boolean(payload?.data?.alreadyJoined) || /already/i.test(message);

    return { ok: true, alreadyJoined, message };
  } catch {
    return { ok: false, message: 'Network error — please try again' };
  }
}
