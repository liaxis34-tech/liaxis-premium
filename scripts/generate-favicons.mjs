import sharp from "sharp";
import toIco from "to-ico";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const svg = readFileSync(path.join(process.cwd(), "scripts/monogram.svg"));
const svgSimple = readFileSync(path.join(process.cwd(), "scripts/monogram-simple.svg"));
const publicDir = path.join(process.cwd(), "public");

async function renderPng(source, size) {
  return sharp(source, { density: 384 }).resize(size, size).png().toBuffer();
}

const png16 = await renderPng(svgSimple, 16);
const png32 = await renderPng(svgSimple, 32);
const png48 = await renderPng(svgSimple, 48);
const png180 = await renderPng(svg, 180);
const png512 = await renderPng(svg, 512);

writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);
writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(path.join(publicDir, "icon-512.png"), png512);

const icoBuffer = await toIco([png16, png32, png48]);
writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

console.log("Favicons generated:");
console.log(" - public/favicon.ico (16/32/48 multi-res)");
console.log(" - public/favicon-16x16.png");
console.log(" - public/favicon-32x32.png");
console.log(" - public/apple-touch-icon.png (180x180)");
console.log(" - public/icon-512.png");
