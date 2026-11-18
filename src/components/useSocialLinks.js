import { createContext, useContext } from 'react';

export const SocialLinksContext = createContext([]);
export const useSocialLinks = () => useContext(SocialLinksContext);
