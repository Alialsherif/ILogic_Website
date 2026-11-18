import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import LocaleProvider from './i18n/LocaleProvider';
import { SocialLinksContext } from './components/useSocialLinks';
import { resolveSocialLinks } from './data/socialLinks';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import PartnersPage from './pages/PartnersPage';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import ProjectPage from './pages/ProjectPage';
import Contact from './pages/Contact';

function renderPage(language, socialConfig, pathname = '/') {
  const noop = () => {};
  const Page = pathname === '/contact' ? Contact : pathname === '/projects' ? ProjectPage : pathname === '/services' ? ServicePage : pathname === '/about' ? AboutPage : pathname === '/partners' ? PartnersPage : Home;
  const compact = pathname !== '/';
  return renderToString(<MemoryRouter initialEntries={[`${pathname}?lang=${language}`]}><LocaleProvider><SocialLinksContext.Provider value={resolveSocialLinks(socialConfig)}>
    <Header toggleMenu={noop} toggleSearch={noop} isMenuOpen={false} />
    <MobileMenu isOpen={false} toggleMenu={noop} />
    <main><Page /></main>
    <Footer showCallout={false} compact={compact} />
    <FloatingWhatsApp />
  </SocialLinksContext.Provider></LocaleProvider></MemoryRouter>);
}
export const renderHome = (language, socialConfig) => renderPage(language, socialConfig);
export const renderPartners = (language, socialConfig) => renderPage(language, socialConfig, '/partners');
export const renderAbout = (language, socialConfig) => renderPage(language, socialConfig, '/about');
export const renderServices = (language, socialConfig) => renderPage(language, socialConfig, '/services');
export const renderProjects = (language, socialConfig) => renderPage(language, socialConfig, '/projects');
export const renderContact = (language, socialConfig) => renderPage(language, socialConfig, '/contact');
