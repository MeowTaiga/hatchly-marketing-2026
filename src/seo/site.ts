/** Canonical marketing site SEO / ASO constants. */

export const SITE_ORIGIN = 'https://hatchly.me';
export const SITE_NAME = 'Hatchly';
export const SITE_TAGLINE = 'Stay healthy. Gain a cuddle buddy.';

export const DEFAULT_TITLE = 'Hatchly — Habit Pet App | Beta Opens September 21, 2026';
export const DEFAULT_DESCRIPTION =
  'Hatchly is a cozy habit and wellness app with an AI pet companion. Track food, weight, mood, and habits while farming, fishing, crafting, and playing with friends. Closed beta opens September 21, 2026 — join the waitlist.';

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
export const TWITTER_HANDLE = '@hatchlyapp';

export const SAME_AS = [
  'https://discord.gg/ytvfBajAhh',
  'https://github.com/MeowTaiga/hatchly-marketing-2026',
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

/** FAQ copy used on-page and in FAQPage JSON-LD for SEO + AI answer engines. */
export const FAQS: FaqItem[] = [
  {
    question: 'What is Hatchly?',
    answer:
      'Hatchly is a habit and wellness app with a cuddly AI pet companion. You log real-life habits like food, water, mood, weight, and movement — and your pet grows, chats, and celebrates with you. It also includes a cozy multiplayer game world with farming, fishing, crafting, cooking, and trading.',
  },
  {
    question: 'When does the Hatchly beta open?',
    answer:
      'Hatchly closed beta opens September 21, 2026. Join the email waitlist on hatchly.me to get an invite when beta unlocks.',
  },
  {
    question: 'Is Hatchly a fitness app or a game?',
    answer:
      'Both. Hatchly helps you care for real health habits — food logging, weight tracking, mood diary, and AI pet chat — while also offering Animal Crossing–style cozy play: farming, fishing, bugs, cooking, crafting, and realtime multiplayer with friends.',
  },
  {
    question: 'Does Hatchly include AI pet chat?',
    answer:
      'Yes. You can chat with your Hatchly pet for gentle check-ins and encouragement. Conversations feel like a supportive friend, not a lecture, and can connect to your diary and habit progress.',
  },
  {
    question: 'How do I join the Hatchly beta waitlist?',
    answer:
      'Go to hatchly.me, enter your email in the beta waitlist form, and submit. You will get hatch-day news and an invite when Hatchly unlocks. No spam.',
  },
  {
    question: 'Is Hatchly free?',
    answer:
      'Hatchly is launching with a closed beta. Early waitlist members get first dibs on premium trial perks. Pricing details will be shared closer to the wider release.',
  },
];

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    potentialAction: {
      '@type': 'SubscribeAction',
      name: 'Join the Hatchly beta waitlist',
      target: `${SITE_ORIGIN}/#beta-signup`,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: absoluteUrl('/hatchly-splash-logo.png'),
    description: DEFAULT_DESCRIPTION,
    sameAs: [...SAME_AS],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'community',
      url: 'https://discord.gg/ytvfBajAhh',
    },
  };
}

export function buildSoftwareAppJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Habit tracker with AI pet companion and cozy multiplayer game',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Join the free beta waitlist before September 21, 2026',
      url: `${SITE_ORIGIN}/#beta-signup`,
      availability: 'https://schema.org/PreOrder',
      availabilityStarts: '2026-09-21',
    },
    description: DEFAULT_DESCRIPTION,
    url: SITE_ORIGIN,
    image: DEFAULT_OG_IMAGE,
    featureList: [
      'AI pet companion chat',
      'Food and weight logging',
      'Mood diary',
      'Habit tracking for water, food, mood, and movement',
      'Realtime multiplayer island',
      'Farming, fishing, crafting, cooking, and trading',
    ],
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    releaseNotes: 'Closed beta opens September 21, 2026.',
  };
}

export function buildFaqJsonLd(faqs: FaqItem[] = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildEventJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Hatchly Closed Beta Launch',
    description:
      'Hatchly closed beta opens. Join the waitlist to get invited when the cozy habit pet app unlocks.',
    startDate: '2026-09-21',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: SITE_ORIGIN,
    },
    organizer: { '@id': `${SITE_ORIGIN}/#organization` },
    image: DEFAULT_OG_IMAGE,
    url: `${SITE_ORIGIN}/#beta-signup`,
  };
}
