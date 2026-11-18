import fs from 'node:fs';
import path from 'node:path';

const supplied = {
  hero: { file: 'hero-mockup-collage.webp', width: 1400, height: 1000 },
  fopac: { file: 'fopac-website-mockup.webp', width: 1600, height: 1000 },
  zavodsz: { file: 'zavodsz-website-mockup.webp', width: 1600, height: 1000 },
  gostinec: { file: 'gostinec-website-mockup.webp', width: 1600, height: 1000 },
  alsherif: { file: 'alsherif-website-mockup.webp', width: 1600, height: 1000 },
  laptopFrame: { file: 'laptopFrame.webp', src: '/images/identity-v2/laptopFrame.webp', width: 1536, height: 1024 },
  loyalty: { file: 'loyalty-laptop-system.webp', src: '/images/identity-v2/loyalty-laptop-system.webp', width: 1536, height: 1024 },
  behavior: { file: 'behavior.webp', src: '/images/identity-v2/behavior.webp', width: 1600, height: 1067 },
  partners: { file: 'partners.webp', src: '/images/identity-v2/partners.webp', width: 1600, height: 1067 },
};
const directory = 'public/images/home';
fs.mkdirSync(directory, { recursive: true });
const assets = {};
for (const [key, asset] of Object.entries(supplied)) {
  const src = asset.src || `/images/home/${asset.file}`;
  const file = 'public' + src;
  const available = fs.existsSync(file);
  if (available) {
    const bytes = fs.readFileSync(file);
    if (bytes.length > 150_000) throw new Error(`${asset.file} must be at most 150 KB.`);
    if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`${asset.file} must be a real WebP image.`);
  }
  assets[key] = { ...asset, available, src };
}
const output = JSON.stringify(assets, null, 2) + '\n';
const destination = 'src/data/homeAssets.json';
if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== output) fs.writeFileSync(destination, output);
console.log(`Homepage assets: ${Object.values(supplied).filter(asset => fs.existsSync('public' + (asset.src || `/images/home/${asset.file}`))).length}/${Object.keys(supplied).length} supplied images present.`);

const heroAssets = {};
for (const [key, file, width, height, limit] of [
  ['background','identity-v2/hero.webp',1600,1000,140000],
  ['fopac','home/hero/fopac-screenshot.webp',1600,1000,150000],
  ['zavodsz','home/hero/zavodsz-screenshot.webp',1600,1000,150000],
  ['og','identity-v2/og-home.webp',1200,630,200000],
]) {
  const available = fs.existsSync(path.join('public/images',file));
  if (available) {
    const bytes = fs.readFileSync(path.join('public/images',file));
    if (bytes.length > limit || bytes.toString('ascii',8,12) !== 'WEBP') throw new Error('Invalid hero asset: '+file);
  }
  heroAssets[key] = {src:`/images/${file}`,available,width,height};
}
fs.writeFileSync('src/data/heroAssets.json',JSON.stringify(heroAssets,null,2)+'\n');
