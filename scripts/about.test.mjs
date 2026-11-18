import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ar from '../src/i18n/about.ar.json' with { type: 'json' };
import en from '../src/i18n/about.en.json' with { type: 'json' };
import { translate } from '../src/i18n/locale.js';
import { buildAboutMetadata } from '../src/seo/aboutSeo.js';
import { renderSeoHead, PRODUCTION_URL } from '../src/seo/homeSeo.js';

test('about copy is complete in both languages and adds no invented metrics or launch date', () => {
  assert.deepEqual(Object.keys(ar).sort(), Object.keys(en).sort());
  for (const [language, copy] of [['ar', ar], ['en', en]]) for (const [key, value] of Object.entries(copy)) {
    assert(value.trim(), key);
    assert.equal(translate(key, language), value, key);
    assert.doesNotMatch(value, /[\d%٪]/, key);
  }
});

test('about metadata describes this page, with AboutPage schema and no inherited FAQ', () => {
  for (const language of ['ar', 'en']) {
    const copy = language === 'ar' ? ar : en;
    const metadata = buildAboutMetadata(language);
    assert.equal(metadata.title, copy['about.seo.title']);
    assert.equal(metadata.description, copy['about.seo.description']);
    assert(metadata.title.length <= 60 && metadata.description.length <= 160);
    assert.equal(metadata.canonical, `${PRODUCTION_URL}about${language === 'en' ? '?lang=en' : ''}`);
    const graph = metadata.schema['@graph'];
    assert(graph.some(item => item['@type'] === 'AboutPage'));
    assert(!graph.some(item => ['FAQPage', 'Review', 'AggregateRating', 'Offer'].includes(item['@type'])));
    const page = graph.find(item => item['@type'] === 'AboutPage');
    const org = graph.find(item => item['@type'] === 'Organization');
    assert.equal(page.mainEntity['@id'], org['@id']);
    const head = renderSeoHead(metadata);
    assert.match(head, /hreflang="en" href="https:\/\/ai-logika.web.app\/about\?lang=en"/);
    assert.match(head, /hreflang="x-default" href="https:\/\/ai-logika.web.app\/about"/);
    assert.doesNotMatch(head, /FAQPage/);
  }
});

test('about renders the real story, development status and existing contact links without template content', async () => {
  const { createServer } = await import('vite');
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  try {
    const { renderAbout } = await server.ssrLoadModule('/src/entry-server.jsx');
    const social = JSON.parse(fs.readFileSync('public/social-links.json', 'utf8'));
    for (const language of ['ar', 'en']) {
      const copy = language === 'ar' ? ar : en;
      const html = renderAbout(language, social);
      const page = html.match(/<div class="ilogic-home ilogic-about">[\s\S]*<\/main>/)?.[0];
      assert(page);
      const text = page.replace(/<[^>]*>/g, '');
      assert.doesNotMatch(text, /\babout\.[a-zA-Z]|ALEX ANFANTINO|HEISHEL|5\.9k|24K/);
      assert.equal((page.match(/<h1(?:\s|>)/g) || []).length, 1);
      assert.equal((page.match(/<section\b/g) || []).length, 7);
      assert.equal((page.match(/<h2(?:\s|>)/g) || []).length, 6);
      for (const key of ['about.story.russia.text', 'about.story.russia.note', 'about.story.region.text', 'about.product.status', 'about.product.interest', 'about.innovators.program', 'about.principles.closing']) {
        const escaped = copy[key].replaceAll('&', '&amp;').replaceAll("'", '&#x27;').replaceAll('"', '&quot;');
        assert(page.includes(escaped), key);
      }
      assert(page.includes(`/partners?lang=${language}`));
      assert(page.includes(`/contact?lang=${language}#contact-form`));
      assert(page.includes(`/services?lang=${language}`));
      const whatsapp = social.whatsapp;
      if (whatsapp) assert(page.includes(whatsapp));
    }
  } finally { await server.close(); }
});
