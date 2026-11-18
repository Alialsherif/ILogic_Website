import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ar from '../src/i18n/homepage.ar.json' with { type: 'json' };
import en from '../src/i18n/homepage.en.json' with { type: 'json' };
import { translate } from '../src/i18n/locale.js';
import { faqKeys, labChoices, projects, showBehaviorCard, validateLabInterest } from '../src/data/homeContent.js';
import { buildHomeMetadata, officialSocialProfiles, renderSeoHead, PRODUCTION_URL } from '../src/seo/homeSeo.js';
import { sectors, sectorInterval, sectorPagesEnabled, nextSector, sectorContact } from '../src/data/homeSectors.js';

test('homepage has complete matching Arabic and English through the existing translator', () => {
  assert.deepEqual(Object.keys(ar).sort(), Object.keys(en).sort());
  for (const key of Object.keys(ar)) {
    assert(ar[key].trim() && en[key].trim(), key);
    assert.equal(translate(key, 'ar'), ar[key]);
    assert.equal(translate(key, 'en'), en[key]);
  }
  assert.doesNotMatch(JSON.stringify({ ar, en }), /FLOWMATE|ALEX ANFANTINO|24K|5\.9k|1\.7k|camera|computer vision|كاميرا|الرؤية الحاسوبية/i);
  assert.equal(projects.some(project => project.key === 'behavior'), showBehaviorCard);
});

test('metadata is localized, bounded and uses only supplied company facts and actual profiles', () => {
  for (const language of ['ar', 'en']) {
    const metadata = buildHomeMetadata(language);
    assert(metadata.title.length <= 60);
    assert(metadata.description.length <= 160);
    assert.equal(metadata.canonical, PRODUCTION_URL + (language === 'en' ? '?lang=en' : ''));
    const organization = metadata.schema['@graph'][0];
    assert.equal(organization.foundingDate, '2023');
    for (const field of ['address', 'telephone', 'sameAs', 'award', 'aggregateRating']) assert.equal(organization[field], undefined);
    const faq = metadata.schema['@graph'][1];
    assert.equal(faq.mainEntity.length, faqKeys.length);
    faqKeys.forEach((key, index) => assert.equal(faq.mainEntity[index].acceptedAnswer.text, (language === 'ar' ? ar : en)[`home.faq.${key}.answer`]));
    const head = renderSeoHead(metadata);
    assert.match(head, /application\/ld\+json/);
    assert.match(head, /hreflang="ar"/);
    assert.match(head, /hreflang="en"/);
    assert.doesNotMatch(head, /og:image/);
  }
  assert.deepEqual(officialSocialProfiles([{ id: 'facebook', url: 'https://facebook.com' }, { id: 'whatsapp', url: 'https://wa.me/20103617857' }]), []);
  assert.deepEqual(officialSocialProfiles([{ id: 'linkedin', url: 'https://www.linkedin.com/company/real-supplied-profile/' }]), ['https://www.linkedin.com/company/real-supplied-profile/']);
  assert.equal(buildHomeMetadata('ar', { heroImage: '/images/home/hero-mockup-collage.webp' }).image, PRODUCTION_URL + 'images/home/hero-mockup-collage.webp');
});

test('interest form validates its actual choices, email and honeypot without claiming enrollment', () => {
  for (const choice of labChoices) assert.deepEqual(validateLabInterest({ choice, email: 'person@example.com' }), { choice: '', email: '' });
  assert.equal(validateLabInterest({ choice: 'invented', email: 'wrong' }).choice, 'home.lab.choiceError');
  assert.equal(validateLabInterest({ choice: 'erp', email: 'wrong' }).email, 'home.lab.emailError');
  assert.deepEqual(validateLabInterest({ choice: 'erp', email: 'person@example.com', website: 'bot-filled' }), { blocked: true });
  assert.doesNotMatch(fs.readFileSync('src/components/home/Homepage.jsx', 'utf8'), /fetch\(|localStorage|alert\(|console\.log|تم تسجيلك|successfully/);
});

test('supplied image manifest never points a rendered image at a missing file', () => {
  const assets = JSON.parse(fs.readFileSync('src/data/homeAssets.json', 'utf8'));
  for (const asset of Object.values(assets)) {
    assert(asset.width > 0 && asset.height > 0);
    assert.equal(asset.available, fs.existsSync('public' + asset.src));
    if (asset.available && asset.file.endsWith('.webp')) assert(fs.statSync('public' + asset.src).size <= 150_000);
  }
});

test('sectors preserve all twelve localized entries, reserved routes and only the two supplied proofs', () => {
  assert.equal(sectorPagesEnabled, false);
  assert.equal(sectorInterval, 7000);
  assert.equal(sectors.length, 12);
  assert.equal(new Set(sectors.map(item => item.slug)).size, 12);
  assert.deepEqual(sectors.filter(item => item.proof).map(item => item.slug), ['restaurants', 'industrial']);
  for (const copy of [ar, en]) {
    assert(!Object.keys(copy).some(key => key.startsWith('home.audience.')));
    const common = ['eyebrow', 'title', 'highlight', 'text', 'other', 'chat', 'carousel', 'choose', 'previous', 'next', 'pause', 'play', 'of', 'reduced', 'illustration', 'searchLabel', 'decisionLabel', 'preparationLabel', 'adLabel', 'organicLabel', 'websiteResult', 'yourWebsite'];
    const expected = common.map(key => 'home.sectors.' + key);
    for (const { slug, proof } of sectors) {
      for (const field of ['name', 'search', 'decision', 'preparation', 'tag0', 'tag1', 'tag2', 'mockupHeadline', 'mockupCta']) {
        assert(copy[`home.sectors.${slug}.${field}`]?.trim(), slug + '.' + field);
        expected.push(`home.sectors.${slug}.${field}`);
      }
      for (const removed of ['description', 'alt', 'problem', 'solution']) assert.equal(copy[`home.sectors.${slug}.${removed}`], undefined);
      assert.equal(!!copy[`home.sectors.${slug}.proof`], !!proof);
      if (proof) expected.push(`home.sectors.${slug}.proof`);
    }
    assert.deepEqual(Object.keys(copy).filter(key => key.startsWith('home.sectors.')).sort(), expected.sort(), 'No unused sector translation keys');
  }
});

test('the whole homepage and sector scene render in both locales without raw keys; development reports missing keys', async () => {
  const { createServer } = await import('vite');
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  try {
    const { renderHome } = await server.ssrLoadModule('/src/entry-server.jsx');
    const social = JSON.parse(fs.readFileSync('public/social-links.json', 'utf8'));
    for (const language of ['ar', 'en']) {
      const html = renderHome(language, social);
      const text = html.replace(/<[^>]*>/g, '');
      assert.doesNotMatch(text, /\bhome\.[a-zA-Z]/, language + ' homepage has raw translation keys');
      assert.doesNotMatch(text, /الصورة قيد الإضافة|Project image to follow|image being added/i);
      const hero = html.match(/<section\b[^>]*class="[^"]*home-hero\b[\s\S]*?<\/section>/)?.[0] || '';
      const video = JSON.parse(fs.readFileSync('src/data/heroVideo.json','utf8'));
      assert(hero.includes('home-hero-video--background'));
      assert(!hero.includes('home-hero-video__frame'));
      assert.match(hero, /<video\b[^>]*playsInline[^>]*preload="none"/i);
      assert.doesNotMatch(hero, /<video\b[^>]*\scontrols(?:[\s=>])/i);
      assert(!hero.includes('home-hero-video__toggle'));
      assert(hero.includes(video.backgroundDesktop) && hero.includes(video.backgroundPoster));
      assert(hero.includes((language==='ar'?ar:en)['home.heroVideo.label']));
      assert.doesNotMatch(hero,/hero-system__workspace|hero-system__outcome|hero-story__switcher|data-scene=/);
      for (const key of ['desktop','mobile','poster','backgroundDesktop','backgroundMobile','backgroundPoster']) assert(fs.existsSync('public'+video[key]),key+' video asset exists');
      const section = html.match(/<section\b[^>]*id="audience"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';
      assert.equal((section.match(/data-landing-sector=/g) || []).length, 12);
      const copy = language === 'ar' ? ar : en;
      for (const { slug } of sectors) for (const field of ['search', 'decision', 'preparation', 'mockupHeadline', 'mockupCta']) {
        // React escapes apostrophes and ampersands; the textual content remains exact.
        const escaped = copy[`home.sectors.${slug}.${field}`].replaceAll('&', '&amp;').replaceAll("'", '&#x27;').replaceAll('"', '&quot;');
        assert(section.includes(escaped), language + ' ' + slug + '.' + field);
      }
    }
    const locale = await server.ssrLoadModule('/src/i18n/locale.js');
    const previousError = console.error;
    const errors = [];
    try {
      console.error = (...args) => errors.push(args.join(' '));
      locale.translate('home.__missing_key_regression_test__', 'ar');
    } finally { console.error = previousError; }
    assert(errors.some(error => error.includes('[i18n] Missing ar translation: home.__missing_key_regression_test__')));
  } finally { await server.close(); }
});

test('sector backgrounds are valid compact WebPs and decorative; no story overlays remain', () => {
  assert.equal(fs.readdirSync('public/images/home/sectors').length, 12);
  for (const { slug } of sectors) {
    const bytes = fs.readFileSync(`public/images/home/sectors/sector-${slug}.webp`);
    assert(bytes.length <= 110000);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
  const component = fs.readFileSync('src/components/home/HomeSectors.jsx', 'utf8');
  assert.doesNotMatch(component, /story-label|story-divider/);
  assert.match(component, /alt="" width="1000" height="1250" loading="lazy" decoding="async"/);
  const scene = fs.readFileSync('src/components/home/SectorSearchScene.jsx', 'utf8');
  assert.doesNotMatch(scene, /<img\b|https?:|rating|review/i);
  const icons = fs.readFileSync('src/components/home/SectorIcon.jsx', 'utf8');
  for (const { slug } of sectors) assert(icons.includes(slug));
  assert.equal(ar['home.sectors.illustration'], 'تصوّر توضيحي');
  assert.equal(en['home.sectors.illustration'], 'Illustrative mock-up');
});

test('sector navigation loops and WhatsApp keeps the configured number and exact localized message', () => {
  assert.equal(nextSector(11), 0);
  assert.equal(nextSector(0, -1), 11);
  assert.equal(nextSector(5, 12), 5);
  assert.equal(sectorContact('', 'ar', 'test'), undefined);
  const base = 'https://wa.me/20103617857?existing=preserved';
  for (const lang of ['ar', 'en']) for (const sector of sectors) {
    const name = (lang === 'ar' ? ar : en)[`home.sectors.${sector.slug}.name`];
    const url = new URL(sectorContact(base, lang, name));
    assert.equal(url.pathname, '/20103617857');
    assert.equal(url.searchParams.get('existing'), 'preserved');
    assert.equal(url.searchParams.get('text'), lang === 'ar' ? `مرحبًا ILogic، أعمل في مجال ${name} وأرغب في استشارة بخصوص موقع أو نظام.` : `Hello ILogic, I work in ${name} and would like advice on a website or system.`);
  }
});
