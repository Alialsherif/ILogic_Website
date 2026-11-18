import ar from '../i18n/partners.ar.json' with { type: 'json' };
import en from '../i18n/partners.en.json' with { type: 'json' };
import { partnerFaq } from '../data/partnersContent.js';
import { buildHomeMetadata, PRODUCTION_URL } from './homeSeo.js';

export function buildPartnersMetadata(language = 'ar', { socialLinks = [] } = {}) {
  const metadata = buildHomeMetadata(language, { socialLinks });
  const copy = language === 'en' ? en : ar;
  metadata.title = copy['partner.seo.title'];
  metadata.description = copy['partner.seo.description'];
  metadata.alternateBase = PRODUCTION_URL + 'partners';
  metadata.canonical = metadata.alternateBase + (language === 'en' ? '?lang=en' : '');
  metadata.locale = language === 'en' ? 'en_US' : 'ar_AR';
  metadata.alternateLocale = language === 'en' ? 'ar_AR' : 'en_US';
  metadata.image = PRODUCTION_URL + 'images/identity-v2/og-partners.webp';
  metadata.imageWidth = 1200;
  metadata.imageHeight = 630;
  metadata.imageAlt = ar['partner.hero.eyebrow'];
  metadata.schema['@graph'][1] = {
    '@type': 'FAQPage', '@id': `${metadata.canonical}#faq`, inLanguage: language,
    mainEntity: partnerFaq.map(key => ({ '@type': 'Question', name: copy[`partner.faq.${key}.question`], acceptedAnswer: { '@type': 'Answer', text: copy[`partner.faq.${key}.answer`] } })),
  };
  const siteId = `${PRODUCTION_URL}#website`;
  const pageId = `${metadata.canonical}#webpage`;
  const breadcrumbId = `${metadata.canonical}#breadcrumb`;
  metadata.schema['@graph'].push(
    { '@type':'WebSite', '@id':siteId, url:PRODUCTION_URL, name:'ILogic', publisher:{ '@id':`${PRODUCTION_URL}#organization` } },
    { '@type':'WebPage', '@id':pageId, url:metadata.canonical, name:metadata.title, description:metadata.description, inLanguage:language, isPartOf:{ '@id':siteId }, about:language === 'ar' ? 'برنامج الشركاء' : 'Partners program', breadcrumb:{ '@id':breadcrumbId } },
    { '@type':'BreadcrumbList', '@id':breadcrumbId, itemListElement:[
      { '@type':'ListItem', position:1, name:copy['partner.breadcrumb.home'], item:PRODUCTION_URL + (language === 'en' ? '?lang=en' : '') },
      { '@type':'ListItem', position:2, name:copy['partner.breadcrumb.current'], item:metadata.canonical },
    ] },
  );
  return metadata;
}
