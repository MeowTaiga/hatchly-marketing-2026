import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SHOWCASE_PETS } from '../data/showcasePets';

/** Middle-section bubble flock — static showcase with a soft bob. */
export function PetFlock() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-flock-pet]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 3.2 + (i % 4) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flock" ref={rootRef} aria-label="A flock of Hatchly pets">
      {SHOWCASE_PETS.map((pet, i) => (
        <figure
          key={`${pet.name}-${pet.poseKey}`}
          className={`flock-pet flock-pet-${(i % 10) + 1}`}
          data-flock-pet
        >
          <div className="flock-goo" aria-hidden="true" />
          <img src={pet.imageUrl} alt={`${pet.name} — ${pet.vibe}`} loading="lazy" />
          <figcaption className="flock-caption">
            <strong>{pet.name}</strong>
            <span>{pet.vibe}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
