import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import { buildHomeMetadata, renderSeoHead } from '../src/seo/homeSeo.js';
import { resolveSocialLinks } from '../src/data/socialLinks.js';
import { buildPartnersMetadata } from '../src/seo/partnersSeo.js';
import { buildAboutMetadata } from '../src/seo/aboutSeo.js';
import { buildServicesMetadata } from '../src/seo/servicesSeo.js';
import { buildProjectsMetadata } from '../src/seo/projectsSeo.js';
import { buildContactMetadata } from '../src/seo/contactSeo.js';
import { sectors } from '../src/data/homeSectors.js';

const assets = JSON.parse(fs.readFileSync('src/data/heroAssets.json', 'utf8'));
const socialConfig = JSON.parse(fs.readFileSync('public/social-links.json', 'utf8'));
const metadata = buildHomeMetadata('ar', { heroImage: assets.og.available ? assets.og.src : '', socialLinks: resolveSocialLinks(socialConfig) });
const manifest = JSON.parse(fs.readFileSync('dist/.vite/manifest.json', 'utf8'));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { renderHome, renderPartners, renderAbout, renderServices, renderProjects, renderContact } = await server.ssrLoadModule('/src/entry-server.jsx');
  const template = fs.readFileSync('dist/index.html', 'utf8');
  for (const page of [
    { render: renderHome, metadata, destination:'dist/index.html', heading:'home-title' },
    { render: renderPartners, metadata:buildPartnersMetadata('ar', { socialLinks:resolveSocialLinks(socialConfig) }), destination:'dist/partners/index.html', heading:'partner-title' },
    { render: renderAbout, metadata:buildAboutMetadata('ar', { socialLinks:resolveSocialLinks(socialConfig), heroImage:assets.og.available ? assets.og.src : '' }), destination:'dist/about/index.html', heading:'about-title' },
    { render: renderServices, metadata:buildServicesMetadata('ar', { socialLinks:resolveSocialLinks(socialConfig), heroImage:assets.og.available ? assets.og.src : '' }), destination:'dist/services/index.html', heading:'services-title' },
    { render: renderProjects, metadata:buildProjectsMetadata('ar', { socialLinks:resolveSocialLinks(socialConfig), heroImage:assets.og.available ? assets.og.src : '' }), destination:'dist/projects/index.html', heading:'projects-title' },
    { render: renderContact, metadata:buildContactMetadata('ar', { socialLinks:resolveSocialLinks(socialConfig), heroImage:assets.og.available ? assets.og.src : '' }), destination:'dist/contact/index.html', heading:'contact-title' },
  ]) {
  let body = page.render('ar', socialConfig);
  if (page.heading === 'home-title') {
    const copy = JSON.parse(fs.readFileSync('src/i18n/homepage.ar.json', 'utf8'));
    const section = body.match(/<section\b[^>]*id="audience"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';
    for (const { slug } of sectors) for (const field of ['name', 'search', 'decision', 'preparation']) {
      if (!section.includes(copy[`home.sectors.${slug}.${field}`])) throw new Error(`Sector prerender missing: ${slug}.${field}`);
    }
    if ((section.match(/<h2(?:\s|>)/g) || []).length !== 1 || (section.match(/<h3(?:\s|>)/g) || []).length !== 12) throw new Error('Sector section must prerender one H2 and twelve H3s.');
  }
  body = body.replace(/\/src\/assets\/[^\s"'()<>]+/g, url => {
    const source = url.slice(1);
    const file = source.split('?')[0];
    const bundled = manifest[source] || manifest[file];
    if (bundled?.file) return '/' + bundled.file;
    if (/\.(svg|webp)$/.test(file) && fs.existsSync(file)) return `data:image/${file.endsWith('.svg') ? 'svg+xml' : 'webp'};base64,${fs.readFileSync(file).toString('base64')}`;
    throw new Error('Unresolved prerender asset: ' + file);
  });
  let html = template;
  if (page.heading !== 'home-title') html = html.replace(/\s*<link rel="preload" as="image" href="\/images\/home\/hero\/hero-background-loop-poster.webp" fetchpriority="high"\s*\/>/g, '');
  html = html.replace(/<!-- ilogic:seo:start -->[\s\S]*?<!-- ilogic:seo:end -->/, `<!-- ilogic:seo:start -->\n${renderSeoHead(page.metadata)}\n<!-- ilogic:seo:end -->`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (page.heading === 'home-title') {
    const styles = new Set();
    const collectStyles = key => { const entry = manifest[key]; if (!entry) return; (entry.css || []).forEach(file => styles.add(file)); (entry.imports || []).forEach(collectStyles); };
    collectStyles('src/components/LegacyContent.jsx');
    html = html.replace('</head>', [...styles].filter(file => !html.includes(`href="/${file}"`)).map(file => `<link rel="stylesheet" href="/${file}" />`).join('\n') + '\n</head>');
  }
  if (!html.includes(page.heading) || (html.match(/<h1(?:\s|>)/g) || []).length !== 1) throw new Error('Prerender must contain the complete page and exactly one H1.');
  fs.mkdirSync(path.dirname(page.destination), { recursive:true });
  fs.writeFileSync(path.resolve(page.destination), html);
  if (page.heading === 'services-title') {
    fs.mkdirSync('dist/servicePage', { recursive:true });
    fs.writeFileSync('dist/servicePage/index.html', html);
  }
  if (page.heading === 'projects-title') {
    fs.mkdirSync('dist/projectPage', { recursive:true });
    fs.writeFileSync('dist/projectPage/index.html', html);
  }
  }
  console.log('Prerendered Arabic home, partners, about, services, projects and contact pages with localized metadata and structured data.');
} finally { await server.close(); }
