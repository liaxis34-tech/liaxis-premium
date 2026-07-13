// Renders public/og-image.png directly with sharp (SVG -> PNG), no headless
// browser required. Re-run after any brand copy/color change:
//   npm run generate:og
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const bgPath = path.join(publicDir, "images", "atmosphere-bg.jpg");
const outPath = path.join(publicDir, "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;
const IMAGE_PANEL_X = 676;
const IMAGE_PANEL_W = WIDTH - IMAGE_PANEL_X;

const bg = await sharp(bgPath).resize(IMAGE_PANEL_W, HEIGHT, { fit: "cover" }).toBuffer();

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDF8F8" />
      <stop offset="55%" stop-color="#F4E8E9" />
      <stop offset="100%" stop-color="#EDD9DA" />
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F4E8E9" stop-opacity="1" />
      <stop offset="16%" stop-color="#F4E8E9" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="goldRule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <text x="78" y="196" font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="5" fill="#AC8A26">PERSONALIZED FINE JEWELRY</text>

  <text x="76" y="288" font-family="Georgia, 'Times New Roman', serif" font-size="92" letter-spacing="10" fill="#2E2C2C">CHARMORA</text>

  <rect x="80" y="316" width="84" height="2" fill="url(#goldRule)" />

  <text x="78" y="384" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="42" fill="#4B4B4B">Wear Your Story</text>

  <text x="78" y="424" font-family="Verdana, sans-serif" font-size="18" fill="#6E6E6E">Create a charm combination that is uniquely yours.</text>

  <circle cx="94" cy="562" r="4" fill="#D4AF37" />
  <text x="112" y="567" font-family="Verdana, sans-serif" font-size="14" letter-spacing="3" fill="#AC8A26">CHARMORA.COM</text>

  <rect x="${IMAGE_PANEL_X}" y="0" width="${IMAGE_PANEL_W}" height="${HEIGHT}" fill="url(#fade)" />
</svg>
`;

const composed = await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: "#F4E8E9" },
})
  .composite([
    { input: bg, left: IMAGE_PANEL_X, top: 0 },
    { input: Buffer.from(svg), left: 0, top: 0 },
  ])
  .png()
  .toBuffer();

writeFileSync(outPath, composed);
console.log("OG image rendered:", outPath);
