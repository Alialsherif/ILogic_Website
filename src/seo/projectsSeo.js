import ar from '../i18n/projects.ar.json' with { type: 'json' };
import en from '../i18n/projects.en.json' with { type: 'json' };
import { buildHomeMetadata, PRODUCTION_URL } from './homeSeo.js';

export function buildProjectsMetadata(language = 'ar', options = {}) {
  const metadata = buildHomeMetadata(language, options), copy = language === 'en' ? en : ar;
  metadata.title = copy['projects.meta.title'];
  metadata.description = copy['projects.meta.description'];
  metadata.alternateBase = PRODUCTION_URL + 'projects';
  metadata.canonical = metadata.alternateBase + (language === 'en' ? '?lang=en' : '');
  const siteId = `${PRODUCTION_URL}#website`, breadcrumbId = `${metadata.canonical}#breadcrumb`;
  metadata.schema['@graph'] = [metadata.schema['@graph'][0],
    { '@type': 'WebSite', '@id': siteId, url: PRODUCTION_URL, name: 'ILogic', publisher: { '@id': `${PRODUCTION_URL}#organization` } },
    { '@type': 'CollectionPage', '@id': `${metadata.canonical}#webpage`, url: metadata.canonical, name: metadata.title, description: metadata.description, inLanguage: language, isPartOf: { '@id': siteId }, breadcrumb: { '@id': breadcrumbId } },
    { '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy['projects.home'], item: PRODUCTION_URL + (language === 'en' ? '?lang=en' : '') },
      { '@type': 'ListItem', position: 2, name: copy['projects.title'], item: metadata.canonical },
    ] },
  ];
  return metadata;
}
