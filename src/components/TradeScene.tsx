import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SHOWCASE_PETS } from '../data/showcasePets';
import {
  BUGS,
  COOKING,
  CRAFT_BITS,
  CROPS,
  FISH,
  SOIL_PLOT,
  STICK_SHOVEL,
  STICK_TOOLS,
  TRADE_ITEMS,
} from '../data/gameItems';

const TRADER_A = SHOWCASE_PETS.find((p) => p.name === 'Puppy') ?? SHOWCASE_PETS[2];
const TRADER_B = SHOWCASE_PETS.find((p) => p.name === 'Fuzzy Otter') ?? SHOWCASE_PETS[5];
const FISHER = SHOWCASE_PETS.find((p) => p.name === 'Penguin') ?? SHOWCASE_PETS[6];
const BUGGER = SHOWCASE_PETS.find((p) => p.name === 'Duckling') ?? SHOWCASE_PETS[9];
const COOK = SHOWCASE_PETS.find((p) => p.name === 'Mochi Cat') ?? SHOWCASE_PETS[7];
const CRAFTER = SHOWCASE_PETS.find((p) => p.name === 'Koala') ?? SHOWCASE_PETS[3];

const FISHING_POLE = STICK_TOOLS.find((t) => t.id === 'stick_fishing_pole')!;
const BUG_NET = STICK_TOOLS.find((t) => t.id === 'stick_net')!;

/** Two pets swapping items mid-air — friendly realtime trade vibe. */
export function TradeScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-trader="a"]', {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('[data-trader="b"]', {
        y: 8,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.2,
      });

      gsap.fromTo(
        '[data-trade-item="0"]',
        { x: -36, y: 8, rotate: -12 },
        {
          x: 36,
          y: -10,
          rotate: 10,
          duration: 1.85,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        },
      );
      gsap.fromTo(
        '[data-trade-item="1"]',
        { x: 36, y: -6, rotate: 14 },
        {
          x: -36,
          y: 12,
          rotate: -8,
          duration: 1.85,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 0.15,
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="trade-scene" ref={rootRef} data-world-block>
      <div className="trade-stage" aria-label="Two pets trading items">
        <div className="trade-pet" data-trader="a">
          <img src={TRADER_A.imageUrl} alt={TRADER_A.name} />
          <span>{TRADER_A.name}</span>
        </div>

        <div className="trade-exchange" aria-hidden="true">
          <img data-trade-item="0" src={TRADE_ITEMS[0].imageUrl} alt="" className="trade-item" />
          <span className="trade-swap">⇄</span>
          <img data-trade-item="1" src={TRADE_ITEMS[1].imageUrl} alt="" className="trade-item" />
        </div>

        <div className="trade-pet is-flip" data-trader="b">
          <img src={TRADER_B.imageUrl} alt={TRADER_B.name} />
          <span>{TRADER_B.name}</span>
        </div>
      </div>
      <p className="trade-caption">Realtime item trading — pass snacks, tools, and finds live.</p>
    </div>
  );
}

/** Composed gameplay vignettes using real Mongo/R2 item art. */
export function WorldVignettes() {
  return (
    <div className="world-vignettes">
      <article className="vignette" data-world-block>
        <div className="vignette-copy">
          <h4>Farming</h4>
          <p>Dig soil, plant seeds, and harvest crops with stick tools.</p>
        </div>
        <div className="vignette-art farm-stage">
          <div className="soil-plot" aria-label="Soil plot with stick shovel">
            <img className="soil-plot-base" src={SOIL_PLOT.imageUrl} alt="Soil plot" />
            <img className="soil-plot-shovel" src={STICK_SHOVEL.imageUrl} alt="Stick shovel" />
          </div>
          <ul className="item-scatter">
            {CROPS.map((crop) => (
              <li key={crop.id}>
                <img src={crop.imageUrl} alt={crop.label} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="vignette" data-world-block>
        <div className="vignette-copy">
          <h4>Fishing</h4>
          <p>Cast a stick pole and reel in whatever&apos;s swimming by.</p>
        </div>
        <div className="vignette-art activity-stage">
          <div className="activity-hero">
            <img className="activity-pet" src={FISHER.imageUrl} alt={FISHER.name} />
            <img className="activity-tool is-pole" src={FISHING_POLE.imageUrl} alt="Stick fishing pole" />
          </div>
          <ul className="item-scatter">
            {FISH.map((fish) => (
              <li key={fish.id}>
                <img src={fish.imageUrl} alt={fish.label} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="vignette" data-world-block>
        <div className="vignette-copy">
          <h4>Bug catching</h4>
          <p>Equip a stick net and snag fluttery friends around the island.</p>
        </div>
        <div className="vignette-art activity-stage">
          <div className="activity-hero">
            <img className="activity-pet" src={BUGGER.imageUrl} alt={BUGGER.name} />
            <img className="activity-tool is-net" src={BUG_NET.imageUrl} alt="Stick net" />
          </div>
          <ul className="item-scatter is-bugs">
            {BUGS.map((bug) => (
              <li key={bug.id}>
                <img src={bug.imageUrl} alt={bug.label} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="vignette" data-world-block>
        <div className="vignette-copy">
          <h4>Cooking</h4>
          <p>Turn harvests into cozy meals at the cooking pot.</p>
        </div>
        <div className="vignette-art cook-stage">
          <div className="cook-hero">
            <img className="activity-pet is-small" src={COOK.imageUrl} alt={COOK.name} />
            <img className="cook-pot" src={COOKING.pot.imageUrl} alt="Cooking pot" />
          </div>
          <ul className="item-scatter">
            {COOKING.meals.map((meal) => (
              <li key={meal.id}>
                <img src={meal.imageUrl} alt={meal.label} loading="lazy" />
              </li>
            ))}
            <li>
              <img src={CROPS[2].imageUrl} alt="Tomato" loading="lazy" />
            </li>
            <li>
              <img src={CROPS[3].imageUrl} alt="Pumpkin" loading="lazy" />
            </li>
          </ul>
        </div>
      </article>

      <article className="vignette" data-world-block>
        <div className="vignette-copy">
          <h4>Crafting</h4>
          <p>Gather sticks &amp; materials, then craft axes, pickaxes, and more.</p>
        </div>
        <div className="vignette-art activity-stage">
          <div className="activity-hero">
            <img className="activity-pet is-small" src={CRAFTER.imageUrl} alt={CRAFTER.name} />
          </div>
          <ul className="item-scatter">
            {CRAFT_BITS.map((bit) => (
              <li key={bit.id}>
                <img src={bit.imageUrl} alt={bit.label} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
