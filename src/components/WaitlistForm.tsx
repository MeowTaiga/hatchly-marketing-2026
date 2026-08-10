import { useState, type FormEvent } from 'react';
import { joinWaitlist } from '../lib/api';

type Props = {
  id?: string;
  ctaLabel?: string;
};

export function WaitlistForm({ id = 'waitlist', ctaLabel = 'Save my spot' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setMessage('');

    const result = await joinWaitlist(email.trim());
    if (!result.ok) {
      setStatus('err');
      setMessage(result.message);
      return;
    }

    setStatus('ok');
    setMessage(
      result.alreadyJoined
        ? "You're already on the list — see you September 21!"
        : "You're in! We'll ping you before beta opens.",
    );
    setEmail('');
  }

  return (
    <form className="waitlist-form" id={id} onSubmit={onSubmit}>
      <label htmlFor={`${id}-email`}>Email</label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@cozy.email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
      />
      <button className="btn-primary cta-pop" type="submit" disabled={status === 'loading'}>
        <span>{status === 'loading' ? 'Joining…' : ctaLabel}</span>
      </button>
      <p className={`form-status ${status === 'ok' ? 'ok' : status === 'err' ? 'err' : ''}`} role="status">
        {message}
      </p>
    </form>
  );
}
