import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLocale } from '../i18n/useLocale';
import { enhanceScrollMotion } from '../motion/scrollMotion';

export default function ScrollMotion() {
  const { pathname } = useLocation();
  const { language } = useLocale();
  useEffect(() => {
    let cancelEnhancement = () => {};
    const begin = () => { cancelEnhancement = enhanceScrollMotion(document.querySelector('main')); };
    // Keep setup out of the first paint; content stays visible while the browser is busy.
    const idle = 'requestIdleCallback' in window;
    const task = idle ? window.requestIdleCallback(begin, { timeout: 1500 }) : window.setTimeout(begin, 120);
    return () => {
      if (idle) window.cancelIdleCallback(task); else window.clearTimeout(task);
      cancelEnhancement();
    };
  }, [pathname, language]);
  return null;
}
