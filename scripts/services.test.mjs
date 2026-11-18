import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import ar from '../src/i18n/services.ar.json' with { type: 'json' };
import en from '../src/i18n/services.en.json' with { type: 'json' };
import { translate } from '../src/i18n/locale.js';
import { buildServicesMetadata } from '../src/seo/servicesSeo.js';
import { serviceCatalog } from '../src/data/servicesContent.js';

test('services copy is complete and unique in both languages, with bounded metadata', () => {
  assert.deepEqual(Object.keys(ar).sort(),Object.keys(en).sort());
  for(const [language,copy] of [['ar',ar],['en',en]]) {
    const raw=fs.readFileSync(`src/i18n/services.${language}.json`,'utf8');
    const keys=[...raw.matchAll(/"([^"\n]+)"\s*:/g)].map(match=>match[1]);
    assert.equal(new Set(keys).size,keys.length);
    for(const [key,value] of Object.entries(copy)) { assert(value.trim(),key);assert.equal(translate(key,language),value); }
    const meta=buildServicesMetadata(language);
    assert(meta.title.length<=60);assert(meta.description.length<=160);
    assert(meta.canonical.endsWith('/services'+(language==='en'?'?lang=en':'')));
    assert(meta.schema['@graph'].some(item=>item['@type']==='WebPage'));
    assert(!meta.schema['@graph'].some(item=>['FAQPage','Offer','AggregateRating','Review'].includes(item['@type'])));
  }
});

test('services render every overview section, all sectors and real project states without a form or detail template', async () => {
  const server=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'});
  try {
    const { renderServices }=await server.ssrLoadModule('/src/entry-server.jsx');
    const social=JSON.parse(fs.readFileSync('public/social-links.json','utf8'));
    for(const language of ['ar','en']) {
      const html=renderServices(language,social),copy=language==='ar'?ar:en;
      assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
      for(const id of ['services-catalog','services-sectors','services-projects','services-security']) assert(html.includes(`id="${id}"`));
      const escaped=value=>value.replaceAll('&','&amp;').replaceAll("'",'&#x27;').replaceAll('"','&quot;');
      for(const service of serviceCatalog) { assert(html.includes(`id="service-${service.key}"`));assert(html.includes(escaped(copy[`services.${service.key}.title`]))); }
      assert.equal((html.match(/<details\b/g)||[]).length,12);
      assert(html.includes(copy['services.projects.developing']));assert(html.includes(copy['services.projects.planned']));
      assert(html.includes('logic-scene-core')&&html.includes(copy['services.scene.result']));
      const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
      assert(main);
      assert.doesNotMatch(main, /<form\b|service-details-wrapper|\/serviceDetails\?|\bservices\.[a-zA-Z]/);
      assert(html.includes('/images/identity-v2/service-security.webp'));
      for(const asset of ['service-security.webp','service-automation.webp']) assert(fs.existsSync('public/images/identity-v2/'+asset));
    }
  } finally { await server.close(); }
});
