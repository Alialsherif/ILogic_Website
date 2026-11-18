
import Header from './Header'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocale } from '../i18n/useLocale'
import SearchBar from './SearchBar'
import SocialLinksProvider from './SocialLinksProvider'
import FloatingWhatsApp from './FloatingWhatsApp'
import HomeSeo from './HomeSeo'
import ScrollMotion from './ScrollMotion'
const LegacyContent = lazy(() => import('./LegacyContent'));

const HomeOneLayout = ({ initialLegacyContent }) => {
    const { pathname } = useLocation();
    const { t } = useLocale();
    const isPartners = pathname.replace(/\/+$/, '') === '/partners';
    const isAbout = pathname.replace(/\/+$/, '') === '/about';
    const isServices = ['/services','/servicePage'].includes(pathname.replace(/\/+$/, ''));
    const isProjects = ['/projects','/projectPage'].includes(pathname.replace(/\/+$/, ''));
    const isContact = pathname.replace(/\/+$/, '') === '/contact';
    const LegacyRoute = initialLegacyContent || LegacyContent;


   
  
    const [IsSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    if (!isMenuOpen && !IsSearchOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen, IsSearchOpen]);

  return (
    <SocialLinksProvider>
    <HomeSeo />
    <Header toggleMenu={toggleMenu} toggleSearch={toggleSearch} isMenuOpen={isMenuOpen}/>
    <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu}  />
    <SearchBar IsSearchOpen={IsSearchOpen} toggleSearch={toggleSearch} />
    <main data-client-rendered="true">
        <Suspense fallback={<div className="route-loading" role="status">{t('home.loading')}</div>}>{isPartners || isAbout || isServices || isProjects || isContact ? <Outlet/> : <LegacyRoute><Outlet/></LegacyRoute>}<ScrollMotion /></Suspense>
    </main>
    <Footer compact={isPartners || isAbout || isServices || isProjects || isContact} showCallout={!['/', '/partners', '/about', '/services', '/servicePage', '/projects', '/projectPage', '/contact'].includes(pathname.replace(/\/$/, '') || '/')} />
    <FloatingWhatsApp hidden={isMenuOpen || IsSearchOpen} />
    </SocialLinksProvider>
  )
}

export default HomeOneLayout
