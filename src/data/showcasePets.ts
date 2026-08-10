import { TAIGA } from './taiga';

export type ShowcasePet = {
  name: string;
  vibe: string;
  imageUrl: string;
  poseKey: string;
};

/**
 * Curated marketing flock — static R2 URLs only (no API).
 * Prefer registration-style base art (`buildPetImagePrompt` + gpt-image-1-mini).
 * Baby Whale eating pose kept as a standout; Wisp uses Taiga's sleepy pose.
 */
export const SHOWCASE_PETS: ShowcasePet[] = [
  {
    name: 'Wisp',
    vibe: 'Snuggly',
    poseKey: 'sleepy',
    imageUrl: TAIGA.poses.sleepy,
  },
  {
    name: 'Baby Whale',
    vibe: 'Gentle Giant',
    poseKey: 'eating',
    imageUrl:
      'https://images.hatchly.me/marketing/pets/baby-whale/poses/219bc621-1d82-4378-b559-42a6fcedda94.png',
  },
  {
    name: 'Puppy',
    vibe: 'Friendly',
    poseKey: 'happy',
    imageUrl: 'https://images.hatchly.me/marketing/pets/puppy/011fadb7-9c91-41cb-b688-f15cf7bda2fc.png',
  },
  {
    name: 'Koala',
    vibe: 'Sleepy',
    poseKey: 'happy',
    imageUrl: 'https://images.hatchly.me/marketing/pets/koala/e3a7c046-ee83-431f-91c5-342da6c8a338.png',
  },
  {
    name: 'Kitten',
    vibe: 'Soft',
    poseKey: 'happy',
    imageUrl: 'https://images.hatchly.me/marketing/pets/kitten/e2afddae-5604-492e-ab15-bc4df5a9e94a.png',
  },
  {
    name: 'Fuzzy Otter',
    vibe: 'Snuggly',
    poseKey: 'happy',
    imageUrl:
      'https://images.hatchly.me/marketing/pets/fuzzy-otter/8fd01e60-a732-4b8e-880b-65ada9786fad.png',
  },
  {
    name: 'Penguin',
    vibe: 'Waddly',
    poseKey: 'happy',
    imageUrl:
      'https://images.hatchly.me/marketing/pets/penguin/09b889fd-ff4f-4606-859c-60dcd6a407e4.png',
  },
  {
    name: 'Mochi Cat',
    vibe: 'Squishy',
    poseKey: 'happy',
    imageUrl:
      'https://images.hatchly.me/marketing/pets/mochi-cat/3aa2b0d5-62cf-49f3-878f-24708f181084.png',
  },
  {
    name: 'Quokka',
    vibe: 'Smiley',
    poseKey: 'happy',
    imageUrl: 'https://images.hatchly.me/marketing/pets/quokka/2f24cf47-8d82-406e-8294-5ce5829a0db6.png',
  },
  {
    name: 'Duckling',
    vibe: 'Quirky',
    poseKey: 'happy',
    imageUrl:
      'https://images.hatchly.me/marketing/pets/duckling/9dedd2a7-390a-46b5-ab4c-e1cac88adf99.png',
  },
];
