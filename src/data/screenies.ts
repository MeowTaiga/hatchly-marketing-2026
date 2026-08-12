import type { GameItem } from './gameItems';

export type SceneShot = {
  id: string;
  label: string;
  imageUrl: string;
};

/** Baked farm / town / fishing scenes from Hatchly Mongo `scenes`. */
export const SCENES = {
  farmLv1: {
    id: 'farm_16x24',
    label: 'Lv1 — Seedling',
    imageUrl: 'https://images.hatchly.me/scenes/farm_16x24/fbb7afe3-10cc-43e6-923e-64c804edc68f.png',
  },
  farmLv2: {
    id: 'farm_18x26',
    label: 'Lv2 — Sprout',
    imageUrl: 'https://images.hatchly.me/scenes/farm_18x26/55c15ab6-409b-4919-944f-4fce830d05d2.png',
  },
  farmLv3: {
    id: 'farm_20x28',
    label: 'Lv3 — Budding',
    imageUrl: 'https://images.hatchly.me/scenes/farm_20x28/4b4637d1-96d2-4e7e-a0d6-a40b94a37e02.png',
  },
  town: {
    id: 'town',
    label: 'Town',
    imageUrl: 'https://images.hatchly.me/scenes/town/aa93e1c6-83ea-4a86-ac8e-43380eefbc6b.png',
  },
  townShop: {
    id: 'town_shop',
    label: 'Town Shop',
    imageUrl: 'https://images.hatchly.me/scenes/town_shop/c908b4f5-2324-4eac-97d6-a79bf43403ea.png',
  },
  fishing: {
    id: 'fishing_1',
    label: 'Fishing Hole',
    imageUrl: 'https://images.hatchly.me/scenes/fishing_1/558f7643-6fc2-43af-a999-724136160b01.png',
  },
} as const satisfies Record<string, SceneShot>;

export const FARM_SOIL: GameItem = {
  id: 'soil',
  label: 'Soil',
  imageUrl: 'https://images.hatchly.me/game-items/soil/512ed8dd-c8d4-4534-8b13-d237c8763302.png',
};

/** Seeds planted on soil plots (in-phone farm mock). */
export const FARM_SEEDS: GameItem[] = [
  {
    id: 'wheat_seed',
    label: 'Wheat Seed',
    imageUrl: 'https://images.hatchly.me/game-items/wheat_seed/cb1fc175-20dd-41e7-a3b8-cf8d93c10b64.png',
  },
  {
    id: 'carrot_seed',
    label: 'Carrot Seed',
    imageUrl: 'https://images.hatchly.me/game-items/carrot_seed/6f5fce96-a4ac-4a4a-9a82-3e6cdf5d9443.png',
  },
  {
    id: 'tomato_seeds',
    label: 'Tomato Seed',
    imageUrl: 'https://images.hatchly.me/game-items/tomato_seeds/fd4e1c89-38d4-4bc8-8079-10f7420a1a9c.png',
  },
  {
    id: 'pumpkin_seed',
    label: 'Pumpkin Seed',
    imageUrl: 'https://images.hatchly.me/game-items/pumpkin_seed/32277f5b-49b7-49ff-a2c3-1281be925da2.png',
  },
  {
    id: 'potato_seed',
    label: 'Potato Seed',
    imageUrl: 'https://images.hatchly.me/game-items/potato_seed/c78835ad-f196-4cf1-a03f-c185694d0449.png',
  },
  {
    id: 'strawberry_seed',
    label: 'Strawberry Seed',
    imageUrl:
      'https://images.hatchly.me/game-items/strawberry_seed/a4ef1911-0320-48fe-8481-866484267a3e.png',
  },
];

/** Fully grown harvest — floats around the farm chapter. */
export const FARM_CROPS: GameItem[] = [
  {
    id: 'carrot',
    label: 'Carrot',
    imageUrl: 'https://images.hatchly.me/game-items/carrot/97ce3002-8a5c-4852-933d-382ad5f38e0d.png',
  },
  {
    id: 'tomato',
    label: 'Tomato',
    imageUrl: 'https://images.hatchly.me/game-items/tomato/b7fac22d-e7c0-407f-b940-97951c1cc501.png',
  },
  {
    id: 'wheat',
    label: 'Wheat',
    imageUrl: 'https://images.hatchly.me/game-items/wheat/4f505e35-a2d9-4ee3-a420-a003406d0ba3.png',
  },
  {
    id: 'pumpkin',
    label: 'Pumpkin',
    imageUrl: 'https://images.hatchly.me/game-items/pumpkin/44e34d90-99f2-4d35-9014-ec1c182d4da4.png',
  },
  {
    id: 'potato',
    label: 'Potato',
    imageUrl: 'https://images.hatchly.me/game-items/potato/6dda6a31-4da4-495b-9826-1ea076ac772e.png',
  },
  {
    id: 'strawberry',
    label: 'Strawberry',
    imageUrl: 'https://images.hatchly.me/game-items/strawberry/6dbf9da1-7068-4824-a414-77e254ea3890.png',
  },
];

export const CRAFTING_TABLE: GameItem = {
  id: 'primitive_crafting_table',
  label: 'Workbench',
  imageUrl:
    'https://images.hatchly.me/game-items/primitive_crafting_table/0fc888df-b44f-475f-823f-868f3d704ad5.png',
};

export const CRAFT_STORY = {
  bits: [
    {
      id: 'stick',
      label: 'Stick',
      imageUrl: 'https://images.hatchly.me/game-items/stick/c9c608a0-084c-4ac1-accd-2c5203b06e8b.png',
    },
    {
      id: 'stone',
      label: 'Stone',
      imageUrl: 'https://images.hatchly.me/game-items/stone/076d2169-c27e-4143-a167-72477327d96f.png',
    },
    {
      id: 'iron',
      label: 'Iron',
      imageUrl: 'https://images.hatchly.me/game-items/iron/1bb10465-cc03-4aac-b2d2-7ad955f20dbb.png',
    },
  ] satisfies GameItem[],
  tools: [
    {
      id: 'stick_shovel',
      label: 'Shovel',
      imageUrl:
        'https://images.hatchly.me/game-items/stick_shovel/b9baf79a-30b1-48fd-8f64-e882cde4c133.png',
    },
    {
      id: 'stick_axe',
      label: 'Axe',
      imageUrl: 'https://images.hatchly.me/game-items/stick_axe/295ba978-c77c-44ee-8acd-491e29d71d0c.png',
    },
    {
      id: 'stick_pickaxe',
      label: 'Pickaxe',
      imageUrl:
        'https://images.hatchly.me/game-items/stick_pickaxe/59b14c5b-2a01-4533-99fd-09502f5b78ec.png',
    },
    {
      id: 'stick_fishing_pole',
      label: 'Pole',
      imageUrl:
        'https://images.hatchly.me/game-items/stick_fishing_pole/f01e125a-d82b-4cc1-9b11-c29926d41094.png',
    },
    {
      id: 'stick_net',
      label: 'Net',
      imageUrl: 'https://images.hatchly.me/game-items/stick_net/f2d16cf5-7758-4ca8-92b1-68d9c8725a1c.png',
    },
  ] satisfies GameItem[],
};

/** Better tools + Halloween craftables for the craft section floaters. */
export const CRAFT_FLOATERS: GameItem[] = [
  {
    id: 'stone',
    label: 'Stone',
    imageUrl: 'https://images.hatchly.me/game-items/stone/076d2169-c27e-4143-a167-72477327d96f.png',
  },
  {
    id: 'oak_wood',
    label: 'Oak Wood',
    imageUrl: 'https://images.hatchly.me/game-items/oak_wood/b134dd20-5505-4c28-9451-feb1aab48559.png',
  },
  {
    id: 'iron',
    label: 'Iron',
    imageUrl: 'https://images.hatchly.me/game-items/iron/1bb10465-cc03-4aac-b2d2-7ad955f20dbb.png',
  },
  {
    id: 'stone_axe',
    label: 'Stone Axe',
    imageUrl: 'https://images.hatchly.me/game-items/stone_axe/fcde6809-e26a-4333-b4af-6cc4f2cfd116.png',
  },
  {
    id: 'stone_pickaxe',
    label: 'Stone Pickaxe',
    imageUrl:
      'https://images.hatchly.me/game-items/stone_pickaxe/51539821-6473-4305-8b7f-b10657e61e54.png',
  },
  {
    id: 'stone_shovel',
    label: 'Stone Shovel',
    imageUrl:
      'https://images.hatchly.me/game-items/stone_shovel/9c1efae2-53e1-457a-b481-8fe9c4a65aab.png',
  },
  {
    id: 'jack_o_lantern',
    label: "Jack-o'-lantern",
    imageUrl:
      'https://images.hatchly.me/game-items/jack_o_lantern/2ec02747-1513-4822-8d6a-eeaba0ca7982.png',
  },
  {
    id: 'decoration_cute_lawn_ghost',
    label: 'Lawn Ghost',
    imageUrl:
      'https://images.hatchly.me/game-items/decoration_cute_lawn_ghost/dfd2f66a-ac80-4972-a483-1bf473d934d1.png',
  },
  {
    id: 'halloween_balloons',
    label: 'Halloween Balloons',
    imageUrl:
      'https://images.hatchly.me/game-items/halloween_balloons/aa9e163e-649c-4fdd-902b-5a43cc0449c6.png',
  },
  {
    id: 'decoration_tombstone',
    label: 'Tombstone',
    imageUrl:
      'https://images.hatchly.me/game-items/decoration_tombstone/ee8b1e7a-1b08-48bb-9498-515630a26c45.png',
  },
  {
    id: 'pumpkin_candle',
    label: 'Pumpkin Candle',
    imageUrl:
      'https://images.hatchly.me/game-items/pumpkin_candle/46813f67-a97b-4082-bc5d-c8aefd7f68a9.png',
  },
  {
    id: 'halloween_arch',
    label: 'Halloween Arch',
    imageUrl:
      'https://images.hatchly.me/game-items/halloween_arch/c32670f8-f47a-4ae3-934f-186edb103c8a.png',
  },
];

/** Ingredient → dish “recipes” for the cooking vignette. */
export const COOK_STORIES = [
  {
    id: 'pie',
    title: 'Bake something sweet',
    pot: {
      id: 'cooking_pot',
      label: 'Cooking Pot',
      imageUrl:
        'https://images.hatchly.me/game-items/cooking_pot/6486f9f8-d867-4d33-a358-b106448b7294.png',
    },
    ingredients: [
      {
        id: 'strawberry',
        label: 'Strawberry',
        imageUrl:
          'https://images.hatchly.me/game-items/strawberry/6dbf9da1-7068-4824-a414-77e254ea3890.png',
      },
      {
        id: 'flour',
        label: 'Flour',
        imageUrl: 'https://images.hatchly.me/game-items/flour/76363edf-db39-4a2a-b420-bbad7d3d91e4.png',
      },
      {
        id: 'sugar',
        label: 'Sugar',
        imageUrl: 'https://images.hatchly.me/game-items/sugar/4fbdc69e-8054-4be9-854c-48be51b3387e.png',
      },
    ] satisfies GameItem[],
    result: {
      id: 'strawberry_pie',
      label: 'Strawberry Pie',
      imageUrl:
        'https://images.hatchly.me/game-items/strawberry_pie/c7ca8379-f2a2-4ad2-a62f-dc2aba5050f9.png',
    },
  },
  {
    id: 'salad',
    title: 'Toss a garden bowl',
    pot: {
      id: 'cooking_pot',
      label: 'Cooking Pot',
      imageUrl:
        'https://images.hatchly.me/game-items/cooking_pot/6486f9f8-d867-4d33-a358-b106448b7294.png',
    },
    ingredients: [
      {
        id: 'tomato',
        label: 'Tomato',
        imageUrl: 'https://images.hatchly.me/game-items/tomato/b7fac22d-e7c0-407f-b940-97951c1cc501.png',
      },
      {
        id: 'carrot',
        label: 'Carrot',
        imageUrl: 'https://images.hatchly.me/game-items/carrot/97ce3002-8a5c-4852-933d-382ad5f38e0d.png',
      },
      {
        id: 'potato',
        label: 'Potato',
        imageUrl: 'https://images.hatchly.me/game-items/potato/6dda6a31-4da4-495b-9826-1ea076ac772e.png',
      },
    ] satisfies GameItem[],
    result: {
      id: 'garden_salad',
      label: 'Garden Salad',
      imageUrl:
        'https://images.hatchly.me/game-items/garden_salad/79574eab-8e0d-4816-b156-065e2b8acabe.png',
    },
  },
  {
    id: 'fish',
    title: 'Cook the catch',
    pot: {
      id: 'cooking_pot',
      label: 'Cooking Pot',
      imageUrl:
        'https://images.hatchly.me/game-items/cooking_pot/6486f9f8-d867-4d33-a358-b106448b7294.png',
    },
    ingredients: [
      {
        id: 'trout',
        label: 'Trout',
        imageUrl: 'https://images.hatchly.me/game-items/trout/40f6f027-15ed-405f-ad31-5b53ab3c3e12.png',
      },
      {
        id: 'water',
        label: 'Water',
        imageUrl: 'https://images.hatchly.me/game-items/water/833b2f90-1c5d-4c50-80da-5220771eb61a.png',
      },
    ] satisfies GameItem[],
    result: {
      id: 'cooked_trout',
      label: 'Cooked Trout',
      imageUrl:
        'https://images.hatchly.me/game-items/cooked_trout/6598ed81-3718-4d4b-a83e-d4d6fcb1dc84.png',
    },
  },
] as const;

export const FEAST_BOARD: GameItem[] = [
  {
    id: 'strawberry_pie',
    label: 'Strawberry Pie',
    imageUrl:
      'https://images.hatchly.me/game-items/strawberry_pie/c7ca8379-f2a2-4ad2-a62f-dc2aba5050f9.png',
  },
  {
    id: 'peach_smoothie',
    label: 'Peach Smoothie',
    imageUrl:
      'https://images.hatchly.me/game-items/peach_smoothie/6ecbf6c8-f97b-4218-adc9-79d91040f3fd.png',
  },
  {
    id: 'honey_cookies',
    label: 'Honey Cookies',
    imageUrl:
      'https://images.hatchly.me/game-items/honey_cookies/df279f7c-693c-4a3b-995f-c155cb8278b4.png',
  },
  {
    id: 'garden_salad',
    label: 'Garden Salad',
    imageUrl:
      'https://images.hatchly.me/game-items/garden_salad/79574eab-8e0d-4816-b156-065e2b8acabe.png',
  },
  {
    id: 'pumpkin_pie',
    label: 'Pumpkin Pie',
    imageUrl:
      'https://images.hatchly.me/game-items/pumpkin_pie/255b9d4a-acc5-411f-b300-d3ccf7d8f614.png',
  },
  {
    id: 'tomato_soup',
    label: 'Tomato Soup',
    imageUrl:
      'https://images.hatchly.me/game-items/tomato_soup/b8ec5143-cb34-4c82-8d47-e007d0ff9a39.png',
  },
  {
    id: 'cooked_trout',
    label: 'Cooked Trout',
    imageUrl:
      'https://images.hatchly.me/game-items/cooked_trout/6598ed81-3718-4d4b-a83e-d4d6fcb1dc84.png',
  },
  {
    id: 'bread',
    label: 'Bread',
    imageUrl: 'https://images.hatchly.me/game-items/bread/7cc70c84-7bc5-45d7-b0fa-14318336142e.png',
  },
];

/** Rare / seasonal fish for the fishing mini-game section floaters. */
export const RARE_FISH: GameItem[] = [
  {
    id: 'pastel_shark',
    label: 'Pastel Shark',
    imageUrl:
      'https://images.hatchly.me/game-items/pastel_shark/a326ab3d-bf45-4bd9-9d01-4f9fd4398ab0.png',
  },
  {
    id: 'shark',
    label: 'Shark',
    imageUrl: 'https://images.hatchly.me/game-items/shark/31a47da4-eff6-4e9a-8b85-0c4813633670.png',
  },
  {
    id: 'ghost_koi',
    label: 'Ghost Koi',
    imageUrl: 'https://images.hatchly.me/game-items/ghost_koi/bdf00af4-9e59-46c9-b052-90546bbc305b.png',
  },
  {
    id: 'skeleton_salmon',
    label: 'Skeleton Salmon',
    imageUrl:
      'https://images.hatchly.me/game-items/skeleton_salmon/39aed437-48c4-4c97-b24d-dd0c95da3251.png',
  },
  {
    id: 'witch_carp',
    label: 'Witch Carp',
    imageUrl: 'https://images.hatchly.me/game-items/witch_carp/352d802d-5d94-4f63-93f3-ce85a6d4f014.png',
  },
  {
    id: 'pumpkin_puffer',
    label: 'Pumpkin Puffer',
    imageUrl:
      'https://images.hatchly.me/game-items/pumpkin_puffer/974f3018-1400-4c4d-bd05-3f6c77c273b2.png',
  },
  {
    id: 'jellyfish',
    label: 'Jellyfish',
    imageUrl: 'https://images.hatchly.me/game-items/jellyfish/3ce82c8a-6f95-4c01-89db-9d185251856a.png',
  },
  {
    id: 'angel_fish',
    label: 'Angel Fish',
    imageUrl: 'https://images.hatchly.me/game-items/angel_fish/19ec8238-9d53-4d4e-af54-463c797e6c1a.png',
  },
  {
    id: 'koi',
    label: 'Koi',
    imageUrl: 'https://images.hatchly.me/game-items/koi/dfc26fb1-05e2-410c-a2c2-bf6660877f86.png',
  },
  {
    id: 'mantis_shrimp',
    label: 'Mantis Shrimp',
    imageUrl:
      'https://images.hatchly.me/game-items/mantis_shrimp/a060179b-1848-42bb-ba7b-cd8176a2cbc2.png',
  },
  {
    id: 'rainbow_trout',
    label: 'Rainbow Trout',
    imageUrl:
      'https://images.hatchly.me/game-items/rainbow_trout/5eacf705-9b9d-4bd5-b2de-c3cd7719ced0.png',
  },
  {
    id: 'lantern_minnow',
    label: 'Lantern Minnow',
    imageUrl:
      'https://images.hatchly.me/game-items/lantern_minnow/0b00d3e8-83d6-4156-9643-2399f6a2c58e.png',
  },
];

export const TOWN_BITS: GameItem[] = [
  {
    id: 'building_cozy_cafe',
    label: 'Cozy Café',
    imageUrl:
      'https://images.hatchly.me/game-items/building_cozy_cafe/fc4b0a45-3263-4dda-a3d7-83fbca5f4933.png',
  },
  {
    id: 'fennec_fox',
    label: 'Fennec',
    imageUrl:
      'https://images.hatchly.me/game-items/fennec_fox_fisherman/6c242ab2-e4ba-4d17-89a1-e0e9186ba007.png',
  },
  {
    id: 'trout',
    label: 'Trout',
    imageUrl: 'https://images.hatchly.me/game-items/trout/40f6f027-15ed-405f-ad31-5b53ab3c3e12.png',
  },
];
