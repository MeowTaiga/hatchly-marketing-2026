import type { GameItem } from '../data/gameItems';
import { CRAFT_STORY, COOK_STORIES } from '../data/screenies';
import { TAIGA } from '../data/taiga';

type Mat = { item: GameItem; have: number; need: number };

type RecipeTile = {
  result: GameItem;
  mats: Mat[];
  action: string;
};

const STICK = CRAFT_STORY.bits[0];
const STONE = CRAFT_STORY.bits[1];

const CRAFT_RECIPES: RecipeTile[] = [
  {
    result: CRAFT_STORY.tools[0],
    mats: [
      { item: STICK, have: 4, need: 3 },
      { item: STONE, have: 2, need: 1 },
    ],
    action: 'Craft',
  },
  {
    result: {
      id: 'stone_axe',
      label: 'Stone Axe',
      imageUrl: 'https://images.hatchly.me/game-items/stone_axe/fcde6809-e26a-4333-b4af-6cc4f2cfd116.png',
    },
    mats: [
      { item: STICK, have: 4, need: 2 },
      { item: STONE, have: 3, need: 3 },
    ],
    action: 'Craft',
  },
  {
    result: {
      id: 'stone_pickaxe',
      label: 'Stone Pick',
      imageUrl:
        'https://images.hatchly.me/game-items/stone_pickaxe/51539821-6473-4305-8b7f-b10657e61e54.png',
    },
    mats: [
      { item: STICK, have: 4, need: 2 },
      { item: STONE, have: 3, need: 3 },
    ],
    action: 'Craft',
  },
  {
    result: {
      id: 'jack_o_lantern',
      label: "Jack-o'-lantern",
      imageUrl:
        'https://images.hatchly.me/game-items/jack_o_lantern/2ec02747-1513-4822-8d6a-eeaba0ca7982.png',
    },
    mats: [
      {
        item: {
          id: 'pumpkin',
          label: 'Pumpkin',
          imageUrl:
            'https://images.hatchly.me/game-items/pumpkin/44e34d90-99f2-4d35-9014-ec1c182d4da4.png',
        },
        have: 2,
        need: 1,
      },
      { item: STICK, have: 4, need: 1 },
    ],
    action: 'Craft',
  },
];

const COOK_RECIPES: RecipeTile[] = COOK_STORIES.map((story) => ({
  result: story.result,
  mats: story.ingredients.map((ing, i) => ({
    item: ing,
    have: i === 0 ? 2 : 1,
    need: 1,
  })),
  action: 'Cook',
}));

function RecipeGrid({ recipes, accent }: { recipes: RecipeTile[]; accent: string }) {
  return (
    <div className="app-ui-grid">
      {recipes.map((recipe) => {
        const can = recipe.mats.every((m) => m.have >= m.need);
        return (
          <article key={recipe.result.id} className="app-ui-tile">
            <img src={recipe.result.imageUrl} alt="" className="app-ui-result" />
            <p className="app-ui-name">{recipe.result.label}</p>
            <div className="app-ui-mats">
              {recipe.mats.map((m) => (
                <span
                  key={m.item.id}
                  className={`app-ui-mat ${m.have < m.need ? 'is-short' : ''}`}
                >
                  <img src={m.item.imageUrl} alt="" />
                  {m.have}/{m.need}
                </span>
              ))}
            </div>
            <span className={`app-ui-cta ${can ? '' : 'is-disabled'}`} style={{ background: accent }}>
              {recipe.action}
            </span>
          </article>
        );
      })}
    </div>
  );
}

/** Main Home tab mock — pet hero, trackers, cards, floating tab bar. */
export function HomeTabScreen() {
  return (
    <div className="app-ui-screen home-tab-screen" aria-label="Hatchly home tab">
      <div className="home-tab-hero">
        <div className="home-tab-stats" aria-hidden="true">
          <span>♥ 92</span>
          <span>🍽 80</span>
          <span>✨ 88</span>
        </div>
        <img className="home-tab-pet" src={TAIGA.poses.happy} alt="" />
        <p className="home-tab-name">
          Wisp <span>Lv. 12</span>
        </p>
        <div className="home-tab-xp" aria-hidden="true">
          <i style={{ width: '68%' }} />
        </div>
      </div>

      <div className="home-tab-rings" aria-hidden="true">
        <span className="is-cyan">
          <b>6.2k</b>
          <small>Steps</small>
        </span>
        <span className="is-pink">
          <b>420</b>
          <small>Cals</small>
        </span>
        <span className="is-cyan">
          <b>5</b>
          <small>Water</small>
        </span>
        <span className="is-purple">
          <b>142</b>
          <small>Lbs</small>
        </span>
      </div>

      <div className="home-tab-card">
        <p className="home-tab-kicker">Farm</p>
        <p className="home-tab-card-title">Budding · Lv 3</p>
        <div className="home-tab-mini-bar">
          <i style={{ width: '55%' }} />
        </div>
      </div>

      <div className="home-tab-card home-tab-adventure">
        <p className="home-tab-kicker">Adventure</p>
        <div className="home-tab-adv-grid">
          <span>Fish</span>
          <span>Bugs</span>
          <span>Cook</span>
          <span>Craft</span>
        </div>
      </div>

      <div className="home-tab-bar" aria-hidden="true">
        <i />
        <i />
        <strong className="home-tab-paw" />
        <i />
        <i />
      </div>
    </div>
  );
}

/** Workbench drawer mock — mirrors in-app crafting list. */
export function WorkbenchScreen() {
  return (
    <div className="app-ui-screen" aria-label="Workbench crafting UI">
      <header className="app-ui-header">
        <strong>Workbench</strong>
      </header>
      <p className="app-ui-intro">Craft with materials you have. Learn recipes from scrolls.</p>
      <div className="app-ui-tabs" aria-hidden="true">
        <span className="is-active">Tools</span>
        <span>Decor</span>
        <span>Other</span>
        <span>Scrolls</span>
      </div>
      <RecipeGrid recipes={CRAFT_RECIPES} accent="#ff6b9d" />
    </div>
  );
}

/** Cooking Pot drawer mock — mirrors in-app cooking list. */
export function CookingPotScreen() {
  return (
    <div className="app-ui-screen" aria-label="Cooking Pot UI">
      <header className="app-ui-header">
        <strong>Cooking Pot</strong>
      </header>
      <p className="app-ui-intro">Cook meals from crops, fish, and pantry bits.</p>
      <div className="app-ui-tabs" aria-hidden="true">
        <span className="is-active">Bake</span>
        <span>Salad</span>
        <span>Soup</span>
        <span>Fish</span>
      </div>
      <RecipeGrid recipes={COOK_RECIPES} accent="#3db89a" />
    </div>
  );
}

/** Simon-style crafting mini-game overlay. */
export function CraftMinigameScreen() {
  return (
    <div className="app-ui-screen app-ui-minigame" aria-label="Crafting mini-game">
      <p className="app-ui-mg-title">Repeat the pattern</p>
      <p className="app-ui-mg-sub">Watch the pads, then tap them back.</p>
      <div className="craft-pads" aria-hidden="true">
        <span className="craft-pad is-lit" style={{ background: '#4CAF50' }} />
        <span className="craft-pad" style={{ background: '#2196F3' }} />
        <span className="craft-pad" style={{ background: '#FFC107' }} />
        <span className="craft-pad" style={{ background: '#E91E63' }} />
      </div>
      <p className="app-ui-mg-hint">Miss a pad → scrap. Nail it → your tool!</p>
    </div>
  );
}

/** Timing-bar cooking mini-game overlay. */
export function CookMinigameScreen() {
  return (
    <div className="app-ui-screen app-ui-minigame" aria-label="Cooking mini-game">
      <p className="app-ui-mg-title">Cook!</p>
      <p className="app-ui-mg-sub">Tap when the needle hits the sweet spot.</p>
      <div className="cook-bar" aria-hidden="true">
        <div className="cook-bar-track">
          <span className="cook-zone cook-zone-yellow" />
          <span className="cook-zone cook-zone-green" />
          <span className="cook-needle" />
        </div>
        <span className="cook-tap">TAP!</span>
      </div>
      <p className="app-ui-mg-hint">Miss the zones → Strange Stew. Hit green → dinner!</p>
    </div>
  );
}

/** Pet AI Chat tab mock. */
export function PetChatScreen() {
  return (
    <div className="app-ui-screen chat-tab-screen" aria-label="Pet AI chat">
      <header className="app-ui-header chat-tab-header">
        <img src={TAIGA.poses.happy} alt="" />
        <div>
          <strong>Wisp</strong>
          <small>Online · gentle check-in</small>
        </div>
      </header>

      <div className="chat-thread">
        <div className="chat-bubble is-pet">Hey… how are you feeling today?</div>
        <div className="chat-bubble is-user">A little overwhelmed, but I showed up.</div>
        <div className="chat-bubble is-pet">
          That’s a win. Want to log it in your diary, or just vent with me?
        </div>
        <div className="chat-bubble is-user">Diary sounds good.</div>
        <div className="chat-bubble is-pet">Proud of you. I’m right here.</div>
      </div>

      <div className="chat-composer" aria-hidden="true">
        <span>Message Wisp…</span>
        <b>↑</b>
      </div>
    </div>
  );
}

/** Mood diary tab mock — check-in + history. */
export function DiaryScreen() {
  const moods = [
    { emoji: '😄', label: 'Great' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😕', label: 'Meh' },
    { emoji: '😢', label: 'Down' },
    { emoji: '🤩', label: 'Excited' },
  ];

  const history = [
    { day: 'Today', emoji: '🙂', note: 'Walked after dinner. Proud I showed up.' },
    { day: 'Yesterday', emoji: '🤩', note: 'Cooked tomato soup with Wisp vibes.' },
    { day: 'Mon', emoji: '😐', note: 'Slow morning. Logged water anyway.' },
  ];

  return (
    <div className="app-ui-screen diary-tab-screen" aria-label="Mood diary">
      <header className="app-ui-header">
        <strong>Diary</strong>
      </header>
      <p className="app-ui-intro">How are you feeling? Tap a mood to save.</p>

      <div className="diary-moods" aria-hidden="true">
        {moods.map((m) => (
          <span key={m.label} className={m.label === 'Good' ? 'is-active' : ''}>
            <b>{m.emoji}</b>
            <small>{m.label}</small>
          </span>
        ))}
      </div>

      <div className="diary-note-box" aria-hidden="true">
        Optional note — a sentence for your diary…
      </div>
      <span className="app-ui-cta diary-save">Save to diary · +XP</span>

      <p className="diary-history-label">Recent</p>
      <ul className="diary-history">
        {history.map((h) => (
          <li key={h.day}>
            <span className="diary-history-emoji">{h.emoji}</span>
            <div>
              <strong>{h.day}</strong>
              <p>{h.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Circular fishing reel mini-game mock. */
export function FishingMinigameScreen({ fish }: { fish: GameItem }) {
  return (
    <div className="app-ui-screen app-ui-minigame" aria-label="Fishing mini-game">
      <p className="app-ui-mg-title">Reel it in</p>
      <p className="app-ui-mg-sub">Tap when the dot hits the green arc.</p>
      <div className="fish-reel" aria-hidden="true">
        <div className="fish-reel-ring">
          <span className="fish-reel-sweet" />
          <span className="fish-reel-dot" />
        </div>
        <img className="fish-reel-center" src={fish.imageUrl} alt="" />
      </div>
      <p className="app-ui-mg-hint">Stay in the sweet spot to land the catch.</p>
    </div>
  );
}
