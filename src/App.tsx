import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WaitlistForm } from './components/WaitlistForm';
import { PetFlock } from './components/PetFlock';
import { SiteFooter } from './components/SiteFooter';
import { HealthHabits, HealthScene } from './components/HealthScene';
import { TradeScene, WorldVignettes } from './components/TradeScene';
import { GooeyBubbles, HeroSky, SectionWave } from './components/Waves';
import { BUGS, COOKING, CROPS, STICK_TOOLS } from './data/gameItems';
import { SHOWCASE_PETS } from './data/showcasePets';
import { BETA_DATE_LABEL, TAIGA } from './data/taiga';
import { PrivacyPage } from './pages/Privacy';

const SIGNUP_ITEMS = [
  STICK_TOOLS[0],
  CROPS[3],
  COOKING.meals[0],
  BUGS[1],
  STICK_TOOLS[3],
] as const;

gsap.registerPlugin(ScrollTrigger);

const POSE_ORDER = [
  TAIGA.poses.sleepy,
  TAIGA.poses.sitting,
  TAIGA.poses.walking,
  TAIGA.poses.happy,
  TAIGA.poses.wow,
] as const;

function heroSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const widthFactor = vw >= 1100 ? 0.55 : vw >= 860 ? 0.58 : vw >= 600 ? 0.68 : 0.7;
  const heightFactor = vw >= 860 ? 0.7 : 0.42;
  return Math.min(vw * widthFactor, vh * heightFactor, 720);
}

function sideSize() {
  const vw = window.innerWidth;
  return Math.min(Math.max(vw * (vw >= 860 ? 0.12 : 0.22), 72), 132);
}

function heroPos(size: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const topPad = vw >= 860 ? Math.max(48, vh * 0.05) : Math.max(56, vh * 0.09);
  return {
    x: (vw - size) / 2,
    y: topPad,
  };
}

function sidePos(size: number) {
  const vw = window.innerWidth;
  const edge = vw >= 860 ? vw * 0.03 : 12;
  return {
    x: vw - size - edge,
    y: window.innerHeight * (vw >= 860 ? 0.26 : 0.22),
  };
}

export default function App() {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/privacy')) {
    return <PrivacyPage />;
  }

  return <HomePage />;
}

function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wispRef = useRef<HTMLDivElement>(null);
  const taigaRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const wisp = wispRef.current;
    if (!root || !wisp) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const placeHero = () => {
      const size = heroSize();
      const pos = heroPos(size);
      gsap.set(wisp, { width: size, x: pos.x, y: pos.y, rotate: 0, scale: 1, opacity: 1 });
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
        duration: 0.95,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      gsap.from('.nav-cta, .cta-pop', {
        scale: 0.6,
        opacity: 0,
        duration: 0.9,
        delay: 0.35,
        ease: 'elastic.out(1, 0.45)',
        clearProps: 'transform,opacity',
      });

      gsap.from(wisp, {
        scale: 0.88,
        opacity: 0,
        duration: 1.05,
        ease: 'elastic.out(1, 0.6)',
      });

      gsap.to('.wisp-bob', {
        y: -14,
        duration: 2.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.1,
      });

      // Scale only (no opacity) so scroll fade isn't overwritten by the idle loop
      gsap.to('.taiga-shadow', {
        scaleX: 0.84,
        duration: 2.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.1,
        transformOrigin: '50% 50%',
      });

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

      // Bob hero waves only — section seams must stay locked to panel edges
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

      // Soft float on mid-page gooey bubbles
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

      let lastPose: string = POSE_ORDER[0];
      const setPose = (src: string) => {
        if (src === lastPose) return;
        lastPose = src;
        if (taigaRef.current) taigaRef.current.src = src;
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.05,
            invalidateOnRefresh: true,
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
            duration: 0.22,
            immediateRender: false,
          },
          0,
        )
        .to(
          '.taiga-glow, .taiga-shadow',
          { opacity: 0, scale: 0.6, duration: 0.18, ease: 'none' },
          0,
        )
        .to(
          '.taiga-img',
          {
            filter: 'drop-shadow(0 10px 12px rgba(58, 36, 72, 0.16))',
            duration: 0.22,
            ease: 'none',
          },
          0,
        )
        .to(
          wisp,
          {
            y: () => window.innerHeight * (window.innerWidth >= 860 ? 0.62 : 0.7),
            x: () => sidePos(sideSize()).x - (window.innerWidth >= 860 ? 12 : 4),
            rotate: 10,
            ease: 'none',
            duration: 0.78,
          },
          0.22,
        );

      gsap.utils.toArray<HTMLElement>('.feature').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 86%' },
          y: 48,
          x: i % 2 === 0 ? -28 : 28,
          opacity: 0,
          duration: 0.75,
          ease: 'back.out(1.8)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-flock-pet]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          y: 36,
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          delay: (i % 5) * 0.06,
          ease: 'back.out(1.7)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-world-block]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'back.out(1.6)',
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-health-block]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 36,
          opacity: 0,
          duration: 0.75,
          delay: i * 0.08,
          ease: 'back.out(1.55)',
        });
      });

      gsap.from('.story-visual', {
        scrollTrigger: { trigger: '.story-band', start: 'top 75%' },
        y: 56,
        rotate: -8,
        scale: 0.86,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.85)',
      });

      gsap.from('.signup', {
        scrollTrigger: { trigger: '.signup', start: 'top 82%' },
        y: 46,
        scale: 0.95,
        opacity: 0,
        duration: 0.85,
        ease: 'back.out(1.65)',
      });

      gsap.utils.toArray<HTMLElement>('[data-signup-floater]').forEach((el, i) => {
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
      <nav className="site-nav">
        <a className="brand-lockup" href="#top" aria-label="Hatchly home">
          <img src="/hatchly-splash-logo.png" alt="" />
          <span>Hatchly</span>
        </a>
        <button type="button" className="nav-cta" onClick={scrollToSignup}>
          <span>Join beta</span>
        </button>
      </nav>

      <div className="wisp" ref={wispRef} aria-label={`${TAIGA.customName}, Hatchly mascot`}>
        <div className="wisp-bob">
          <div className="taiga-glow" />
          <div className="taiga-shadow" />
          <img
            ref={taigaRef}
            className="taiga-img"
            src={TAIGA.poses.sleepy}
            alt={`${TAIGA.customName} the ${TAIGA.species} — sleepy`}
            width={640}
            height={640}
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
            Closed beta opens {BETA_DATE_LABEL} — bring your habits, hatch a friend.
          </p>
          <div className="hero-cta-row">
            <button type="button" className="btn-primary cta-pop" onClick={scrollToSignup}>
              <span>Join the beta</span>
            </button>
            <a
              className="btn-ghost"
              href="https://discord.gg/ytvfBajAhh"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </div>
        </div>
      </header>

      <section className="panel panel-mint" aria-labelledby="what-heading">
        <SectionWave fill="#d8f8ee" variant={4} />
        <GooeyBubbles />
        <div className="panel-inner">
          <h3 className="wavey-title" id="what-heading">
            Habits that feel like play
            <span className="swash" aria-hidden="true" />
          </h3>
          <p className="lead">
            Log water, food, mood, and movement — then watch your little friend perk up, snack, and
            celebrate with you. Every hatch is unique — here&apos;s a peek at the flock.
          </p>
          <PetFlock />
          <div className="feature-flow">
            <article className="feature">
              <div className="feature-art">
                <img src={SHOWCASE_PETS[0].imageUrl} alt="" />
              </div>
              <div>
                <h4>Pet progress</h4>
                <p>Every check-in feeds XP. Miss a day? They get a little sleepy — not mad.</p>
              </div>
            </article>
            <article className="feature">
              <div className="feature-art">
                <img src={SHOWCASE_PETS[1].imageUrl} alt="" />
              </div>
              <div>
                <h4>Cozy game loops</h4>
                <p>Farm, forage, and collect in a soft world that rewards showing up.</p>
              </div>
            </article>
            <article className="feature">
              <div className="feature-art">
                <img src={SHOWCASE_PETS[2].imageUrl} alt="" />
              </div>
              <div>
                <h4>Built for real life</h4>
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
          <h3 className="wavey-title" id="world-heading">
            Cozy game world. Real-life care.
            <span className="swash" aria-hidden="true" />
          </h3>
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
          <h3 className="wavey-title" id="health-heading">
            Real health care, not just a game
            <span className="swash" aria-hidden="true" />
          </h3>
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
            <h3 className="wavey-title" id="beta-heading">
              Beta day is {BETA_DATE_LABEL}
              <span className="swash" aria-hidden="true" />
            </h3>
            <p className="lead">
              We&apos;re inviting a cozy first flock to poke around, find bugs, and help shape
              Hatchly before the wider hatch. Early birds get first dibs on premium trial perks.
            </p>
          </div>
        </div>
      </section>

      <section className="signup-shell" id="beta-signup" aria-labelledby="signup-heading">
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
            <p className="signup-date">{BETA_DATE_LABEL}</p>
            <h3 id="signup-heading">Join the beta waitlist</h3>
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
