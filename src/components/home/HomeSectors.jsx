import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/useLocale';
import { LocalizedLink } from '../../i18n/LocalizedLink';
import { useSocialLinks } from '../useSocialLinks';
import { sectors, sectorPagesEnabled, sectorInterval, nextSector, sectorContact, sectorImage } from '../../data/homeSectors';
import { ArrowIcon, SectionHeading } from './BrandElements';
import SectorSearchScene from './SectorSearchScene';
import SectorIcon from './SectorIcon';
import BrandText from './BrandText';

function SectorArrow({ previous = false, rtl = false }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={previous !== rtl ? 'm17 17-10-10m0 9V7h9' : 'M7 17 17 7M8 7h9v9'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

// Homepage variant of Team.jsx: same three-zone composition, portrait,
// next thumbnail, circular ab-teammember controls and primary-btn-one pill.
export default function HomeSectors() {
  const { t, language } = useLocale();
  const whatsapp = useSocialLinks().find(link => link.id === 'whatsapp')?.url;
  const root = useRef(null);
  const inputMode = useRef(null);
  const timer = useRef({ remaining: sectorInterval, revision: -1 });
  const [active, setActive] = useState(0);
  const [revision, setRevision] = useState(0);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const running = inView && !hidden && !keyboardFocused && !paused && !reduced;
  const effectivePaused = paused || reduced;
  const next = nextSector(active);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReduced(media.matches);
    const onVisibility = () => setHidden(document.hidden);
    const onKeyboard = event => {
      if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) inputMode.current = 'keyboard';
    };
    const onPointer = () => {
      inputMode.current = 'pointer';
      setKeyboardFocused(false);
    };
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('keydown', onKeyboard, true);
    document.addEventListener('pointerdown', onPointer, true);
    let observer, fallback;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
      observer.observe(root.current);
    } else fallback = window.setTimeout(() => setInView(true), 0);
    return () => {
      observer?.disconnect(); clearTimeout(fallback);
      media.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('keydown', onKeyboard, true);
      document.removeEventListener('pointerdown', onPointer, true);
    };
  }, []);

  useEffect(() => {
    if (timer.current.revision !== revision) timer.current = { remaining: sectorInterval, revision };
    root.current?.style.setProperty('--scene-delay', `${-(sectorInterval - timer.current.remaining)}ms`);
    if (!running) return;
    const started = performance.now();
    const timeout = window.setTimeout(() => {
      setActive(index => nextSector(index));
      setRevision(value => value + 1);
    }, timer.current.remaining);
    return () => { clearTimeout(timeout); timer.current.remaining = Math.max(0, timer.current.remaining - (performance.now() - started)); };
  }, [revision, running, language]);

  useEffect(() => {
    if (!inView || hidden) return;
    let cancelled = false;
    const preload = () => {
      const image = new Image();
      image.onload = () => { if (!cancelled) setLoaded(current => current.has(next) ? current : new Set([...current, next])); };
      image.src = sectorImage(sectors[next].slug);
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(preload, { timeout: 700 }) : window.setTimeout(preload, 100);
    return () => { cancelled = true; if (window.cancelIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle); };
  }, [next, inView, hidden]);

  const jump = index => {
    setActive(index);
    setLoaded(current => new Set([...current, index]));
    setRevision(value => value + 1);
  };
  const onKeyDown = event => {
    // Pointer clicks keep autoplay running; actual keyboard use pauses it.
    if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
    if (event.currentTarget.contains(document.activeElement)) setKeyboardFocused(true);
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const forward = language === 'ar' ? event.key === 'ArrowLeft' : event.key === 'ArrowRight';
    jump(nextSector(active, forward ? 1 : -1));
  };

  // Browsers can restore :focus-visible on pointer-focused controls after a tab switch.
  const onFocus = event => setKeyboardFocused(inputMode.current === 'keyboard' || (inputMode.current === null && event.target.matches(':focus-visible')));

  return <section id="audience" ref={root} className="ab-teammember-area ab-bg pt-120 pb-120 home-sectors" aria-labelledby="audience-title" onFocusCapture={onFocus} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }} onKeyDown={onKeyDown}>
    <div className="container">
      <div className="home-sectors__showcase" role="region" aria-roledescription="carousel" aria-label={t('home.sectors.carousel')} data-active-sector={sectors[active].slug} data-playing={running}>
        <div className="home-sectors__intro ab-section-wrapper">
          <SectionHeading eyebrow="home.sectors.eyebrow" title="home.sectors.title" highlight="home.sectors.highlight" id="audience-title" />
          <p>{t('home.sectors.text')}</p>
          {whatsapp && <a className="primary-btn-one" href={sectorContact(whatsapp, language)} target="_blank" rel="noopener noreferrer">{t('home.sectors.other')} <ArrowIcon /></a>}
        </div>
        <figure className="home-sectors__visual">
        <div className="home-sectors__portrait br-24" style={{ '--scene-duration': `${sectorInterval}ms` }}>
          {sectors.map((sector, index) => <img key={sector.slug} className={`home-sectors__photo${index === active ? ' is-active' : ''}${index === active && running ? ' is-running' : ''}`} src={index === active || loaded.has(index) ? sectorImage(sector.slug) : undefined} alt="" width="1000" height="1250" loading="lazy" decoding="async" aria-hidden="true" />)}
          <span className="home-sectors__photo-scrim" aria-hidden="true" />
          {sectors.map((sector, index) => <SectorSearchScene key={`${sector.slug}-${revision}-${language}`} sector={sector} active={index === active} running={running} />)}
          <span className="home-sectors__index" aria-hidden="true"><bdi dir="ltr">{String(active + 1).padStart(2, '0')} / 12</bdi></span>
        </div>
        <figcaption>{t('home.sectors.illustration')}</figcaption>
        </figure>
        <div className="home-sectors__list ab-teammember-card">
          <div className="home-sectors__slides" aria-live={running ? 'off' : 'polite'} aria-atomic="true">
            {sectors.map((sector, index) => <div key={sector.slug} id={`sector-${sector.slug}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} ${t('home.sectors.of')} ${sectors.length}`} aria-hidden={index !== active} className={`home-sector-slide${index === active ? ' is-active' : ''}`}>
              <h3>{sectorPagesEnabled ? <LocalizedLink to={`/sectors/${sector.slug}`}>{t(`home.sectors.${sector.slug}.name`)}</LocalizedLink> : t(`home.sectors.${sector.slug}.name`)}</h3>
              <div className="home-sectors__progress" aria-hidden="true"><span key={revision} style={{ animationDuration: `${sectorInterval}ms`, animationPlayState: running && index === active ? 'running' : 'paused' }} /></div>
              <dl className="home-sector-slide__journey">
                <div><dt>{t('home.sectors.searchLabel')}</dt><dd>«{t(`home.sectors.${sector.slug}.search`)}»</dd></div>
                <div><dt>{t('home.sectors.decisionLabel')}</dt><dd>{t(`home.sectors.${sector.slug}.decision`)}</dd></div>
                <div><dt>{t('home.sectors.preparationLabel')}</dt><dd>{t(`home.sectors.${sector.slug}.preparation`)}</dd></div>
              </dl>
              <ul className="home-sector-slide__tags">{[0, 1, 2].map(tag => <li key={tag}>{t(`home.sectors.${sector.slug}.tag${tag}`)}</li>)}</ul>
              {sector.proof && <a className="home-sector-slide__proof" href="#works"><BrandText text={t(`home.sectors.${sector.slug}.proof`)} /></a>}
              {whatsapp && <a className="home-text-link home-sector-slide__chat" href={sectorContact(whatsapp, language, t(`home.sectors.${sector.slug}.name`))} target="_blank" rel="noopener noreferrer" tabIndex={index === active ? 0 : -1}>{t('home.sectors.chat')} <ArrowIcon /></a>}
            </div>)}
          </div>
          <div className="home-sectors__upcoming" aria-hidden="true">{[1, 2].map(offset => <p key={offset}>{t(`home.sectors.${sectors[nextSector(active, offset)].slug}.name`)}</p>)}</div>
          <div className="home-sectors__navigation ab-teammember-body">
            <div className="home-sectors__next-search" aria-hidden="true"><SectorIcon slug={sectors[next].slug} size={28} /><span>{t(`home.sectors.${sectors[next].slug}.search`)}</span></div>
            <div className="ab-teammember-btn-wrapper home-sectors__controls">
              <button type="button" className="ab-teammember-btn home-sectors__prev" onClick={() => jump(nextSector(active, -1))} aria-label={t('home.sectors.previous')} aria-controls="audience"><SectorArrow previous rtl={language === 'ar'} /></button>
              <button type="button" className="ab-teammember-btn home-sectors__next" onClick={() => jump(nextSector(active))} aria-label={t('home.sectors.next')} aria-controls="audience"><SectorArrow rtl={language === 'ar'} /></button>
              <button type="button" className="ab-teammember-btn home-sectors__pause" onClick={() => setPaused(value => !value)} aria-pressed={effectivePaused} disabled={reduced} aria-label={t(effectivePaused ? 'home.sectors.play' : 'home.sectors.pause')} aria-describedby={reduced ? 'sectors-motion-note' : undefined}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{effectivePaused ? <path d="m9 5 11 7-11 7z" /> : <path d="M8 5v14M16 5v14" />}</svg>
              </button>
            </div>
          </div>
          {reduced && <span id="sectors-motion-note" className="visually-hidden">{t('home.sectors.reduced')}</span>}
        </div>
      </div>
      <div className="home-sectors__chips" role="group" aria-label={t('home.sectors.choose')}>{sectors.map((sector, index) => <button key={sector.slug} type="button" aria-pressed={active === index} aria-controls={`sector-${sector.slug}`} onClick={() => jump(index)}>{t(`home.sectors.${sector.slug}.name`)}</button>)}</div>
    </div>
  </section>;
}
