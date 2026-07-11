// Requires Playwright (not a project dependency, since its browser download
// would slow down every `npm install` for a script that's rarely run):
//   npm install --no-save playwright && npx playwright install chromium
import { chromium } from "playwright";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "og-template.html");
const rawPath = path.join(__dirname, "og-raw.png");
const outPngPath = path.join(__dirname, "..", "public", "og-image.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(`file://${htmlPath}`);
await page.waitForTimeout(300);
await page.screenshot({ path: rawPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

await sharp(rawPath).resize(1200, 630).png().toFile(outPngPath);

console.log("OG image rendered:", outPngPath);
