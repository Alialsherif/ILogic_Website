import { useEffect, useRef } from 'react';
import { useLocale } from '../../i18n/useLocale';
import asset from '../../data/heroVideo.json';

export default function HeroVideo({ background = false }) {
  const { t } = useLocale();
  const root = useRef(null), player = useRef(null);
  const userPaused = useRef(false), manualPlay = useRef(false);
  const automaticPause = useRef(false), automaticPlay = useRef(false);
  const desktopSource = background ? asset.backgroundDesktop : asset.desktop;
  const mobileSource = background ? asset.backgroundMobile : asset.mobile;

  useEffect(() => {
    const video = player.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const source = window.matchMedia('(max-width:767px)').matches ? mobileSource : desktopSource;
    if (video.getAttribute('src') !== source) video.src = source;
    let visible = false, scrolled = window.scrollY > 0, painted = !background;
    const sync = () => {
      const mayPlay = painted && visible && !document.hidden && !userPaused.current && (manualPlay.current || ((background || scrolled) && !motion.matches));
      if (mayPlay && video.paused && !automaticPlay.current) {
        automaticPlay.current = true;
        video.play().catch(() => { automaticPlay.current = false; });
      } else if (!mayPlay && !video.paused) {
        automaticPause.current = true; video.pause();
      }
    };
    // The poster paints immediately; automatic playback never competes with first paint.
    const onFirstScroll = () => { scrolled = true; sync(); };
    window.addEventListener('scroll', onFirstScroll, { passive: true, once: true });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .12 });
    observer.observe(root.current);
    // Let the preloaded poster and hero text paint before starting background playback.
    let playbackFrame;
    const paintFrame = background ? requestAnimationFrame(() => {
      playbackFrame = requestAnimationFrame(() => { painted = true; sync(); });
    }) : null;
    motion.addEventListener('change', sync); document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect(); window.removeEventListener('scroll', onFirstScroll);
      cancelAnimationFrame(paintFrame); cancelAnimationFrame(playbackFrame);
      motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [background, desktopSource, mobileSource]);

  const handlePlay = () => {
    userPaused.current = false;
    if (!automaticPlay.current) manualPlay.current = true;
    automaticPlay.current = false;
  };
  const handlePause = () => {
    if (automaticPause.current) automaticPause.current = false;
    else { userPaused.current = true; manualPlay.current = false; }
  };

  const media = <video id="home-hero-player" ref={player} src={desktopSource} poster={background ? asset.backgroundPoster : asset.poster} width={asset.width} height={asset.height}
      muted loop playsInline preload="none" aria-label={t('home.heroVideo.label')}
      onPlay={handlePlay} onPause={handlePause}>
      <a href={asset.desktop}>{t('home.works.video.play')}</a>
    </video>;
  if (background) return <div ref={root} className="home-hero-video home-hero-video--background" aria-hidden="true">{media}</div>;
  return <figure ref={root} className="home-hero-video">
    <div className="home-hero-video__frame">
    {media}
    </div>
    <figcaption>{t('home.heroVideo.caption')}</figcaption>
  </figure>;
}
