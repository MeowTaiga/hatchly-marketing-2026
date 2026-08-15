/**
 * Hatchly App Store screenshot generator
 * Output: 1320×2868 PNG (Apple 6.9") — no alpha
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CACHE = path.join(ROOT, 'app-store-screenshots', '_cache');
const OUT = path.join(ROOT, 'app-store-screenshots', 'iphone-6.9');

const W = 1320;
const H = 2868;

const DOWNLOADS = {
  wispHappy:
    'https://images.hatchly.me/pets/69965be4895a270de9cec7cc/poses/edef8d11-3f0d-4abe-92d1-23020f6f18e1.png',
  wispSleepy:
    'https://images.hatchly.me/pets/69965be4895a270de9cec7cc/poses/68236189-b3c3-4a1f-be52-8d2c8dda08f3.png',
  whale:
    'https://images.hatchly.me/marketing/pets/baby-whale/poses/219bc621-1d82-4378-b559-42a6fcedda94.png',
  puppy: 'https://images.hatchly.me/marketing/pets/puppy/011fadb7-9c91-41cb-b688-f15cf7bda2fc.png',
  koala: 'https://images.hatchly.me/marketing/pets/koala/e3a7c046-ee83-431f-91c5-342da6c8a338.png',
  kitten: 'https://images.hatchly.me/marketing/pets/kitten/e2afddae-5604-492e-ab15-bc4df5a9e94a.png',
  otter:
    'https://images.hatchly.me/marketing/pets/fuzzy-otter/8fd01e60-a732-4b8e-880b-65ada9786fad.png',
  penguin:
    'https://images.hatchly.me/marketing/pets/penguin/09b889fd-ff4f-4606-859c-60dcd6a407e4.png',
  farm: 'https://images.hatchly.me/scenes/farm_20x28/4b4637d1-96d2-4e7e-a0d6-a40b94a37e02.png',
  town: 'https://images.hatchly.me/scenes/town/aa93e1c6-83ea-4a86-ac8e-43380eefbc6b.png',
  // Items
  soil: 'https://images.hatchly.me/game-items/soil/512ed8dd-c8d4-4534-8b13-d237c8763302.png',
  shovel: 'https://images.hatchly.me/game-items/stick_shovel/b9baf79a-30b1-48fd-8f64-e882cde4c133.png',
  axe: 'https://images.hatchly.me/game-items/stick_axe/295ba978-c77c-44ee-8acd-491e29d71d0c.png',
  pickaxe:
    'https://images.hatchly.me/game-items/stick_pickaxe/59b14c5b-2a01-4533-99fd-09502f5b78ec.png',
  pole: 'https://images.hatchly.me/game-items/stick_fishing_pole/f01e125a-d82b-4cc1-9b11-c29926d41094.png',
  net: 'https://images.hatchly.me/game-items/stick_net/f2d16cf5-7758-4ca8-92b1-68d9c8725a1c.png',
  stick: 'https://images.hatchly.me/game-items/stick/c9c608a0-084c-4ac1-accd-2c5203b06e8b.png',
  stone: 'https://images.hatchly.me/game-items/stone/076d2169-c27e-4143-a167-72477327d96f.png',
  wheat: 'https://images.hatchly.me/game-items/wheat/4f505e35-a2d9-4ee3-a420-a003406d0ba3.png',
  carrot: 'https://images.hatchly.me/game-items/carrot/97ce3002-8a5c-4852-933d-382ad5f38e0d.png',
  tomato: 'https://images.hatchly.me/game-items/tomato/b7fac22d-e7c0-407f-b940-97951c1cc501.png',
  pumpkin: 'https://images.hatchly.me/game-items/pumpkin/44e34d90-99f2-4d35-9014-ec1c182d4da4.png',
  trout: 'https://images.hatchly.me/game-items/trout/40f6f027-15ed-405f-ad31-5b53ab3c3e12.png',
  salmon: 'https://images.hatchly.me/game-items/salmon/6676807c-5551-44c7-a350-67c18c00b9f1.png',
  ladybug: 'https://images.hatchly.me/game-items/ladybug/e1d5b097-73b7-4122-8cd7-0a2c6a402244.png',
  butterfly:
    'https://images.hatchly.me/game-items/monarch_butterfly/bc8684e5-2ce9-47a1-b9ff-769ac230356a.png',
  pot: 'https://images.hatchly.me/game-items/cooking_pot/6486f9f8-d867-4d33-a358-b106448b7294.png',
  pie: 'https://images.hatchly.me/game-items/pumpkin_pie/255b9d4a-acc5-411f-b300-d3ccf7d8f614.png',
  soup: 'https://images.hatchly.me/game-items/tomato_soup/b8ec5143-cb34-4c82-8d47-e007d0ff9a39.png',
  salad: 'https://images.hatchly.me/game-items/garden_salad/79574eab-8e0d-4816-b156-065e2b8acabe.png',
  apple: 'https://images.hatchly.me/game-items/apple/4d5cbf0f-4e75-40e6-beba-48758e468d30.png',
  table:
    'https://images.hatchly.me/game-items/primitive_crafting_table/0fc888df-b44f-475f-823f-868f3d704ad5.png',
};

function cachePath(key) {
  return path.join(CACHE, `${key}.png`);
}

function get(url, dest) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(dest);
    https
      .get(url, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          f.close();
          fs.unlinkSync(dest);
          return get(r.headers.location, dest).then(resolve, reject);
        }
        if (r.statusCode !== 200) {
          f.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${r.statusCode} for ${url}`));
        }
        r.pipe(f);
        f.on('finish', () => f.close(() => resolve()));
      })
      .on('error', reject);
  });
}

async function ensureAssets() {
  fs.mkdirSync(CACHE, { recursive: true });
  for (const [key, url] of Object.entries(DOWNLOADS)) {
    const dest = cachePath(key);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 800) continue;
    process.stdout.write(`dl ${key}… `);
    try {
      await get(url, dest);
      console.log('ok');
    } catch (err) {
      console.log('skip', err.message);
      // bread URL may 404 — ignore optional misses
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
    }
  }
}

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function bgSvg({ top, mid, bottom, caption, sub, lightText = false }) {
  const title = lightText ? '#fff4e8' : '#3a2448';
  const body = lightText ? '#ffc4d8' : '#6a4d7a';
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${top}"/>
      <stop offset="45%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${bottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${lightText ? 0.12 : 0.5}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="${W / 2}" y="200" text-anchor="middle"
    font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-size="72" font-weight="900" fill="${title}">${esc(caption)}</text>
  <text x="${W / 2}" y="275" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="34" font-weight="700" fill="${body}">${esc(sub)}</text>
</svg>`);
}

function homeUiSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff5f9"/><stop offset="100%" stop-color="#e8f7ff"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <text x="${width / 2}" y="80" text-anchor="middle" font-family="Arial Black, Arial" font-size="32" fill="#3a2448">Home</text>
  <rect x="36" y="110" width="${width - 72}" height="200" rx="24" fill="#fff" fill-opacity="0.92"/>
  <text x="${width / 2}" y="165" text-anchor="middle" font-family="Arial" font-size="26" font-weight="700" fill="#6a4d7a">Wisp</text>
  <rect x="60" y="190" width="${width - 120}" height="16" rx="8" fill="#ffe0ec"/>
  <rect x="60" y="190" width="${(width - 120) * 0.7}" height="16" rx="8" fill="#ff6b9d"/>
  <text x="${width / 2}" y="245" text-anchor="middle" font-family="Arial" font-size="20" fill="#8a6a9a">Lv 4 · cozy streak</text>
  ${['Water', 'Food', 'Mood', 'Move']
    .map((label, i) => {
      const colors = ['#7ee0c8', '#ff6b9d', '#c9a0ff', '#ffc107'];
      const gap = (width - 72) / 4;
      const cx = 36 + gap * i + gap / 2;
      return `<circle cx="${cx}" cy="390" r="42" fill="${colors[i]}" fill-opacity="0.35"/>
        <circle cx="${cx}" cy="390" r="32" fill="none" stroke="${colors[i]}" stroke-width="7"/>
        <text x="${cx}" y="455" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="#3a2448">${label}</text>`;
    })
    .join('')}
  <rect x="36" y="500" width="${width - 72}" height="140" rx="22" fill="#fff" fill-opacity="0.9"/>
  <text x="60" y="555" font-family="Arial Black, Arial" font-size="24" fill="#3a2448">Today's adventure</text>
  <text x="60" y="595" font-family="Arial" font-size="20" fill="#6a4d7a">Farm · Fish · Craft</text>
</svg>`);
}

function chatUiSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#eef8ff"/>
  <text x="40" y="80" font-family="Arial Black, Arial" font-size="32" fill="#3a2448">Chat</text>
  <text x="40" y="118" font-family="Arial" font-size="20" fill="#6a4d7a">Wisp · online</text>
  <rect x="32" y="160" width="${width * 0.72}" height="100" rx="22" fill="#fff"/>
  <text x="52" y="210" font-family="Arial" font-size="22" fill="#3a2448">How are you feeling?</text>
  <rect x="${width * 0.2}" y="290" width="${width * 0.72}" height="90" rx="22" fill="#ff6b9d"/>
  <text x="${width * 0.26}" y="345" font-family="Arial" font-size="22" fill="#fff">I showed up today.</text>
  <rect x="32" y="410" width="${width * 0.76}" height="100" rx="22" fill="#fff"/>
  <text x="52" y="460" font-family="Arial" font-size="22" fill="#3a2448">Proud of you. Log it?</text>
</svg>`);
}

function craftMgSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#2a1c34"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="28" fill="#fff4e8">Craft</text>
  <text x="${width / 2}" y="110" text-anchor="middle" font-family="Arial" font-size="18" fill="#ffc4d8">Repeat the pads</text>
  ${['#4CAF50', '#2196F3', '#FFC107', '#E91E63']
    .map((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const pad = Math.min(width, height) * 0.28;
      const x = width * 0.18 + col * (pad + 24);
      const y = height * 0.28 + row * (pad + 24);
      const lit = i === 0 ? 1 : 0.45;
      return `<rect x="${x}" y="${y}" width="${pad}" height="${pad}" rx="18" fill="${c}" fill-opacity="${lit}"/>`;
    })
    .join('')}
</svg>`);
}

function cookMgSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#2a1c34"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="28" fill="#fff4e8">Cook</text>
  <text x="${width / 2}" y="110" text-anchor="middle" font-family="Arial" font-size="18" fill="#ffc4d8">Hit the sweet spot</text>
  <rect x="${width * 0.1}" y="${height * 0.45}" width="${width * 0.8}" height="36" rx="18" fill="#e8457a"/>
  <rect x="${width * 0.32}" y="${height * 0.45}" width="${width * 0.36}" height="36" fill="#ffc107"/>
  <rect x="${width * 0.4}" y="${height * 0.45}" width="${width * 0.2}" height="36" fill="#4caf50"/>
  <rect x="${width * 0.55}" y="${height * 0.43}" width="6" height="48" fill="#fff"/>
  <rect x="${width * 0.3}" y="${height * 0.62}" width="${width * 0.4}" height="52" rx="26" fill="#ff6b9d"/>
  <text x="${width / 2}" y="${height * 0.62 + 34}" text-anchor="middle" font-family="Arial Black, Arial" font-size="24" fill="#fff">TAP!</text>
</svg>`);
}

function fishMgSvg({ width, height }) {
  const cx = width / 2;
  const cy = height * 0.52;
  const r = Math.min(width, height) * 0.28;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#1a3048"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="28" fill="#fff4e8">Fish</text>
  <text x="${width / 2}" y="110" text-anchor="middle" font-family="Arial" font-size="18" fill="#9ed0f5">Land the green zone</text>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="14"/>
  <path d="M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r * 0.7} ${cy - r * 0.7}" fill="none" stroke="#4caf50" stroke-width="14" stroke-linecap="round"/>
  <circle cx="${cx + r * 0.55}" cy="${cy - r * 0.8}" r="16" fill="#fff"/>
</svg>`);
}

function skillsUiSvg({ width, height }) {
  const skills = [
    ['Farming', '#5B8C3E', 0.72],
    ['Fishing', '#3B82C4', 0.55],
    ['Cooking', '#E07A3D', 0.48],
    ['Crafting', '#8B6914', 0.63],
    ['Mining', '#6B7280', 0.4],
    ['Social', '#D4537E', 0.58],
    ['Health', '#7BB67A', 0.8],
  ];
  const rowH = Math.floor((height - 140) / skills.length);
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#fff8f2"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="30" fill="#3a2448">Life skills</text>
  <text x="${width / 2}" y="108" text-anchor="middle" font-family="Arial" font-size="18" fill="#6a4d7a">Level up by showing up</text>
  ${skills
    .map(([label, color, pct], i) => {
      const y = 130 + i * rowH;
      const barW = width - 80;
      return `<text x="40" y="${y + 22}" font-family="Arial" font-size="20" font-weight="700" fill="#3a2448">${label}</text>
        <rect x="40" y="${y + 32}" width="${barW}" height="14" rx="7" fill="#eee4da"/>
        <rect x="40" y="${y + 32}" width="${barW * pct}" height="14" rx="7" fill="${color}"/>`;
    })
    .join('')}
</svg>`);
}

function foodLogUiSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#fff5f9"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="30" fill="#3a2448">Food log</text>
  <text x="${width / 2}" y="108" text-anchor="middle" font-family="Arial" font-size="18" fill="#6a4d7a">Soft tracking — no guilt spiral</text>
  <rect x="36" y="140" width="${width - 72}" height="120" rx="22" fill="#fff"/>
  <text x="56" y="190" font-family="Arial Black, Arial" font-size="24" fill="#3a2448">Today</text>
  <text x="56" y="230" font-family="Arial" font-size="22" fill="#ff6b9d">3 meals · +XP</text>
  ${['Breakfast', 'Lunch', 'Snack']
    .map((label, i) => {
      const y = 290 + i * 110;
      return `<rect x="36" y="${y}" width="${width - 72}" height="92" rx="20" fill="#fff"/>
        <text x="120" y="${y + 40}" font-family="Arial" font-size="22" font-weight="700" fill="#3a2448">${label}</text>
        <text x="120" y="${y + 70}" font-family="Arial" font-size="18" fill="#6a4d7a">Logged with Wisp</text>
        <circle cx="76" cy="${y + 46}" r="28" fill="#ffe0ec"/>`;
    })
    .join('')}
  <rect x="60" y="${height - 120}" width="${width - 120}" height="64" rx="32" fill="#ff6b9d"/>
  <text x="${width / 2}" y="${height - 78}" text-anchor="middle" font-family="Arial Black, Arial" font-size="24" fill="#fff">Log a meal</text>
</svg>`);
}

function tradeUiSvg({ width, height }) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#e8f7ff"/>
  <text x="${width / 2}" y="70" text-anchor="middle" font-family="Arial Black, Arial" font-size="28" fill="#3a2448">Live trade</text>
  <text x="${width / 2}" y="108" text-anchor="middle" font-family="Arial" font-size="18" fill="#6a4d7a">Realtime with friends</text>
  <rect x="28" y="140" width="${width / 2 - 40}" height="280" rx="22" fill="#fff"/>
  <text x="${width / 4}" y="185" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#3a2448">You offer</text>
  <circle cx="${width / 4}" cy="280" r="54" fill="#dff5ea"/>
  <text x="${width / 4}" y="380" text-anchor="middle" font-family="Arial" font-size="18" fill="#6a4d7a">Carrot x3</text>
  <rect x="${width / 2 + 12}" y="140" width="${width / 2 - 40}" height="280" rx="22" fill="#fff"/>
  <text x="${(width * 3) / 4}" y="185" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#3a2448">They offer</text>
  <circle cx="${(width * 3) / 4}" cy="280" r="54" fill="#ffe0ec"/>
  <text x="${(width * 3) / 4}" y="380" text-anchor="middle" font-family="Arial" font-size="18" fill="#6a4d7a">Trout x1</text>
  <text x="${width / 2}" y="480" text-anchor="middle" font-family="Arial Black, Arial" font-size="36" fill="#ff6b9d">⇄</text>
  <rect x="40" y="520" width="${width - 80}" height="70" rx="35" fill="#7ee0c8"/>
  <text x="${width / 2}" y="565" text-anchor="middle" font-family="Arial Black, Arial" font-size="24" fill="#234">Accept trade</text>
  <rect x="36" y="620" width="${width - 72}" height="100" rx="20" fill="#fff"/>
  <text x="56" y="665" font-family="Arial" font-size="20" font-weight="700" fill="#3a2448">Island online</text>
  <text x="56" y="698" font-family="Arial" font-size="18" fill="#6a4d7a">3 friends nearby</text>
</svg>`);
}

async function sprite(file, { left, top, width, rotate = 0 }) {
  if (!fs.existsSync(file)) return null;
  const img = sharp(file).resize({ width, withoutEnlargement: false });
  const buf = rotate
    ? await img.rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    : await img.png().toBuffer();
  return { input: buf, left: Math.round(left), top: Math.round(top) };
}

async function bezelOverlay({ x, y, pw, ph, rotate }) {
  const inset = 16;
  const screenW = pw - inset * 2;
  const screenH = ph - inset * 2;
  const cx = x + pw / 2;
  const cy = y + ph / 2;
  const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(${rotate} ${cx} ${cy})">
    <defs>
      <mask id="m">
        <rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="56" ry="56" fill="white"/>
        <rect x="${x + inset}" y="${y + inset}" width="${screenW}" height="${screenH}" rx="44" ry="44" fill="black"/>
      </mask>
    </defs>
    <rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="56" ry="56" fill="#1c1224" mask="url(#m)"/>
    <rect x="${cx - Math.round(pw * 0.16)}" y="${y + 22}" width="${Math.round(pw * 0.32)}" height="28" rx="14" fill="#0d0812"/>
  </g>
</svg>`);
  return sharp(svg).png().toBuffer();
}

async function placeScreen(screenBuf, { x, y, pw, ph, rotate }) {
  const cx = x + pw / 2;
  const cy = y + ph / 2;
  const rotated = await sharp(screenBuf)
    .rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const meta = await sharp(rotated).metadata();
  return {
    input: rotated,
    left: Math.round(cx - meta.width / 2),
    top: Math.round(cy - meta.height / 2 + 2),
  };
}

async function makeShot({
  fileName,
  top,
  mid,
  bottom,
  caption,
  sub,
  lightText = false,
  phones = [],
  floaters = [],
}) {
  const bg = await sharp(bgSvg({ top, mid, bottom, caption, sub, lightText })).png().toBuffer();
  const layers = [];

  for (const phone of phones) {
    const { x, y, pw, ph, rotate = 0, ui, sceneKey } = phone;
    const inset = 16;
    const sw = pw - inset * 2;
    const sh = ph - inset * 2;
    let screenBuf;
    if (sceneKey && fs.existsSync(cachePath(sceneKey))) {
      screenBuf = await sharp(cachePath(sceneKey))
        .resize(sw, sh, { fit: 'cover', position: 'centre' })
        .png()
        .toBuffer();
    } else if (ui === 'chat') screenBuf = await sharp(chatUiSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'craft') screenBuf = await sharp(craftMgSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'cook') screenBuf = await sharp(cookMgSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'fish') screenBuf = await sharp(fishMgSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'skills') screenBuf = await sharp(skillsUiSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'food') screenBuf = await sharp(foodLogUiSvg({ width: sw, height: sh })).png().toBuffer();
    else if (ui === 'trade') screenBuf = await sharp(tradeUiSvg({ width: sw, height: sh })).png().toBuffer();
    else screenBuf = await sharp(homeUiSvg({ width: sw, height: sh })).png().toBuffer();

    layers.push(await placeScreen(screenBuf, { x, y, pw, ph, rotate }));
    layers.push({ input: await bezelOverlay({ x, y, pw, ph, rotate }), left: 0, top: 0 });
  }

  for (const f of floaters) {
    const layer = await sprite(cachePath(f.key), f);
    if (layer) layers.push(layer);
  }

  const outPath = path.join(OUT, fileName);
  await sharp(bg)
    .composite(layers)
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`✓ ${fileName}  ${meta.width}×${meta.height}`);
}

async function main() {
  await ensureAssets();
  fs.mkdirSync(OUT, { recursive: true });

  // 01 — hero pets
  await makeShot({
    fileName: '01-meet-wisp.png',
    top: '#ffd0e4',
    mid: '#ffc4d8',
    bottom: '#b8e4ff',
    caption: 'Meet your cuddle buddy',
    sub: 'A cozy AI pet that grows with you',
    phones: [{ x: 260, y: 720, pw: 800, ph: 1640, rotate: -7, ui: 'home' }],
    floaters: [
      { key: 'wispHappy', left: 180, top: 980, width: 920, rotate: -4 },
      { key: 'puppy', left: 40, top: 1680, width: 340, rotate: -12 },
      { key: 'kitten', left: 980, top: 1720, width: 300, rotate: 10 },
      { key: 'apple', left: 80, top: 900, width: 140, rotate: -20 },
      { key: 'pie', left: 1080, top: 1100, width: 160, rotate: 15 },
    ],
  });

  // 02 — 3-way mini-games
  await makeShot({
    fileName: '02-minigames-trio.png',
    top: '#2a1c34',
    mid: '#3a2448',
    bottom: '#1a3048',
    caption: 'Playful mini-games',
    sub: 'Craft · Cook · Fish',
    lightText: true,
    phones: [
      { x: 40, y: 780, pw: 380, ph: 780, rotate: -10, ui: 'craft' },
      { x: 470, y: 700, pw: 400, ph: 820, rotate: 0, ui: 'cook' },
      { x: 900, y: 780, pw: 380, ph: 780, rotate: 10, ui: 'fish' },
    ],
    floaters: [
      { key: 'axe', left: 60, top: 1620, width: 200, rotate: -18 },
      { key: 'pot', left: 520, top: 1580, width: 240, rotate: 8 },
      { key: 'pole', left: 980, top: 1600, width: 220, rotate: 16 },
      { key: 'stick', left: 280, top: 1900, width: 140, rotate: -8 },
      { key: 'stone', left: 700, top: 1920, width: 140, rotate: 12 },
      { key: 'trout', left: 1050, top: 1880, width: 180, rotate: -6 },
      { key: 'table', left: 40, top: 2100, width: 200, rotate: -6 },
      { key: 'soup', left: 560, top: 2120, width: 180, rotate: 10 },
      { key: 'salmon', left: 980, top: 2140, width: 180, rotate: -12 },
      { key: 'wispHappy', left: 480, top: 2300, width: 360, rotate: 0 },
    ],
  });

  // 03 — life skills
  await makeShot({
    fileName: '03-life-skills.png',
    top: '#dff5ea',
    mid: '#fff4e8',
    bottom: '#ffe4cc',
    caption: 'Level real life skills',
    sub: 'Farming · Fishing · Cooking · Crafting · more',
    phones: [{ x: 280, y: 640, pw: 760, ph: 1560, rotate: -5, ui: 'skills' }],
    floaters: [
      { key: 'shovel', left: 40, top: 900, width: 220, rotate: -16 },
      { key: 'net', left: 1020, top: 980, width: 220, rotate: 14 },
      { key: 'pickaxe', left: 60, top: 1400, width: 220, rotate: 10 },
      { key: 'wheat', left: 1050, top: 1500, width: 180, rotate: -8 },
      { key: 'carrot', left: 80, top: 1900, width: 170, rotate: 12 },
      { key: 'tomato', left: 1080, top: 1950, width: 170, rotate: -14 },
      { key: 'wispSleepy', left: 420, top: 1980, width: 480, rotate: 4 },
    ],
  });

  // 04 — food logging
  await makeShot({
    fileName: '04-food-logging.png',
    top: '#ffe8f0',
    mid: '#fff5f9',
    bottom: '#dff5ea',
    caption: 'Log meals, gently',
    sub: 'Food tracking that feels kind',
    phones: [{ x: 300, y: 620, pw: 720, ph: 1500, rotate: 5, ui: 'food' }],
    floaters: [
      { key: 'apple', left: 40, top: 800, width: 200, rotate: -18 },
      { key: 'carrot', left: 1050, top: 860, width: 190, rotate: 12 },
      { key: 'salad', left: 60, top: 1200, width: 220, rotate: 8 },
      { key: 'soup', left: 1040, top: 1280, width: 220, rotate: -10 },
      { key: 'pie', left: 80, top: 1700, width: 230, rotate: -6 },
      { key: 'pumpkin', left: 1060, top: 1750, width: 200, rotate: 14 },
      { key: 'wispHappy', left: 480, top: 1900, width: 420, rotate: -3 },
      { key: 'tomato', left: 200, top: 2200, width: 160, rotate: 10 },
      { key: 'wheat', left: 960, top: 2220, width: 160, rotate: -8 },
    ],
  });

  // 05 — multiplayer + trading
  await makeShot({
    fileName: '05-multiplayer-trade.png',
    top: '#c8eaff',
    mid: '#a8dbff',
    bottom: '#dff5ea',
    caption: 'Play together live',
    sub: 'Realtime island · trade items with friends',
    phones: [{ x: 290, y: 600, pw: 740, ph: 1520, rotate: -4, ui: 'trade', sceneKey: null }],
    floaters: [
      { key: 'puppy', left: 20, top: 700, width: 300, rotate: -12 },
      { key: 'otter', left: 980, top: 740, width: 300, rotate: 12 },
      { key: 'carrot', left: 180, top: 1200, width: 150, rotate: -8 },
      { key: 'trout', left: 1000, top: 1250, width: 180, rotate: 10 },
      { key: 'apple', left: 60, top: 1600, width: 160, rotate: 14 },
      { key: 'salmon', left: 1080, top: 1680, width: 170, rotate: -12 },
      { key: 'ladybug', left: 220, top: 2000, width: 140, rotate: 6 },
      { key: 'butterfly', left: 980, top: 2050, width: 160, rotate: -8 },
      { key: 'whale', left: 420, top: 2100, width: 460, rotate: 0 },
    ],
  });

  // 06 — chat
  await makeShot({
    fileName: '06-chat-checkin.png',
    top: '#c8eaff',
    mid: '#dff5ea',
    bottom: '#fff4e8',
    caption: 'Gentle check-ins',
    sub: 'Chat with your pet — never a lecture',
    phones: [{ x: 300, y: 700, pw: 720, ph: 1480, rotate: 6, ui: 'chat' }],
    floaters: [
      { key: 'wispSleepy', left: 720, top: 900, width: 560, rotate: 8 },
      { key: 'otter', left: 20, top: 1500, width: 360, rotate: -14 },
    ],
  });

  // 07 — farm + items cascade
  await makeShot({
    fileName: '07-farm-items.png',
    top: '#d8f8ee',
    mid: '#b8f0de',
    bottom: '#ffe4cc',
    caption: 'Grow a cozy world',
    sub: 'Crops, tools, bugs & catches',
    phones: [{ x: 320, y: 680, pw: 680, ph: 1400, rotate: -5, sceneKey: 'farm' }],
    floaters: [
      { key: 'soil', left: 40, top: 750, width: 200, rotate: -10 },
      { key: 'shovel', left: 1050, top: 800, width: 200, rotate: 12 },
      { key: 'wheat', left: 60, top: 1100, width: 170, rotate: 8 },
      { key: 'carrot', left: 1080, top: 1150, width: 160, rotate: -8 },
      { key: 'tomato', left: 40, top: 1450, width: 160, rotate: -14 },
      { key: 'pumpkin', left: 1060, top: 1500, width: 180, rotate: 10 },
      { key: 'ladybug', left: 80, top: 1750, width: 140, rotate: 6 },
      { key: 'butterfly', left: 1080, top: 1800, width: 150, rotate: -10 },
      { key: 'trout', left: 200, top: 2050, width: 170, rotate: 8 },
      { key: 'axe', left: 980, top: 2080, width: 180, rotate: -12 },
      { key: 'wispHappy', left: 460, top: 1900, width: 400, rotate: 2 },
    ],
  });

  // 08 — flock
  await makeShot({
    fileName: '08-your-flock.png',
    top: '#ffe8f0',
    mid: '#ffd0e4',
    bottom: '#c8eaff',
    caption: 'Every hatch is unique',
    sub: 'Collect a soft flock of friends',
    phones: [{ x: 360, y: 900, pw: 600, ph: 1240, rotate: -4, ui: 'home' }],
    floaters: [
      { key: 'puppy', left: 40, top: 780, width: 360, rotate: -16 },
      { key: 'koala', left: 900, top: 820, width: 340, rotate: 14 },
      { key: 'kitten', left: 20, top: 1400, width: 320, rotate: 8 },
      { key: 'otter', left: 920, top: 1480, width: 340, rotate: -10 },
      { key: 'whale', left: 380, top: 1980, width: 500, rotate: 0 },
      { key: 'penguin', left: 100, top: 2100, width: 260, rotate: -8 },
    ],
  });

  console.log(`\nWrote shots to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
