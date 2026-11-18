import ar from '../i18n/homepage.ar.json' with { type: 'json' };
import en from '../i18n/homepage.en.json' with { type: 'json' };
import { faqKeys } from '../data/homeContent.js';

export const PRODUCTION_URL = 'https://ai-logika.web.app/';
export const copyFor = language => language === 'en' ? en : ar;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);

export function officialSocialProfiles(links = []) {
  return links.flatMap(link => {
    try {
      const url = new URL(link.url);
      // TODO: Supply genuine company profiles; generic platform homepages are not verified identities.
      if (!['facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok'].includes(link.id) || !url.pathname.replace(/\//g, '').trim()) return [];
      return [url.href];
    } catch { return []; }
  });
}

export function buildHomeMetadata(language = 'ar', { heroImage = '', socialLinks = [] } = {}) {
  const copy = copyFor(language);
  const canonical = PRODUCTION_URL + (language === 'en' ? '?lang=en' : '');
  const profiles = officialSocialProfiles(socialLinks);
  const organization = {
    '@type': 'Organization', '@id': `${PRODUCTION_URL}#organization`,
    name: 'ILogic', url: PRODUCTION_URL, logo: `${PRODUCTION_URL}ilogic-icon-v2.svg`,
    foundingDate: '2023', areaServed: ['Egypt', 'Middle East'],
    ...(profiles.length ? { sameAs: profiles } : {}),
  };
  return {
    title: copy['home.seo.title'], description: copy['home.seo.description'], canonical,
    language, locale: language === 'en' ? 'en_US' : 'ar_EG',
    image: heroImage ? new URL(heroImage, PRODUCTION_URL).href : '',
    schema: { '@context': 'https://schema.org', '@graph': [organization, {
      '@type': 'FAQPage', '@id': `${canonical}#faq`, inLanguage: language,
      mainEntity: faqKeys.map(key => ({
        '@type': 'Question', name: copy[`home.faq.${key}.question`],
        acceptedAnswer: { '@type': 'Answer', text: copy[`home.faq.${key}.answer`] },
      })),
    }] },
  };
}

export function renderSeoHead(metadata) {
  const { title, description, canonical, locale, image, schema } = metadata;
  const alternateBase = metadata.alternateBase || PRODUCTION_URL;
  const tag = (name, value, property = false) => `<meta data-ilogic-head ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(value)}" />`;
  return [
    `<title data-ilogic-head>${escapeHtml(title)}</title>`,
    tag('description', description),
    `<link data-ilogic-head rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<link data-ilogic-head rel="alternate" hreflang="ar" href="${escapeHtml(alternateBase)}" />`,
    `<link data-ilogic-head rel="alternate" hreflang="en" href="${escapeHtml(alternateBase)}?lang=en" />`,
    `<link data-ilogic-head rel="alternate" hreflang="x-default" href="${escapeHtml(alternateBase)}" />`,
    tag('og:type', 'website', true), tag('og:site_name', 'ILogic', true),
    tag('og:title', title, true), tag('og:description', description, true),
    tag('og:url', canonical, true), tag('og:locale', locale, true),
    ...(metadata.alternateLocale ? [tag('og:locale:alternate', metadata.alternateLocale, true)] : []),
    tag('twitter:card', image ? 'summary_large_image' : 'summary'),
    tag('twitter:title', title), tag('twitter:description', description),
    ...(image ? [tag('og:image', image, true), tag('twitter:image', image), ...(metadata.imageWidth ? [tag('og:image:width',metadata.imageWidth,true),tag('og:image:height',metadata.imageHeight,true),tag('og:image:type','image/webp',true),tag('og:image:alt',metadata.imageAlt,true),tag('twitter:image:alt',metadata.imageAlt)] : [])] : []),
    `<script data-ilogic-head type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
}
