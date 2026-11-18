import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LocaleContext } from './useLocale';
import { initialLanguage, isLanguage, LANGUAGE_STORAGE_KEY, translate } from './locale';

export default function LocaleProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [fallback] = useState(() => initialLanguage(location.search));
  const requested = new URLSearchParams(location.search).get('lang');
  const language = isLanguage(requested) ? requested : fallback;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch { /* Storage is optional. */ }
  }, [language, dir]);

  const setLanguage = useCallback((next) => {
    if (!isLanguage(next)) return;
    const params = new URLSearchParams(location.search);
    params.set('lang', next);
    navigate({ pathname: location.pathname, search: `?${params}`, hash: location.hash }, { preventScrollReset: true });
  }, [location, navigate]);

  const value = useMemo(() => ({ language, dir, setLanguage, t: (value) => translate(value, language) }), [language, dir, setLanguage]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
