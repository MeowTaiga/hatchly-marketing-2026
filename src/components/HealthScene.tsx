import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SHOWCASE_PETS } from '../data/showcasePets';
import { COOKING, CROPS, TRADE_ITEMS } from '../data/gameItems';

const CHAT_PET = SHOWCASE_PETS.find((p) => p.name === 'Wisp') ?? SHOWCASE_PETS[0];
const DIARY_PET = SHOWCASE_PETS.find((p) => p.name === 'Kitten') ?? SHOWCASE_PETS[4];

const CHAT_LINES = [
  { from: 'user', text: 'I skipped lunch and feel blah…' },
  { from: 'pet', text: 'Hydrate first, tiny snack second — I’m proud you checked in.' },
  { from: 'user', text: 'Okay… apple and water.' },
  { from: 'pet', text: 'That’s a win. Want me to log it with you?' },
] as const;

const FOOD_LOG = [
  TRADE_ITEMS[0], // apple
  CROPS[1], // carrot
  COOKING.meals[1], // tomato soup
  {
    id: 'sliced_watermelon',
    label: 'Watermelon',
    imageUrl:
      'https://images.hatchly.me/game-items/sliced_watermelon/d8ab3164-176c-4bf8-9c6c-f79c60835345.png',
  },
];

/** Animated pet chat + health logging / diary beats. */
export function HealthScene() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = chatRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bubbles = gsap.utils.toArray<HTMLElement>('[data-chat-bubble]', root);
    const ctx = gsap.context(() => {
      gsap.set(bubbles, { opacity: 0, y: 16, scale: 0.92 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
      bubbles.forEach((bubble, i) => {
        tl.to(
          bubble,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.7)',
          },
          i * 1.15,
        );
      });
      tl.to(bubbles, {
        opacity: 0,
        y: -8,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power1.in',
        delay: 1.4,
      });

      gsap.to('[data-chat-pet]', {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="health-scene">
      <div className="health-chat" ref={chatRef} data-health-block>
        <div className="health-chat-pet" data-chat-pet>
          <img src={CHAT_PET.imageUrl} alt={CHAT_PET.name} />
          <span>{CHAT_PET.name}</span>
        </div>
        <div className="health-chat-thread" aria-label="Sample chat with your pet">
          {CHAT_LINES.map((line, i) => (
            <div
              key={`${line.from}-${i}`}
              className={`health-bubble is-${line.from}`}
              data-chat-bubble
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
      <p className="health-caption">
        AI chat with your pet — gentle check-ins that feel like a friend, not a lecture.
      </p>
    </div>
  );
}

export function HealthHabits() {
  return (
    <div className="health-habits">
      <article className="health-habit" data-health-block>
        <div className="health-habit-copy">
          <h4>Weight &amp; eating habits</h4>
          <p>Log meals and weigh-ins without the guilt spiral — progress stays soft and visual.</p>
        </div>
        <div className="health-habit-art weight-stage" aria-label="Food and weight logging">
          <div className="weight-readout">
            <span className="weight-label">Today</span>
            <strong>142.6 lb</strong>
            <span className="weight-delta">−0.4 this week</span>
          </div>
          <ul className="item-scatter">
            {FOOD_LOG.map((food) => (
              <li key={food.id}>
                <img src={food.imageUrl} alt={food.label} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="health-habit" data-health-block>
        <div className="health-habit-copy">
          <h4>Diary</h4>
          <p>Jot moods and notes — your pet remembers the vibe, not just the numbers.</p>
        </div>
        <div className="health-habit-art diary-stage">
          <img className="diary-pet" src={DIARY_PET.imageUrl} alt={DIARY_PET.name} />
          <div className="diary-note" aria-label="Sample diary entry">
            <p className="diary-mood">Feeling: hopeful</p>
            <p>“Walked after dinner. Proud I showed up even when I didn’t want to.”</p>
            <p className="diary-stamp">Saved to diary · +XP</p>
          </div>
        </div>
      </article>
    </div>
  );
}
