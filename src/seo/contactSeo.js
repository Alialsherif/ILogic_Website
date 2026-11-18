import ar from '../i18n/contact.ar.json' with { type: 'json' };
import en from '../i18n/contact.en.json' with { type: 'json' };
import { buildHomeMetadata, PRODUCTION_URL } from './homeSeo.js';

export function buildContactMetadata(language='ar', options={}) {
  const metadata=buildHomeMetadata(language,options),copy=language==='en'?en:ar;
  metadata.title=copy['contact.meta.title'];metadata.description=copy['contact.meta.description'];
  metadata.alternateBase=PRODUCTION_URL+'contact';metadata.canonical=metadata.alternateBase+(language==='en'?'?lang=en':'');
  const organization=metadata.schema['@graph'][0],siteId=`${PRODUCTION_URL}#website`,breadcrumbId=`${metadata.canonical}#breadcrumb`;
  organization.address={'@type':'PostalAddress',streetAddress:copy['contact.address.street'],addressLocality:language==='en'?'6th of October City':'مدينة 6 أكتوبر',addressRegion:language==='en'?'Giza':'الجيزة',addressCountry:'EG'};
  metadata.schema['@graph']=[organization,
    {'@type':'WebSite','@id':siteId,url:PRODUCTION_URL,name:'ILogic',publisher:{'@id':organization['@id']}},
    {'@type':'ContactPage','@id':`${metadata.canonical}#webpage`,url:metadata.canonical,name:metadata.title,description:metadata.description,inLanguage:language,isPartOf:{'@id':siteId},mainEntity:{'@id':organization['@id']},breadcrumb:{'@id':breadcrumbId}},
    {'@type':'BreadcrumbList','@id':breadcrumbId,itemListElement:[{'@type':'ListItem',position:1,name:copy['contact.home'],item:PRODUCTION_URL+(language==='en'?'?lang=en':'')},{'@type':'ListItem',position:2,name:copy['contact.title'],item:metadata.canonical}]}];
  return metadata;
}
