import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    let target;
    try { target = decodeURIComponent(hash.slice(1)); } catch { return; }
    const scrollToTarget = () => {
      const element = document.getElementById(target);
      if (!element) return false;
      element.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });
      return true;
    };
    if (scrollToTarget()) return;
    const observer = new MutationObserver(() => { if (scrollToTarget()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = setTimeout(() => observer.disconnect(), 5000);
    return () => { observer.disconnect(); clearTimeout(timeout); };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
