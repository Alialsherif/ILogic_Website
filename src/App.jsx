
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { lazy, Suspense } from 'react';
import HomeOneLayout from './components/HomeOneLayout';
import ScrollToTop from './components/TopToLoad';
import Loader from './components/Loader';
import LocaleProvider from './i18n/LocaleProvider';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const Home = lazy(() => import('./pages/Home'));
const Animations = lazy(() => import('./components/Animation'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const TeamDetails = lazy(() => import('./pages/TeamDetails'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const TestimonialPage = lazy(() => import('./pages/TestimonialPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const BlogClasic = lazy(() => import('./pages/BlogClasic'));

function RouteEnhancements() {
  const { pathname } = useLocation();
  if (['', '/partners', '/about', '/services', '/servicePage', '/projects', '/projectPage', '/contact'].includes(pathname.replace(/\/+$/, ''))) return null;
  return <Suspense fallback={null}><Animations /></Suspense>;
}



function App({ initialHome, initialPartners, initialAbout, initialServices, initialProjects, initialContact, initialLegacyContent }) {
  const HomeRoute = initialHome || Home;
  const PartnersRoute = initialPartners || PartnersPage;
  const AboutRoute = initialAbout || AboutPage;
  const ServicesRoute = initialServices || ServicePage;
  const ProjectsRoute = initialProjects || ProjectPage;
  const ContactRoute = initialContact || Contact;


  return (
    <>
  <BrowserRouter>
 <LocaleProvider>
 <RouteEnhancements/>
  <ScrollToTop/> 
 <Loader/> 
   <Routes>
        <Route path="/" element={<HomeOneLayout initialLegacyContent={initialLegacyContent} />} >
          <Route index element={<HomeRoute/>}/>
          <Route path='about' element={<AboutRoute/>}/>
          <Route path='partners' element={<PartnersRoute/>}/>
          <Route path='blogPage' element={<BlogPage/>}/>
          <Route path='services' element={<ServicesRoute/>}/>
          <Route path='servicePage' element={<ServicesRoute/>}/>
          <Route path='serviceDetails' element={<ServiceDetails/>}/>
          <Route path='teamDetails' element={<TeamDetails/>}/>
          <Route path='projects' element={<ProjectsRoute/>}/>
          <Route path='projectPage' element={<ProjectsRoute/>}/>
          <Route path='projectDetails' element={<ProjectDetails/>}/>
          <Route path='testimonialPage' element={<TestimonialPage/>}/>
          <Route path='teamPage' element={<TeamPage/>}/>
          <Route path='contact' element={<ContactRoute/>}/>
          <Route path='blogDetails' element={<BlogDetails/>}/>
          <Route path='blogClasic' element={<BlogClasic/>}/>
          <Route path='errorPage' element={<ErrorPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Route>
   
      </Routes>
 </LocaleProvider>
    </BrowserRouter>
 

    </>
  )
}

export default App;
