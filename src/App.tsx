import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WaitlistForm } from './components/WaitlistForm';
import { PetFlock } from './components/PetFlock';
import { SiteFooter } from './components/SiteFooter';
import { FaqSection } from './components/FaqSection';
import { HealthHabits, HealthScene } from './components/HealthScene';
import { TradeScene, WorldVignettes } from './components/TradeScene';
import { GooeyBubbles, HeroSky, SectionWave } from './components/Waves';
import { BUGS, COOKING, CROPS, STICK_TOOLS } from './data/gameItems';
import { SHOWCASE_PETS } from './data/showcasePets';
import { BETA_DATE_LABEL, TAIGA } from './data/taiga';
import { PrivacyPage } from './pages/Privacy';
import { ScreeniesPage } from './pages/Screenies';
import { Seo } from './seo/Seo';
import {
  buildEventJsonLd,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareAppJsonLd,
  buildWebSiteJsonLd,
} from './seo/site';

const SIGNUP_ITEMS = [
  STICK_TOOLS[0],
  CROPS[3],
  COOKING.meals[0],
  BUGS[1],
  STICK_TOOLS[3],
] as const;

gsap.registerPlugin(ScrollTrigger);
// iOS URL-bar show/hide changes vh and was refreshing scrub mid-scroll → flicker/stuck
ScrollTrigger.config({ ignoreMobileResize: true });

const POSE_ORDER = [
  TAIGA.poses.sleepy,
  TAIGA.poses.sitting,
  TAIGA.poses.walking,
  TAIGA.poses.happy,
  TAIGA.poses.wow,
] as const;

function isMobileLayout() {
  return window.innerWidth < 860;
}

function heroSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const widthFactor = vw >= 1100 ? 0.55 : vw >= 860 ? 0.58 : vw >= 600 ? 0.5 : 0.46;
  const heightFactor = vw >= 860 ? 0.7 : 0.28;
  return Math.min(vw * widthFactor, vh * heightFactor, 720);
}

function sideSize() {
  const vw = window.innerWidth;
  if (vw < 860) return Math.min(Math.max(vw * 0.14, 56), 72);
  return Math.min(Math.max(vw * 0.12, 72), 132);
}

function heroPos(size: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const topPad = vw >= 860 ? Math.max(48, vh * 0.05) : Math.max(44, vh * 0.06);
  return {
    x: (vw - size) / 2,
    y: topPad,
  };
}

function sidePos(size: number) {
  const vw = window.innerWidth;
  const edge = vw >= 860 ? vw * 0.03 : 8;
  return {
    x: vw - size - edge,
    y: window.innerHeight * (vw >= 860 ? 0.26 : 0.14),
  };
}

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path.startsWith('/privacy')) return <PrivacyPage />;
  if (path.startsWith('/screenies')) return <ScreeniesPage />;
  return <HomePage />;
}

function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wispRef = useRef<HTMLDivElement>(null);
  const taigaRef = useRef<HTMLImageElement>(null);
  const homeJsonLd = useMemo(
    () => [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(),
      buildSoftwareAppJsonLd(),
      buildEventJsonLd(),
      buildFaqJsonLd(),
    ],
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    const wisp = wispRef.current;
    if (!root || !wisp) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = isMobileLayout();

    // Preload pose swaps so mobile scrub doesn't flash empty frames
    POSE_ORDER.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const placeHero = () => {
      const size = heroSize();
      const pos = heroPos(size);
      gsap.set(wisp, {
        width: size,
        x: pos.x,
        y: pos.y,
        rotate: 0,
        scale: 1,
        opacity: 1,
        force3D: true,
      });
    };

    if (prefersReduced) {
      placeHero();
      return;
    }

    const ctx = gsap.context(() => {
      placeHero();

      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: mobile ? 0.55 : 0.95,
        stagger: mobile ? 0.06 : 0.1,
        ease: 'back.out(1.7)',
      });

      gsap.from('.nav-cta, .cta-pop', {
        scale: 0.6,
        opacity: 0,
        duration: mobile ? 0.55 : 0.9,
        delay: 0.2,
        ease: 'elastic.out(1, 0.45)',
        clearProps: 'transform,opacity',
      });

      gsap.from(wisp, {
        scale: 0.88,
        opacity: 0,
        duration: mobile ? 0.65 : 1.05,
        ease: 'elastic.out(1, 0.6)',
      });

      // Lighter idle motion on mobile — competing with scrub was causing flicker
      gsap.to('.wisp-bob', {
        y: mobile ? -6 : -14,
        duration: mobile ? 3.2 : 2.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.1,
      });

      if (!mobile) {
        gsap.to('.taiga-shadow', {
          scaleX: 0.84,
          duration: 2.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.1,
          transformOrigin: '50% 50%',
        });
      }

      // Slow seamless drift — alternate directions + staggered speeds
      gsap.utils.toArray<HTMLElement>('[data-wave-track]').forEach((track, i) => {
        const reverse = i % 2 === 1;
        gsap.fromTo(
          track,
          { xPercent: reverse ? -33.333 : 0 },
          {
            xPercent: reverse ? 0 : -33.333,
            duration: 52 + (i % 5) * 16,
            ease: 'none',
            repeat: -1,
          },
        );
      });

      // Bob hero waves only on desktop — vertical motion + scrub fights iOS scroll
      if (!mobile) {
        gsap.utils.toArray<HTMLElement>('.hero-waves [data-wave-layer]').forEach((layer, i) => {
          gsap.to(layer, {
            y: i % 2 === 0 ? 10 : -8,
            duration: 4.5 + i * 0.7,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.35,
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-goo]').forEach((goo, i) => {
          gsap.to(goo, {
            x: i % 2 === 0 ? 18 : -22,
            y: i % 3 === 0 ? 14 : -16,
            duration: 5 + i * 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.25,
          });
        });
      }

      let lastPose: string = POSE_ORDER[0];
      const setPose = (src: string) => {
        if (src === lastPose) return;
        lastPose = src;
        if (taigaRef.current) taigaRef.current.src = src;
      };

      // Shrink early, but travel + poses run across the FULL page (not ~2 viewports)
      const shrinkDur = mobile ? 0.14 : 0.22;
      const travelDur = 1 - shrinkDur;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            // true = 1:1 with scroll (no lag fighting iOS momentum)
            scrub: mobile ? true : 1.05,
            invalidateOnRefresh: !mobile,
            fastScrollEnd: true,
            onRefresh: () => {
              if (window.scrollY < 8) placeHero();
            },
            onUpdate: (self) => {
              const idx = Math.min(
                POSE_ORDER.length - 1,
                Math.floor(self.progress * POSE_ORDER.length),
              );
              setPose(POSE_ORDER[idx]);
            },
          },
        })
        .fromTo(
          wisp,
          {
            width: () => heroSize(),
            x: () => heroPos(heroSize()).x,
            y: () => heroPos(heroSize()).y,
            rotate: 0,
          },
          {
            width: () => sideSize(),
            x: () => sidePos(sideSize()).x,
            y: () => sidePos(sideSize()).y,
            rotate: -6,
            ease: 'none',
            duration: shrinkDur,
            immediateRender: false,
            force3D: true,
          },
          0,
        )
        .to(
          '.taiga-glow, .taiga-shadow',
          { opacity: 0, scale: 0.6, duration: shrinkDur * 0.85, ease: 'none' },
          0,
        )
        .to(
          '.taiga-img',
          {
            filter: mobile
              ? 'drop-shadow(0 8px 10px rgba(58, 36, 72, 0.14))'
              : 'drop-shadow(0 10px 12px rgba(58, 36, 72, 0.16))',
            duration: shrinkDur,
            ease: 'none',
          },
          0,
        )
        .to(
          wisp,
          {
            y: () => window.innerHeight * (isMobileLayout() ? 0.78 : 0.62),
            x: () => sidePos(sideSize()).x - (isMobileLayout() ? 2 : 12),
            rotate: 10,
            ease: 'none',
            duration: travelDur,
            force3D: true,
          },
          shrinkDur,
        );

      gsap.utils.toArray<HTMLElement>('.feature').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          y: mobile ? 28 : 48,
          x: mobile ? 0 : i % 2 === 0 ? -28 : 28,
          opacity: 0,
          duration: mobile ? 0.5 : 0.75,
          ease: 'back.out(1.8)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-flock-pet]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          y: mobile ? 20 : 36,
          scale: mobile ? 0.92 : 0.8,
          opacity: 0,
          duration: mobile ? 0.45 : 0.7,
          delay: mobile ? 0 : (i % 5) * 0.06,
          ease: 'back.out(1.7)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-world-block]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: mobile ? 22 : 40,
          opacity: 0,
          duration: mobile ? 0.5 : 0.8,
          delay: mobile ? 0 : i * 0.08,
          ease: 'back.out(1.6)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-health-block]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: mobile ? 22 : 36,
          opacity: 0,
          duration: mobile ? 0.5 : 0.75,
          delay: mobile ? 0 : i * 0.08,
          ease: 'back.out(1.55)',
        });
      });

      gsap.from('.story-visual', {
        scrollTrigger: { trigger: '.story-band', start: 'top 75%', once: true },
        y: mobile ? 28 : 56,
        rotate: mobile ? 0 : -8,
        scale: mobile ? 0.94 : 0.86,
        opacity: 0,
        duration: mobile ? 0.55 : 1,
        ease: 'back.out(1.85)',
      });

      gsap.from('.signup', {
        scrollTrigger: { trigger: '.signup', start: 'top 82%', once: true },
        y: mobile ? 24 : 46,
        scale: mobile ? 0.98 : 0.95,
        opacity: 0,
        duration: mobile ? 0.5 : 0.85,
        ease: 'back.out(1.65)',
      });

      gsap.utils.toArray<HTMLElement>('[data-signup-floater]').forEach((el, i) => {
        if (mobile) return;
        gsap.to(el, {
          y: i % 2 === 0 ? -14 : 12,
          rotate: i % 2 === 0 ? 6 : -8,
          duration: 2.8 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      if (!mobile) {
        gsap.to('.story-pet', {
          scrollTrigger: {
            trigger: '.story-band',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -48,
          rotate: 10,
          ease: 'none',
        });
      }

    }, root);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, []);

  function scrollToSignup() {
    document.getElementById('beta-signup')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="page" ref={rootRef}>
      <Seo jsonLd={homeJsonLd} />
      <div className="status-bar-fill" aria-hidden="true" />
      <nav className="site-nav" aria-label="Primary">
        <a className="brand-lockup" href="#top" aria-label="Hatchly home">
          <img src="/hatchly-splash-logo.png" alt="Hatchly" width={40} height={40} />
          <span>Hatchly</span>
        </a>
        <div className="screenies-nav-actions">
          <a className="btn-ghost screenies-nav-link" href="/screenies">
            Screenies
          </a>
          <button type="button" className="nav-cta" onClick={scrollToSignup}>
            <span>Join beta</span>
          </button>
        </div>
      </nav>

      <div className="wisp" ref={wispRef} aria-label={`${TAIGA.customName}, Hatchly mascot`}>
        <div className="wisp-bob">
          <div className="taiga-glow" />
          <div className="taiga-shadow" />
          <img
            ref={taigaRef}
            className="taiga-img"
            src={TAIGA.poses.sleepy}
            alt={`${TAIGA.customName} the ${TAIGA.species}, Hatchly AI pet companion — sleepy pose`}
            width={640}
            height={640}
            fetchPriority="high"
          />
        </div>
      </div>

      <header className="hero" id="top">
        <HeroSky />

        <div className="hero-content">
          <h1 className="brand-hero">
            Hatchly<span className="dot" aria-hidden="true" />
          </h1>
          <p className="hero-line">Stay healthy. Gain a cuddle buddy.</p>
          <p className="hero-support">
            Hatchly is a habit &amp; wellness app with an AI pet companion. Closed beta opens{' '}
            {BETA_DATE_LABEL}, 2026 — bring your habits, hatch a friend.
          </p>
          <div className="hero-cta-row">
            <button type="button" className="btn-primary cta-pop" onClick={scrollToSignup}>
              <span>Join the beta waitlist</span>
            </button>
            <a
              className="btn-ghost"
              href="https://discord.gg/ytvfBajAhh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord community
            </a>
          </div>
        </div>
      </header>

      <section className="panel panel-mint" aria-labelledby="what-heading">
        <SectionWave fill="#d8f8ee" variant={4} />
        <GooeyBubbles />
        <div className="panel-inner">
          <h2 className="wavey-title" id="what-heading">
            Habits that feel like play
            <span className="swash" aria-hidden="true" />
          </h2>
          <p className="lead">
            Log water, food, mood, and movement — then watch your little friend perk up, snack, and
            celebrate with you. Every hatch is unique — here&apos;s a peek at the flock.
          </p>
          <PetFlock />
          <div className="feature-flow">
            <article className="feature">
              <div className="feature-art">
                <img
                  src={SHOWCASE_PETS[0].imageUrl}
                  alt={`${SHOWCASE_PETS[0].name} pet showing habit progress in Hatchly`}
                  loading="lazy"
                  width={160}
                  height={160}
                />
              </div>
              <div>
                <h3>Pet progress</h3>
                <p>Every check-in feeds XP. Miss a day? They get a little sleepy — not mad.</p>
              </div>
            </article>
            <article className="feature">
              <div className="feature-art">
                <img
                  src={SHOWCASE_PETS[1].imageUrl}
                  alt={`${SHOWCASE_PETS[1].name} exploring Hatchly cozy game loops`}
                  loading="lazy"
                  width={160}
                  height={160}
                />
              </div>
              <div>
                <h3>Cozy game loops</h3>
                <p>Farm, forage, and collect in a soft world that rewards showing up.</p>
              </div>
            </article>
            <article className="feature">
              <div className="feature-art">
                <img
                  src={SHOWCASE_PETS[2].imageUrl}
                  alt={`${SHOWCASE_PETS[2].name} representing Hatchly real-life habit care`}
                  loading="lazy"
                  width={160}
                  height={160}
                />
              </div>
              <div>
                <h3>Built for real life</h3>
                <p>Gentle tracking for messy schedules — cute enough to open every morning.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="panel panel-peach" aria-labelledby="world-heading">
        <SectionWave fill="#ffe4cc" variant={3} />
        <GooeyBubbles />
        <div className="panel-inner world-panel">
          <h2 className="wavey-title" id="world-heading">
            Cozy game world. Real-life care.
            <span className="swash" aria-hidden="true" />
          </h2>
          <p className="lead">
            Hatchly mixes Animal Crossing–style play with gentle health &amp; wellness tracking —
            your habits power a living island you share with friends.
          </p>

          <div className="world-multi" data-world-block>
            <p className="world-kicker">Biggest flex</p>
            <h4>Realtime multiplayer</h4>
            <p>
              Hop into the same world as other players — see them move around, hang out, and play
              together. Trade items live, sync up on the island, and lean on multiplayer systems
              built as the core of Hatchly — not a bolted-on afterthought.
            </p>
          </div>

          <TradeScene />

          <div className="world-loops" data-world-block>
            <h4>A full cozy loop</h4>
            <p className="world-loops-lead">
              Level skills while the island runs a realtime day/night cycle — farm, fish, catch
              bugs, craft, and cook with the same items you&apos;ll use in-game.
            </p>
          </div>

          <WorldVignettes />
        </div>
      </section>

      <section className="panel panel-sage" aria-labelledby="health-heading">
        <SectionWave fill="#dff5ea" variant={1} />
        <GooeyBubbles />
        <div className="panel-inner health-panel">
          <h2 className="wavey-title" id="health-heading">
            Real health care, not just a game
            <span className="swash" aria-hidden="true" />
          </h2>
          <p className="lead">
            Hatchly also helps you look after yourself — chat with your pet, log food and weight,
            and keep a gentle diary when life gets messy.
          </p>

          <HealthScene />
          <HealthHabits />
        </div>
      </section>

      <section className="panel panel-sky" aria-labelledby="beta-heading">
        <SectionWave fill="#c8eaff" variant={2} />
        <GooeyBubbles />
        <div className="panel-inner story-band">
          <div className="story-visual">
            <div className="story-goo" aria-hidden="true" />
            <img
              className="story-pet"
              src={SHOWCASE_PETS[1].imageUrl}
              alt={`${SHOWCASE_PETS[1].name} looking excited about beta`}
            />
          </div>
          <div>
            <h2 className="wavey-title" id="beta-heading">
              Beta day is {BETA_DATE_LABEL}, 2026
              <span className="swash" aria-hidden="true" />
            </h2>
            <p className="lead">
              We&apos;re inviting a cozy first flock to poke around, find bugs, and help shape
              Hatchly before the wider hatch. Early birds get first dibs on premium trial perks.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="signup-shell panel-pink" id="beta-signup" aria-labelledby="signup-heading">
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
            <p className="signup-date">{BETA_DATE_LABEL}, 2026</p>
            <h2 id="signup-heading">Join the Hatchly beta waitlist</h2>
            <p className="signup-lead">
              Drop your email and we&apos;ll invite you when Hatchly unlocks — early flock gets first
              dibs on premium trial perks.
            </p>
            <WaitlistForm id="beta-form" ctaLabel="Save my spot" />
            <p className="signup-note">No spam — just hatch-day news and your invite.</p>
          </div>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}
