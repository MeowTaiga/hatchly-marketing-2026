import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CookingPotScreen,
  CookMinigameScreen,
  CraftMinigameScreen,
  DiaryScreen,
  FishingMinigameScreen,
  HomeTabScreen,
  PetChatScreen,
  WorkbenchScreen,
} from '../components/AppUiMocks';
import { PhoneStage } from '../components/PhoneStage';
import { SiteFooter } from '../components/SiteFooter';
import { WaitlistForm } from '../components/WaitlistForm';
import { HeroSky, SectionWave } from '../components/Waves';
import { BUGS, COOKING, CROPS, STICK_TOOLS } from '../data/gameItems';
import { SHOWCASE_PETS } from '../data/showcasePets';
import { BETA_DATE_LABEL, TAIGA } from '../data/taiga';
import { Seo } from '../seo/Seo';
import { SITE_ORIGIN } from '../seo/site';
import {
  COOK_STORIES,
  CRAFT_FLOATERS,
  CRAFT_STORY,
  CRAFTING_TABLE,
  FARM_CROPS,
  FARM_SEEDS,
  FARM_SOIL,
  FEAST_BOARD,
  RARE_FISH,
  SCENES,
  TOWN_BITS,
} from '../data/screenies';

const BREAKOUT_PETS = SHOWCASE_PETS.filter((p) => p.name !== 'Wisp').slice(0, 6);

const SIGNUP_ITEMS = [
  STICK_TOOLS[0],
  CROPS[3],
  COOKING.meals[0],
  BUGS[1],
  STICK_TOOLS[3],
] as const;

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const FARM_LEVELS = [SCENES.farmLv1, SCENES.farmLv2, SCENES.farmLv3] as const;

/**
 * Animated “screenies” story — phone UI with real scenes on-screen
 * and game items popping out around the bezel.
 */
export function ScreeniesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [farmIdx, setFarmIdx] = useState(0);
  const [cookIdx, setCookIdx] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 860;

    const preload = [
      ...Object.values(SCENES).map((s) => s.imageUrl),
      FARM_SOIL.imageUrl,
      ...FARM_SEEDS.map((i) => i.imageUrl),
      ...FARM_CROPS.map((i) => i.imageUrl),
      ...CRAFT_STORY.tools.map((i) => i.imageUrl),
      ...FEAST_BOARD.map((i) => i.imageUrl),
    ];
    preload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.screenies-hero-copy > *', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.6)',
      });

      gsap.from('[data-screenies-hero-phone]', {
        y: 48,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)',
      });

      gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el.closest('[data-chapter], [data-phone-stage]') ?? el,
            start: 'top 80%',
            once: true,
          },
          y: 28,
          scale: 0.35,
          rotate: mobile ? 0 : gsap.utils.random(-18, 18),
          opacity: 0,
          duration: 0.75,
          delay: Number(el.dataset.popDelay ?? 0),
          ease: 'back.out(1.9)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-chapter-copy]').forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power2.out',
        });
      });

      const farmChapter = root.querySelector('[data-chapter="farm"]');
      if (farmChapter) {
        ScrollTrigger.create({
          trigger: farmChapter,
          start: 'top 55%',
          end: 'bottom 45%',
          onUpdate: (self) => {
            const next = Math.min(2, Math.floor(self.progress * 3));
            setFarmIdx((prev) => (prev === next ? prev : next));
          },
        });
      }

      const cookChapter = root.querySelector('[data-chapter="cook"]');
      if (cookChapter) {
        ScrollTrigger.create({
          trigger: cookChapter,
          start: 'top 60%',
          end: 'bottom 40%',
          onUpdate: (self) => {
            const next = Math.min(
              COOK_STORIES.length - 1,
              Math.floor(self.progress * COOK_STORIES.length),
            );
            setCookIdx((prev) => (prev === next ? prev : next));
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          rotate: i % 2 === 0 ? 5 : -6,
          duration: 2.6 + (i % 4) * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.12,
        });
      });

      gsap.to('[data-phone-tilt]', {
        rotate: mobile ? 0 : 2.5,
        y: mobile ? 0 : -8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray<HTMLElement>('[data-signup-floater]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 12,
          rotate: i % 2 === 0 ? 8 : -10,
          duration: 2.8 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const cook = COOK_STORIES[cookIdx] ?? COOK_STORIES[0];
  const farmScene = FARM_LEVELS[farmIdx] ?? FARM_LEVELS[0];

  return (
    <div className="screenies-page" ref={rootRef}>
      <Seo
        title="Screenies — Hatchly Farm, Craft & Town Story"
        description="Watch Hatchly come alive on a phone: farm, craft, cook, fish — then chat with your AI pet and log moods in the diary."
        path="/screenies"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Hatchly Screenies',
          url: `${SITE_ORIGIN}/screenies`,
          description:
            'Animated phone tour of Hatchly farming, crafting, cooking, pet chat, and mood diary — built from real game art.',
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        }}
      />

      <div className="status-bar-fill" aria-hidden="true" />

      <nav className="site-nav screenies-nav" aria-label="Primary">
        <a className="brand-lockup" href="/" aria-label="Hatchly home">
          <img src="/hatchly-splash-logo.png" alt="Hatchly" width={40} height={40} />
          <span>Hatchly</span>
        </a>
        <div className="screenies-nav-actions">
          <a className="btn-ghost screenies-nav-link" href="/">
            Home
          </a>
          <a className="nav-cta" href="#beta-signup">
            <span>Join beta</span>
          </a>
        </div>
      </nav>

      <header className="screenies-hero">
        <HeroSky />

        <ul className="screenies-hero-pets" aria-label="Hatchly pets">
          {BREAKOUT_PETS.map((pet, i) => (
            <li
              key={pet.name}
              className={`breakout-pet breakout-pet-${i}`}
              data-pop
              data-pop-delay={0.08 + i * 0.06}
              data-float
            >
              <img src={pet.imageUrl} alt={pet.name} />
            </li>
          ))}
        </ul>

        <div className="screenies-hero-layout">
          <div className="screenies-hero-copy">
            <p className="screenies-kicker">Screenies</p>
            <h1>
              Hatchly<span className="dot" aria-hidden="true" />
            </h1>
            <p className="screenies-lead">
              Your home tab — habits, farm, and adventures — with Wisp and friends breaking out of
              the phone.
            </p>
            <a className="btn-primary cta-pop" href="#farm">
              <span>Start the tour</span>
            </a>
          </div>

          <div className="hero-breakout" data-screenies-hero-phone>
            <div className="hero-breakout-phone" data-phone-tilt>
              <PhoneStage
                className="is-home-hero"
                sceneUrl={SCENES.farmLv3.imageUrl}
                sceneAlt="Hatchly home tab"
                badge="Home"
                screen={<HomeTabScreen />}
              />
            </div>

            <div
              className="breakout-wisp"
              data-pop
              data-pop-delay={0.05}
              data-float
              aria-label="Wisp breaking out of the phone"
            >
              <img src={TAIGA.poses.happy} alt="Wisp" />
            </div>
          </div>
        </div>
      </header>

      <section className="screenies-chapter panel panel-mint farm-chapter" data-chapter="farm" id="farm">
        <SectionWave fill="#d8f8ee" variant={4} />
        <ul className="section-floaters farm-floaters" aria-hidden="true">
          {FARM_CROPS.map((item, i) => (
            <li
              key={item.id}
              className={`section-floater farm-floater-${i}`}
              data-pop
              data-pop-delay={0.05 * i}
              data-float
            >
              <img src={item.imageUrl} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
        <div className="screenies-chapter-inner">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Your farm wakes up</h2>
            <p>
              Lay down soil, plant a seed, and check in as it grows. Fully grown carrots, wheat,
              tomatoes, and more pop out around you when harvest day hits.
            </p>
            <p className="screenies-level" aria-live="polite">
              {farmScene.label}
            </p>
          </div>

          <div data-phone-tilt>
            <PhoneStage
              sceneKey={farmScene.id}
              sceneUrl={farmScene.imageUrl}
              sceneAlt={farmScene.label}
              badge="Plant seeds"
              heroItem={FARM_SOIL}
              heroStack={FARM_SEEDS.slice(0, 4)}
              heroAlign="center"
            />
          </div>
        </div>
      </section>

      <section className="screenies-chapter panel panel-peach craft-chapter" data-chapter="craft" id="craft">
        <SectionWave fill="#ffe4cc" variant={3} />
        <ul className="section-floaters craft-floaters" aria-hidden="true">
          {[CRAFTING_TABLE, ...CRAFT_FLOATERS].map((item, i) => (
            <li
              key={`${item.id}-${i}`}
              className={`section-floater craft-floater-${i % 12}`}
              data-pop
              data-pop-delay={0.04 * (i % 8)}
              data-float
            >
              <img src={item.imageUrl} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
        <div className="screenies-chapter-inner is-flip">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Workbench</h2>
            <p>
              Tap your crafting table to open the Workbench — tabbed recipes, ingredient chips
              (have/need), then hit Craft. Stone upgrades your tools; Halloween décor fills the
              Decor tab.
            </p>
            <p className="screenies-level">Mini-game: repeat the glowing pad pattern</p>
            <p>
              A quick Simon-style sequence pops up. Nail it and you keep the tool; miss and you get
              scrap (materials still spent).
            </p>
          </div>

          <div className="phone-pair">
            <div data-phone-tilt>
              <PhoneStage
                sceneUrl={SCENES.farmLv2.imageUrl}
                sceneAlt="Workbench crafting UI"
                badge="Workbench"
                screen={<WorkbenchScreen />}
              />
            </div>
            <div data-phone-tilt>
              <PhoneStage
                sceneUrl={SCENES.farmLv2.imageUrl}
                sceneAlt="Crafting mini-game"
                badge="Craft mini-game"
                screen={<CraftMinigameScreen />}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="screenies-chapter panel panel-butter cook-chapter" data-chapter="cook" id="cook">
        <SectionWave fill="#fff4e8" variant={1} />
        <ul className="section-floaters" aria-hidden="true">
          {[cook.pot, ...cook.ingredients, ...FEAST_BOARD].map((item, i) => (
            <li
              key={`${item.id}-${i}`}
              className={`section-floater section-floater-${i % 10}`}
              data-pop
              data-pop-delay={0.04 * (i % 8)}
              data-float
            >
              <img src={item.imageUrl} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
        <div className="screenies-chapter-inner">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Cooking Pot</h2>
            <p>
              Tap the pot for Bake, Salad, Soup, Fish, and more — same cozy recipe tiles, Cook
              button, and pantry chips.
            </p>
            <p className="screenies-level" aria-live="polite">
              {cook.title} · Mini-game: timing bar
            </p>
            <p>
              A needle races across yellow/green zones — tap TAP! on the sweet spot. Miss and the pot
              bubbles into Strange Stew.
            </p>
          </div>

          <div className="phone-pair">
            <div data-phone-tilt>
              <PhoneStage
                sceneUrl={SCENES.farmLv3.imageUrl}
                sceneAlt="Cooking Pot UI"
                badge="Cooking Pot"
                screen={<CookingPotScreen />}
                heroItem={cook.result}
              />
            </div>
            <div data-phone-tilt>
              <PhoneStage
                sceneUrl={SCENES.farmLv3.imageUrl}
                sceneAlt="Cooking mini-game"
                badge="Cook mini-game"
                screen={<CookMinigameScreen />}
                heroItem={cook.result}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="screenies-chapter panel panel-mint fish-chapter"
        data-chapter="minigames"
        id="minigames"
      >
        <SectionWave fill="#d8f8ee" variant={4} />
        <ul className="section-floaters fish-floaters" aria-hidden="true">
          {RARE_FISH.map((item, i) => (
            <li
              key={item.id}
              className={`section-floater fish-floater-${i % 12}`}
              data-pop
              data-pop-delay={0.04 * (i % 8)}
              data-float
            >
              <img src={item.imageUrl} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
        <div className="screenies-chapter-inner minigames-inner">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Mini-games in the loop</h2>
            <p>
              Crafting and cooking aren&apos;t just menus — short skill checks keep each make feel
              playful. Fishing has its own reel challenge too — land rares like sharks, ghost koi,
              and spooky seasonal catches.
            </p>
          </div>

          <div className="minigame-explain">
            <article className="minigame-card" data-pop>
              <h3>Craft — Simon pads</h3>
              <p>
                Four colored pads flash a sequence. Repeat it to finish the recipe. Harder crafts =
                longer patterns.
              </p>
            </article>
            <article className="minigame-card" data-pop data-pop-delay={0.08}>
              <h3>Cook — timing bar</h3>
              <p>
                Hit the green (perfect) or yellow (good) zone each round. A miss burns the batch into
                Strange Stew.
              </p>
            </article>
            <article className="minigame-card" data-pop data-pop-delay={0.14}>
              <h3>Fish — circular reel</h3>
              <p>
                Cast at the fishing hole, then tap when the orbiting dot lands in the green sweet
                spot to land your catch.
              </p>
            </article>
            <article className="minigame-card" data-pop data-pop-delay={0.2}>
              <h3>World taps</h3>
              <p>
                Bug netting, fossil digs, balloon pops, and crop harvests are quick world actions —
                tap, cheer, collect.
              </p>
            </article>
          </div>

          <div data-phone-tilt>
            <PhoneStage
              sceneUrl={SCENES.fishing.imageUrl}
              sceneAlt="Fishing reel mini-game"
              badge="Fishing hole"
              screen={<FishingMinigameScreen fish={RARE_FISH[0]} />}
              items={[
                { ...CRAFT_STORY.tools[3], slot: 1 },
                { ...RARE_FISH[2], slot: 3 },
                { ...TOWN_BITS[1], slot: 5 },
              ]}
              heroItem={RARE_FISH[0]}
            />
          </div>
        </div>
      </section>

      <section className="screenies-chapter panel panel-sage" data-chapter="chat" id="chat">
        <SectionWave fill="#dff5ea" variant={2} />
        <div className="screenies-chapter-inner">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Chat with your pet</h2>
            <p>
              The Chat tab is a soft AI hangout — check in, vent, celebrate small wins. Wisp remembers
              the vibe, not just the metrics.
            </p>
            <p className="screenies-level">Gentle encouragement · never a lecture</p>
          </div>

          <div data-phone-tilt>
            <PhoneStage
              sceneUrl={SCENES.farmLv3.imageUrl}
              sceneAlt="Pet AI chat tab"
              badge="Chat"
              screen={<PetChatScreen />}
              heroItem={{
                id: 'wisp-chat',
                label: 'Wisp',
                imageUrl: TAIGA.poses.happy,
              }}
            />
          </div>
        </div>
      </section>

      <section className="screenies-chapter panel panel-sky" data-chapter="diary" id="diary">
        <SectionWave fill="#c8eaff" variant={5} />
        <div className="screenies-chapter-inner is-flip">
          <div className="screenies-chapter-copy" data-chapter-copy>
            <h2>Diary &amp; mood story</h2>
            <p>
              Log how you feel with a quick mood tap, add an optional note, and look back at your
              recent history — soft accountability with XP when you check in.
            </p>
            <p className="screenies-level">Mood · note · history</p>
          </div>

          <div data-phone-tilt>
            <PhoneStage
              sceneUrl={SCENES.farmLv2.imageUrl}
              sceneAlt="Mood diary tab"
              badge="Diary"
              screen={<DiaryScreen />}
            />
          </div>
        </div>
      </section>

      <section
        className="screenies-cta signup-shell panel-pink"
        id="beta-signup"
        aria-labelledby="screenies-cta"
      >
        <SectionWave fill="#ffb3d0" variant={5} />
        <div className="signup-stage">
          <div className="signup-floaters" aria-hidden="true">
            {SIGNUP_ITEMS.map((item, i) => (
              <img
                key={item.id}
                className={`signup-floater signup-floater-${String.fromCharCode(97 + i)}`}
                src={item.imageUrl}
                alt=""
                data-signup-floater
              />
            ))}
          </div>

          <div className="signup">
            <p className="signup-date">
              {BETA_DATE_LABEL}, 2026
            </p>
            <h2 id="screenies-cta">Join the Hatchly beta waitlist</h2>
            <p className="signup-lead">
              Drop your email and we&apos;ll invite you when Hatchly unlocks — early flock gets first
              dibs on premium trial perks.
            </p>
            <WaitlistForm id="screenies-beta-form" ctaLabel="Save my spot" />
            <p className="signup-note">No spam — just hatch-day news and your invite.</p>
          </div>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}
