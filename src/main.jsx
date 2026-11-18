import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';
import App from './App';

// Keep the prerendered page visible until its initial route can render in one commit.
// This prevents a suspended route from briefly pulling the footer into the first viewport.
const initialPath = location.pathname.replace(/\/+$/, '') || '/';
const [initialHome, initialPartners, initialAbout, initialServices, initialProjects, initialContact, initialLegacyContent] = await Promise.all([
  initialPath === '/' ? import('./pages/Home') : null,
  initialPath === '/partners' ? import('./pages/PartnersPage') : null,
  initialPath === '/about' ? import('./pages/AboutPage') : null,
  ['/services','/servicePage'].includes(initialPath) ? import('./pages/ServicePage') : null,
  ['/projects','/projectPage'].includes(initialPath) ? import('./pages/ProjectPage') : null,
  initialPath === '/contact' ? import('./pages/Contact') : null,
  initialPath === '/' ? import('./components/LegacyContent') : null,
]);

// The Arabic build already contains the complete page. Let it paint before
// client mounting can replace that large tree. Other locales mount immediately
// so the prerendered Arabic copy cannot flash before their translation.
if (['/', '/about', '/partners', '/services', '/servicePage', '/projects', '/projectPage', '/contact'].includes(initialPath) && document.documentElement.lang === 'ar' && document.visibilityState === 'visible' && document.querySelector('#root main h1')) {
  await new Promise(resolve => {
    const fallback = window.setTimeout(resolve, 100);
    requestAnimationFrame(() => requestAnimationFrame(() => { clearTimeout(fallback); resolve(); }));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialHome={initialHome?.default} initialPartners={initialPartners?.default} initialAbout={initialAbout?.default} initialServices={initialServices?.default} initialProjects={initialProjects?.default} initialContact={initialContact?.default} initialLegacyContent={initialLegacyContent?.default} />
  </StrictMode>,
);
