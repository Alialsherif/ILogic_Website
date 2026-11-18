import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/useLocale';
import monogram from '../../assets/img/shape/ilogic-monogram.svg';

const defaultItems = ['understand', 'plan', 'build', 'improve'].map(key => `home.signature.${key}`);

export default function LogicMarquee({ items = defaultItems, label = 'home.signature.label', className = '' }) {
  const { t, language } = useLocale();
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting)) : null;
    observer?.observe(root.current);
    if (!observer) setInView(true);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();document.addEventListener('visibilitychange',visibility);
    return () => { observer?.disconnect();document.removeEventListener('visibilitychange',visibility); };
  }, []);
  return <aside ref={root} className={`identity-marquee ${className}${paused ? ' is-paused' : ''}`} data-marquee-visible={inView && pageVisible} aria-label={t(label)}>
    <ul className="visually-hidden">{items.map(key => <li key={key}>{t(key)}</li>)}</ul>
    <div className="identity-marquee-track" aria-hidden="true">{[0,1].map(copy => <div key={copy} className="identity-marquee-group" dir={language === 'ar' ? 'rtl' : 'ltr'}>{items.map((key,index) => <div className="identity-marquee-item" key={key}><span className={index % 2 ? 'is-outlined' : ''}>{t(key)}</span><img src={monogram} alt="" width="64" height="75" /></div>)}</div>)}</div>
    <button className="identity-marquee-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={`${t('home.signature.pause')} — ${t(label)}`} aria-pressed={paused}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m8 5 11 7-11 7z" /> : <path d="M8 5v14M16 5v14" />}</svg></button>
  </aside>;
}
