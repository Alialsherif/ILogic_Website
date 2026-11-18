import { createElement } from 'react';
import { useLocale } from '../../i18n/useLocale';
import HeadingWords from './HeadingWords';

export function ArrowIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

export function LineIcon({ name }) {
  const paths = {
    web: <><rect x="5" y="8" width="54" height="44" rx="5" /><path d="M5 20h54M13 14h1m5 0h1M14 29h17v14H14zm25 0h11m-11 7h11m-11 7h7" /></>,
    seo: <><path d="M8 51V37h9v14m7 0V27h9v24m7 0V17h9v17M6 56h44" /><circle cx="46" cy="16" r="10" /><path d="m53 23 7 7" /></>,
    automation: <><rect x="23" y="5" width="18" height="14" rx="3" /><rect x="5" y="44" width="18" height="14" rx="3" /><rect x="41" y="44" width="18" height="14" rx="3" /><path d="M32 19v12H14v13m18-13h18v13M32 22v4m0 10v4m-9-9h4m10 0h4m-15-6 3 3m6 6 3 3m-12 0 3-3m6-6 3-3" /><circle cx="32" cy="31" r="5" /></>,
    brand: <><rect x="6" y="6" width="52" height="52" rx="4" /><path d="M6 23h52M23 6v52M41 6v52M6 41h52m-30-6 5-8 5 8zm0 0h10" /></>,
    store: <><path d="M10 24h44l-5-14H15l-5 14Zm2 0v32h40V24M24 56V37h16v19M10 24c0 9 11 9 11 0 0 9 11 9 11 0 0 9 11 9 11 0 0 9 11 9 11 0" /></>,
    security: <><path d="m32 5 23 9v17c0 16-23 28-23 28S9 47 9 31V14l23-9Z" /><path d="m21 31 8 8 15-18" /></>,
    clinics: <><rect x="10" y="18" width="44" height="39" rx="5" /><path d="M24 18V9h16v9M27 29h10v8h8v10h-8v8H27v-8h-8V37h8z" /></>,
    business: <><path d="M7 57V15h30v42M37 29h20v28M4 57h56M16 25h5m6 0h3m-14 9h5m6 0h3m-14 9h5m6 0h3m17-4h5m-5 9h5" /></>,
    enterprise: <><path d="M9 56V21L32 7l23 14v35M5 57h54M18 26h28M18 36h28M18 46h28M24 18v38m16-38v38" /></>,
  };
  return <svg className="home-line-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.web}</svg>;
}

export function SectionHeading({ eyebrow, title, highlight, id, beforeTitle, children }) {
  const { t } = useLocale();
  return <div className="home-section-heading ab-section-wrapper"><p className="ab-section-subtitle">{t(eyebrow)}</p>{beforeTitle}<h2 id={id} className="ab-section-title title-anim"><HeadingWords>{t(title)}</HeadingWords>{highlight && <> <span className="ab-section-title-2 motion-heading-word">{t(highlight)}</span></>}</h2>{children}</div>;
}

export function LogicHeadline({ problem, solution, as: headingTag = 'h3', className = '', id }) {
  const { t, language } = useLocale();
  const run = value => headingTag === 'h2' ? <HeadingWords>{value}</HeadingWords> : value;
  return createElement(headingTag, { id, className: `home-logic-headline ${className}` }, <><span><span className="home-logic-token">{run(t('home.logic.if'))}</span> {run(t(problem))}</span><span className="home-logic-arrow" aria-hidden="true">{language === 'ar' ? '←' : '→'}</span><span><span className="home-logic-token">{run(t('home.logic.then'))}</span> <span className="home-outlined">{run(t(solution))}</span></span></>);
}

