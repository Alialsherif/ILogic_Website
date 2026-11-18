import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../../i18n/useLocale';
import assets from '../../data/heroAssets.json';
import { heroStories, heroStoryDuration } from '../../data/heroStories';
import { ArrowIcon } from './BrandElements';
import { AutomationScene, SearchScene, StoreScene, StoryIcon } from './HeroStoryScenes';

const steps = ['idea', 'logic', 'build', 'result'];
const scenes = [AutomationScene, SearchScene, StoreScene];
const milestones = [800, 2200, 3700, 5500];
const motionQuery = '(prefers-reduced-motion: reduce)';

export default function HeroVisual() {
  const { t } = useLocale();
  const root = useRef(null), clock = useRef({ elapsed: 0, revision: -1 }), pendingReset = useRef(false);
  const [reduced, setReduced] = useState(() => typeof window === 'undefined' || window.matchMedia(motionQuery).matches);
  const [inView, setInView] = useState(false), [hidden, setHidden] = useState(false);
  const [story, setStory] = useState(0), [phase, setPhase] = useState(0), [revision, setRevision] = useState(0), [paused, setPaused] = useState(false);
  const running = inView && !hidden && !reduced && !paused;
  const shownPhase = reduced ? 4 : phase;
  const activeStep = Math.max(0, shownPhase - 1);
  const currentStory = heroStories[story];

  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    const motion = () => setReduced(media.matches), visibility = () => setHidden(document.hidden);
    media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    visibility();
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting && wasVisible) pendingReset.current = true;
      if (entry.isIntersecting && pendingReset.current) {
        setPhase(0); setRevision(value => value + 1); pendingReset.current = false;
      }
      wasVisible = entry.isIntersecting;
    });
    observer.observe(root.current.closest('.home-hero'));
    return () => { observer.disconnect(); media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    if (clock.current.revision !== revision) clock.current = { elapsed: 0, revision };
    const current = clock.current;
    if (!running) return;
    const started = performance.now();
    const timers = milestones.flatMap((time, index) => time > current.elapsed
      ? [window.setTimeout(() => setPhase(index + 1), time - current.elapsed)] : []);
    const rotation = window.setTimeout(() => {
      setStory(index => (index + 1) % heroStories.length);
      setPhase(0); setRevision(value => value + 1);
    }, Math.max(0, heroStoryDuration - current.elapsed));
    return () => { timers.forEach(clearTimeout); clearTimeout(rotation); current.elapsed += performance.now() - started; };
  }, [running, revision]);

  const selectStory = index => { setStory(index); setPhase(0); setRevision(value => value + 1); };
  const parallax = event => {
    if (reduced || !running || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = root.current.getBoundingClientRect();
    root.current.style.setProperty('--hero-px', `${-((event.clientX-r.left)/r.width-.5)*12}px`);
    root.current.style.setProperty('--hero-py', `${-((event.clientY-r.top)/r.height-.5)*12}px`);
  };
  const resetParallax = () => { root.current.style.setProperty('--hero-px','0px'); root.current.style.setProperty('--hero-py','0px'); };

  return <figure ref={root} className="hero-story" data-story={currentStory.id} data-phase={shownPhase} data-running={running} data-reduced={reduced} onPointerMove={parallax} onPointerLeave={resetParallax}>
    <ol className="visually-hidden" aria-label={t('home.heroStories.label')}>{heroStories.map(item => <li key={item.id}>{t(`home.heroStories.${item.id}`)}</li>)}</ol>
    <p className="visually-hidden" aria-live={running ? 'off' : 'polite'}>{t(`${currentStory.prefix}.description`)}</p>
    <div className="hero-story__card" style={{ '--hero-play': running ? 'running' : 'paused' }}>
      <div className="hero-story__canvas" aria-hidden="true">{assets.background.available && <img className="hero-story__photo" src={assets.background.src} width={assets.background.width} height={assets.background.height} alt="" fetchPriority="high" decoding="async" />}<div className="hero-story__scrim" /></div>
      <div className="hero-story__scenes" key={revision} aria-hidden="true">{heroStories.map((item,index)=>{
        const Scene = scenes[index];
        return <div className="hero-story__scene" data-scene={item.id} key={item.id} hidden={index!==story}>
          <div className="hero-system">
            <div className="hero-system__timeline">{steps.map((key,step)=><span key={key} className={step<=activeStep?'is-reached':''}><i/>{step===activeStep&&<span>{t(`${item.stepPrefix}.${key}`)}</span>}<span className="visually-hidden">{step!==activeStep?t(`${item.stepPrefix}.${key}`):''}</span></span>)}</div>
            <div className="hero-system__story-copy">{steps.map((key,step)=><p key={key} className={step===activeStep?'is-active':''}>{t(`${item.prefix}.scene.${key}`)}</p>)}</div>
            <Scene/>
            <div className="hero-system__outcome"><span className="hero-system__outcome-icon"><StoryIcon name={item.icon} size={28}/></span><div><span className="hero-system__outcome-lead">{t(`${item.prefix}.handled`)}</span><span className="hero-system__outcome-title">{t(`${item.prefix}.focus`)}</span></div></div>
          </div>
        </div>;
      })}</div>
      <div className="hero-story__footer"><a href="#works" className="hero-story__work-link">{t('home.heroVisual.work')}<ArrowIcon/></a><button type="button" className="hero-story__toggle" disabled={reduced} aria-label={t(paused?'home.heroVisual.play':'home.heroVisual.pause')} aria-pressed={paused||reduced} onClick={()=>setPaused(value=>!value)}><svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.7" aria-hidden="true">{paused||reduced?<path d="m9 5 10 7-10 7z"/>:<path d="M8 5v14M16 5v14"/>}</svg></button></div>
    </div>
    <div className="hero-story__switcher" role="group" aria-label={t('home.heroStories.label')}>{heroStories.map((item,index)=><button key={item.id} type="button" aria-pressed={index===story} onClick={()=>selectStory(index)}>{t(`home.heroStories.${item.id}`)}</button>)}</div>
    <figcaption>{t(`${currentStory.prefix}.caption`)}</figcaption>
  </figure>;
}
