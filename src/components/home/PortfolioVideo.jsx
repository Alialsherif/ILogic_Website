import { useEffect, useRef } from 'react';

export default function PortfolioVideo({ video, label }) {
  const root = useRef(null), player = useRef(null);

  useEffect(() => {
    const element = player.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches) {
        element.play().catch(() => { /* Keep the poster if automatic playback is unavailable. */ });
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(root.current);
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, []);

  return <div ref={root} className="home-asset-frame home-portfolio-video" style={{ aspectRatio: `${video.width} / ${video.height}` }}>
    <video ref={player} src={video.src} poster={video.poster} width={video.width} height={video.height} muted loop playsInline preload="none" aria-label={label} />
  </div>;
}
