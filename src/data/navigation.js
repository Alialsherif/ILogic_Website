export const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About Us', link: '/about', relatedPaths: ['/teamPage', '/teamDetails', '/testimonialPage'] },
  { title: 'services.breadcrumb.current', link: '/services', relatedPaths: ['/servicePage', '/serviceDetails'] },
  { title: 'projects.title', link: '/projects', relatedPaths: ['/projectPage', '/projectDetails'] },
  { title: 'home.nav.partners', link: '/partners' },
  // Blog routes are reserved until their real content is ready.
  { title: 'Contact', link: '/contact' },
];

const normalizePath = path => path.toLowerCase().replace(/\/+$/, '') || '/';

export function navigationCurrent(pathname, item) {
  const path = normalizePath(pathname);
  if (path === normalizePath(item.link)) return 'page';
  if (item.relatedPaths?.some(related => normalizePath(related) === path)) return 'location';
  return undefined;
}
