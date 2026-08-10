/** Static game-item art from Hatchly R2 (same assets as the app / Mongo gameitemdefs). */

export type GameItem = {
  id: string;
  label: string;
  imageUrl: string;
};

export const TRADE_ITEMS: GameItem[] = [
  {
    id: 'apple',
    label: 'Apple',
    imageUrl: 'https://images.hatchly.me/game-items/apple/4d5cbf0f-4e75-40e6-beba-48758e468d30.png',
  },
  {
    id: 'carrot',
    label: 'Carrot',
    imageUrl: 'https://images.hatchly.me/game-items/carrot/97ce3002-8a5c-4852-933d-382ad5f38e0d.png',
  },
];

export const SOIL_PLOT: GameItem = {
  id: 'soil',
  label: 'Soil',
  imageUrl: 'https://images.hatchly.me/game-items/soil/512ed8dd-c8d4-4534-8b13-d237c8763302.png',
};

export const STICK_SHOVEL: GameItem = {
  id: 'stick_shovel',
  label: 'Stick Shovel',
  imageUrl:
    'https://images.hatchly.me/game-items/stick_shovel/b9baf79a-30b1-48fd-8f64-e882cde4c133.png',
};

export const STICK_TOOLS: GameItem[] = [
  STICK_SHOVEL,
  {
    id: 'stick_axe',
    label: 'Stick Axe',
    imageUrl: 'https://images.hatchly.me/game-items/stick_axe/295ba978-c77c-44ee-8acd-491e29d71d0c.png',
  },
  {
    id: 'stick_pickaxe',
    label: 'Stick Pickaxe',
    imageUrl:
      'https://images.hatchly.me/game-items/stick_pickaxe/59b14c5b-2a01-4533-99fd-09502f5b78ec.png',
  },
  {
    id: 'stick_fishing_pole',
    label: 'Stick Pole',
    imageUrl:
      'https://images.hatchly.me/game-items/stick_fishing_pole/f01e125a-d82b-4cc1-9b11-c29926d41094.png',
  },
  {
    id: 'stick_net',
    label: 'Stick Net',
    imageUrl: 'https://images.hatchly.me/game-items/stick_net/f2d16cf5-7758-4ca8-92b1-68d9c8725a1c.png',
  },
];

export const CROPS: GameItem[] = [
  {
    id: 'wheat',
    label: 'Wheat',
    imageUrl: 'https://images.hatchly.me/game-items/wheat/4f505e35-a2d9-4ee3-a420-a003406d0ba3.png',
  },
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
    id: 'pumpkin',
    label: 'Pumpkin',
    imageUrl: 'https://images.hatchly.me/game-items/pumpkin/44e34d90-99f2-4d35-9014-ec1c182d4da4.png',
  },
];

export const FISH: GameItem[] = [
  {
    id: 'trout',
    label: 'Trout',
    imageUrl: 'https://images.hatchly.me/game-items/trout/40f6f027-15ed-405f-ad31-5b53ab3c3e12.png',
  },
  {
    id: 'salmon',
    label: 'Salmon',
    imageUrl: 'https://images.hatchly.me/game-items/salmon/6676807c-5551-44c7-a350-67c18c00b9f1.png',
  },
];

export const BUGS: GameItem[] = [
  {
    id: 'ladybug',
    label: 'Ladybug',
    imageUrl: 'https://images.hatchly.me/game-items/ladybug/e1d5b097-73b7-4122-8cd7-0a2c6a402244.png',
  },
  {
    id: 'monarch_butterfly',
    label: 'Monarch',
    imageUrl:
      'https://images.hatchly.me/game-items/monarch_butterfly/bc8684e5-2ce9-47a1-b9ff-769ac230356a.png',
  },
  {
    id: 'firefly',
    label: 'Firefly',
    imageUrl: 'https://images.hatchly.me/game-items/firefly/94ea6e34-fa17-4dc0-b6b2-2bb514120924.png',
  },
  {
    id: 'dragonfly',
    label: 'Dragonfly',
    imageUrl: 'https://images.hatchly.me/game-items/dragonfly/84de0bb6-1fc7-4451-bb73-223638320dab.png',
  },
];

export const COOKING = {
  pot: {
    id: 'cooking_pot',
    label: 'Cooking Pot',
    imageUrl:
      'https://images.hatchly.me/game-items/cooking_pot/6486f9f8-d867-4d33-a358-b106448b7294.png',
  },
  meals: [
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
  ],
} as const;

export const CRAFT_BITS: GameItem[] = [
  {
    id: 'stick',
    label: 'Stick',
    imageUrl: 'https://images.hatchly.me/game-items/stick/c9c608a0-084c-4ac1-accd-2c5203b06e8b.png',
  },
  {
    id: 'iron',
    label: 'Iron',
    imageUrl: 'https://images.hatchly.me/game-items/iron/1bb10465-cc03-4aac-b2d2-7ad955f20dbb.png',
  },
  STICK_TOOLS[1], // axe
  STICK_TOOLS[2], // pickaxe
];
