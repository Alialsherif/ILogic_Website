import ar from '../i18n/services.ar.json' with { type: 'json' };
import en from '../i18n/services.en.json' with { type: 'json' };
import { buildHomeMetadata, PRODUCTION_URL } from './homeSeo.js';

export function buildServicesMetadata(language = 'ar', options = {}) {
  const metadata = buildHomeMetadata(language, options);
  const copy = language === 'en' ? en : ar;
  metadata.title = copy['services.meta.title'];
  metadata.description = copy['services.meta.description'];
  metadata.alternateBase = PRODUCTION_URL + 'services';
  metadata.canonical = metadata.alternateBase + (language === 'en' ? '?lang=en' : '');
  const siteId = `${PRODUCTION_URL}#website`;
  const breadcrumbId = `${metadata.canonical}#breadcrumb`;
  metadata.schema['@graph'] = [metadata.schema['@graph'][0],
    { '@type': 'WebSite', '@id': siteId, url: PRODUCTION_URL, name: 'ILogic', publisher: { '@id': `${PRODUCTION_URL}#organization` } },
    { '@type': 'WebPage', '@id': `${metadata.canonical}#webpage`, url: metadata.canonical, name: metadata.title, description: metadata.description, inLanguage: language, isPartOf: { '@id': siteId }, breadcrumb: { '@id': breadcrumbId } },
    { '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy['services.breadcrumb.home'], item: PRODUCTION_URL + (language === 'en' ? '?lang=en' : '') },
      { '@type': 'ListItem', position: 2, name: copy['services.breadcrumb.current'], item: metadata.canonical },
    ] },
  ];
  return metadata;
}
