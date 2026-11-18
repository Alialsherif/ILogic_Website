import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import { useLocale } from '../i18n/useLocale';
import { useSocialLinks } from './useSocialLinks';
import heroAssets from '../data/heroAssets.json';
import { buildHomeMetadata, renderSeoHead, PRODUCTION_URL } from '../seo/homeSeo';
import { buildPartnersMetadata } from '../seo/partnersSeo';
import { buildAboutMetadata } from '../seo/aboutSeo';
import { buildServicesMetadata } from '../seo/servicesSeo';
import { buildProjectsMetadata } from '../seo/projectsSeo';
import { buildContactMetadata } from '../seo/contactSeo';

export default function HomeSeo() {
  const { language, t } = useLocale();
  const { pathname } = useLocation();
  const socialLinks = useSocialLinks();
  useLayoutEffect(() => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    const options = { socialLinks, heroImage: heroAssets.og.available ? heroAssets.og.src : '' };
    const metadata = normalizedPath==='/contact' ? buildContactMetadata(language,options) : ['/projects','/projectPage'].includes(normalizedPath) ? buildProjectsMetadata(language, options) : ['/services','/servicePage'].includes(normalizedPath) ? buildServicesMetadata(language, options) : normalizedPath === '/about' ? buildAboutMetadata(language, options) : normalizedPath === '/partners' ? buildPartnersMetadata(language, { socialLinks }) : buildHomeMetadata(language, options);
    if (!['/', '/partners', '/about', '/services', '/servicePage', '/projects', '/projectPage', '/contact'].includes(normalizedPath)) {
      const titles = { '/about':'About Us', '/servicePage':'Service', '/projectPage':'Project', '/blogPage':'Blog', '/contact':'Contact', '/partners':'home.nav.partners' };
      metadata.title = `${t(titles[pathname] || 'ILogic')} | ILogic`;
      metadata.canonical = new URL(pathname + (language === 'en' ? '?lang=en' : ''), PRODUCTION_URL).href;
      metadata.alternateBase = new URL(normalizedPath, PRODUCTION_URL).href;
      metadata.schema['@graph'] = metadata.schema['@graph'].filter(item => item['@type'] !== 'FAQPage');
    }
    document.head.querySelectorAll('[data-ilogic-head]').forEach(node => node.remove());
    const template = document.createElement('template');
    template.innerHTML = renderSeoHead(metadata);
    document.head.append(template.content);
  }, [language, pathname, socialLinks, t]);
  return null;
}
