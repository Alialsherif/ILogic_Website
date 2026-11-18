import ar from '../i18n/about.ar.json' with { type: 'json' };
import en from '../i18n/about.en.json' with { type: 'json' };
import { buildHomeMetadata, PRODUCTION_URL } from './homeSeo.js';

export function buildAboutMetadata(language = 'ar', { socialLinks = [], heroImage = '' } = {}) {
  const metadata = buildHomeMetadata(language, { socialLinks, heroImage });
  const copy = language === 'en' ? en : ar;
  metadata.title = copy['about.seo.title'];
  metadata.description = copy['about.seo.description'];
  metadata.alternateBase = PRODUCTION_URL + 'about';
  metadata.canonical = metadata.alternateBase + (language === 'en' ? '?lang=en' : '');
  metadata.locale = language === 'en' ? 'en_US' : 'ar_AR';
  metadata.alternateLocale = language === 'en' ? 'ar_AR' : 'en_US';
  const siteId = `${PRODUCTION_URL}#website`;
  const breadcrumbId = `${metadata.canonical}#breadcrumb`;
  metadata.schema['@graph'] = [metadata.schema['@graph'][0],
    { '@type': 'WebSite', '@id': siteId, url: PRODUCTION_URL, name: 'ILogic', publisher: { '@id': `${PRODUCTION_URL}#organization` } },
    { '@type': 'AboutPage', '@id': `${metadata.canonical}#webpage`, url: metadata.canonical, name: metadata.title, description: metadata.description, inLanguage: language, isPartOf: { '@id': siteId }, mainEntity: { '@id': `${PRODUCTION_URL}#organization` }, breadcrumb: { '@id': breadcrumbId } },
    { '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy['about.breadcrumb.home'], item: PRODUCTION_URL + (language === 'en' ? '?lang=en' : '') },
      { '@type': 'ListItem', position: 2, name: copy['about.breadcrumb.current'], item: metadata.canonical },
    ] },
  ];
  return metadata;
}
