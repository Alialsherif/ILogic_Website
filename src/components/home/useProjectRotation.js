import { useEffect, useRef, useState } from 'react';

export const projectRotationDelay = 6500;

export default function useProjectRotation(count, initialIndex = 0, layoutKey = '') {
  const root = useRef(null);
  const [selected, setSelected] = useState(initialIndex);
  const [enabled, setEnabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const stage = root.current.querySelector('.home-showcase-stage');
    let frame, stopped = false, lastWidth = -1;
    const measure = (force = false) => {
      if (stopped) return;
      const width = Math.round(stage.getBoundingClientRect().width);
      if (!force && width === lastWidth) return;
      lastWidth = width;
      let height = 0;
      // Measure the existing slides in one frame, restoring hidden display before paint.
      // Inactive media stays hidden between frames; it is not duplicated or eagerly loaded.
      for (const slide of stage.children) {
        const previousDisplay = slide.style.display;
        if (slide.hidden) slide.style.display = 'grid';
        height = Math.max(height, slide.getBoundingClientRect().height);
        slide.style.display = previousDisplay;
      }
      stage.style.minHeight = `${Math.ceil(height)}px`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measure());
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    schedule();
    document.fonts.ready.then(() => { if (!stopped) measure(true); });
    return () => {
      stopped = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      stage.style.removeProperty('min-height');
    };
  }, [layoutKey]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setEnabled(!motion.matches);
    const visibility = () => setPageVisible(!document.hidden);
    preference(); visibility();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    observer.observe(root.current);
    motion.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const rotating = enabled && visible && pageVisible && !hovered && !focused;
  useEffect(() => {
    if (!rotating || count < 2) return;
    const timer = window.setTimeout(() => setSelected(current => (current + 1) % count), projectRotationDelay);
    return () => window.clearTimeout(timer);
  }, [rotating, selected, count]);

  return {
    root, selected, enabled, rotating,
    move: delta => setSelected(current => (current + delta + count) % count),
    toggle: () => setEnabled(current => !current),
    interactions: {
      onPointerEnter: event => { if (event.pointerType === 'mouse') setHovered(true); },
      onPointerLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); },
      onPointerDownCapture: event => {
        // Let visitors watch a project video without the carousel taking it away.
        if (event.target.closest('video,.home-portfolio-video-toggle')) setEnabled(false);
      },
    },
  };
}
