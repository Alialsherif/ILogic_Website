import { useEffect, useState } from 'react';
import { SocialLinksContext } from './useSocialLinks';
import { resolveSocialLinks } from '../data/socialLinks';

export default function SocialLinksProvider({ children }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}social-links.json`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(config => setLinks(resolveSocialLinks(config)))
      .catch(error => {
        if (error.name !== 'AbortError') console.error('Could not load social-links.json:', error);
      });
    return () => controller.abort();
  }, []);

  return <SocialLinksContext.Provider value={links}>{children}</SocialLinksContext.Provider>;
}
