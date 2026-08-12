import type { CSSProperties, ReactNode } from 'react';
import type { GameItem } from '../data/gameItems';

export type PhonePopItem = GameItem & {
  /** Orbit slot 0–7 around the phone */
  slot?: number;
};

type PhoneStageProps = {
  sceneUrl: string;
  sceneAlt: string;
  /** Custom in-phone UI (replaces full-bleed scene image) */
  screen?: ReactNode;
  items?: PhonePopItem[];
  /** Optional big result floating over the phone chin (or center) */
  heroItem?: GameItem;
  /** Small items layered on the hero (e.g. seeds on soil) */
  heroStack?: GameItem[];
  /** Where the hero sits relative to the phone */
  heroAlign?: 'chin' | 'center';
  badge?: string;
  className?: string;
  sceneKey?: string;
};

/** CSS phone chrome — scene/UI on-screen, items popping out around the bezel. */
export function PhoneStage({
  sceneUrl,
  sceneAlt,
  screen,
  items = [],
  heroItem,
  heroStack = [],
  heroAlign = 'chin',
  badge,
  className = '',
  sceneKey,
}: PhoneStageProps) {
  return (
    <div className={`phone-stage ${className}`.trim()} data-phone-stage>
      <div className="phone-stage-backdrop" aria-hidden="true">
        <img src={sceneUrl} alt="" />
      </div>

      <div className="phone-stage-core">
        <ul className="phone-orbit" aria-label="Items popping from the phone">
          {items.map((item, i) => {
            const slot = item.slot ?? i % 8;
            return (
              <li
                key={item.id}
                className={`phone-pop phone-pop-${slot}`}
                data-pop
                data-pop-delay={0.06 * i}
                data-float
                style={{ '--slot': slot } as CSSProperties}
              >
                <img src={item.imageUrl} alt={item.label} loading="lazy" />
              </li>
            );
          })}
        </ul>

        <div className="phone-bezel" data-pop data-pop-delay={0.05}>
          <div className="phone-notch" aria-hidden="true" />
          <div className={`phone-screen ${screen ? 'has-ui' : ''}`}>
            {screen ?? (
              <img key={sceneKey ?? sceneUrl} src={sceneUrl} alt={sceneAlt} />
            )}
          </div>
          <div className="phone-home" aria-hidden="true" />
          {badge ? <p className="phone-badge">{badge}</p> : null}
        </div>

        {heroItem ? (
          <div
            className={`phone-hero-item is-${heroAlign}`}
            data-pop
            data-pop-delay={0.28}
            data-float
          >
            <div className="phone-hero-stack">
              <img className="phone-hero-base" src={heroItem.imageUrl} alt={heroItem.label} />
              {heroStack.map((bit, i) => (
                <img
                  key={bit.id}
                  className={`phone-hero-bit phone-hero-bit-${i}`}
                  src={bit.imageUrl}
                  alt={bit.label}
                  loading="lazy"
                />
              ))}
            </div>
            <span>{heroItem.label}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
