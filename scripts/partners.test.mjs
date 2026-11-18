import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ar from '../src/i18n/partners.ar.json' with { type: 'json' };
import en from '../src/i18n/partners.en.json' with { type: 'json' };
import { translate } from '../src/i18n/locale.js';
import { partnerFaq } from '../src/data/partnersContent.js';
import { buildPartnersMetadata } from '../src/seo/partnersSeo.js';
import { renderSeoHead } from '../src/seo/homeSeo.js';

test('partners copy is complete in both languages, without invented numeric terms', () => {
  assert.deepEqual(Object.keys(ar).sort(), Object.keys(en).sort());
  for (const key of Object.keys(ar)) for (const language of ['ar','en']) {
    const copy = language === 'ar' ? ar : en;
    assert.equal(translate(key,language), copy[key]);
    assert(copy[key].trim());
    assert.doesNotMatch(copy[key], /\d|[%٪]/);
  }
});
test('partners metadata matches the five visible FAQs and has route-specific alternates', () => {
  assert.equal(partnerFaq.length, 5);
  for (const language of ['ar','en']) {
    const copy = language === 'ar' ? ar : en;
    const metadata = buildPartnersMetadata(language);
    assert(metadata.title.length<=60);assert(metadata.description.length<=160);
    assert.match(metadata.canonical, /\/partners(?:\?lang=en)?$/);
    const head = renderSeoHead(metadata);
    assert.match(head, /hreflang="ar" href="https:\/\/ai-logika.web.app\/partners"/);
    metadata.schema['@graph'][1].mainEntity.forEach((question,index) => {
      assert.equal(question.name, copy[`partner.faq.${partnerFaq[index]}.question`]);
      assert.equal(question.acceptedAnswer.text, copy[`partner.faq.${partnerFaq[index]}.answer`]);
    });
    const graph=metadata.schema['@graph'];
    const page=graph.find(item=>item['@type']==='WebPage');
    const site=graph.find(item=>item['@type']==='WebSite');
    const breadcrumbs=graph.find(item=>item['@type']==='BreadcrumbList');
    assert.equal(page.isPartOf['@id'],site['@id']);
    assert.equal(breadcrumbs.itemListElement.length,2);
    assert.equal(breadcrumbs.itemListElement[1].item,metadata.canonical);
    assert.equal(metadata.imageWidth,1200);assert.equal(metadata.imageHeight,630);
    assert.match(head,/og:locale:alternate/);assert.match(head,/og-partners.webp/);
    assert.doesNotMatch(JSON.stringify(graph),/"(?:Offer|Review|AggregateRating)"|"(?:price|priceCurrency|ratingValue)"/);
  }
});
test('form UI is mounted without adding a network client and unresolved owner policies remain comments', () => {
  const source = fs.readFileSync('src/pages/PartnersPage.jsx','utf8');
  assert.match(source, /<PartnerApplicationForm\s*\/>/);
  assert.match(source, /<!-- TODO\(owner\): ownership\/IP, review duration, confidentiality terms -->/);
  assert.doesNotMatch(source, /<form\b|fetch\(|localStorage|onSubmit|alert\(/);
  const form=fs.readFileSync('src/components/partners/PartnerApplicationForm.jsx','utf8');
  assert.doesNotMatch(form,/fetch\(|localStorage|firebase|XMLHttpRequest|https:\/\//);
  assert.match(form,/<!-- TODO\(owner\): privacy policy page -->/);
});
