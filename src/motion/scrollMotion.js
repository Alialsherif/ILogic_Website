import { motionConfig, motionVector } from './motionConfig';

const cards = '.home-question-card,.home-about-definition,.home-about-innovation,.home-roadmap>li,.about-story-grid>article,.about-services-grid>article,.about-principles-grid>article,.about-product-focus,.partner-criteria-grid>article,.partner-offers>article,.partner-why-columns>div,[data-motion-card]';
const icons = '.identity-orbit,.about-services-grid>article>.home-line-icon,.about-principles-grid>article>.home-line-icon,.partner-criteria-grid>article>.home-line-icon,.partner-offers>article>.home-line-icon';
const text = 'h2,h3,h4,p,blockquote';
const lines = '.motion-heading-word,h2.home-logic-headline>.home-logic-arrow';
const photos = '.home-question-card__media,.home-partner-visual,.about-innovators-art';
const excluded = '.home-hero,.about-hero,.partner-hero,.hero-story,.home-sector-slide,.home-sectors__upcoming,.home-sectors__next-search,.sector-result,.sector-landing,.visually-hidden,[hidden],.partner-form-step,.partner-application-card';
const properties = ['--x','--y','--r','--i','--motion-scale','--motion-duration','--motion-delay','--motion-parallax','--motion-depth','--motion-ease'];

function staggerIndex(element, icon, isCard) {
  const process = element.closest('.identity-process');
  if (process) return [...process.children].indexOf(element.closest('li'));
  const card = isCard ? element : icon ? element.closest(cards) : null;
  if (card) return [...card.parentElement.children].filter(e => e.matches(cards)).indexOf(card);
  return Math.max(0, [...element.parentElement.children].filter(e => e.matches(text)).indexOf(element));
}

// Enhance existing nodes only. Never replace, fetch, split or generate text.
export function enhanceScrollMotion(root) {
  if (!root || !('IntersectionObserver' in window)) return () => {};
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width:1024px) and (hover:hover) and (pointer:fine)');
  const seen = new WeakSet();
  let stop = () => {};
  function start() {
    stop();
    if (preference.matches) { document.body.dataset.scrollMotion = 'reduced'; return; }
    const touched = new Set(), timers = new Set(), pending = new Set(), parallax = new Set(), queued = new Map(), wordGroups = new Map();
    const sections = [...root.querySelectorAll('section')].filter(s => !s.parentElement.closest('section'));
    let frame = 0, closed = false;
    const reveal = (element, instant = false) => {
      if (!pending.delete(element)) return;
      observer.unobserve(element); seen.add(element);
      if (instant) { element.dataset.motionState = 'done'; return; }
      element.dataset.motionState = 'entering';
      const timer = window.setTimeout(() => { if (!closed) element.dataset.motionState = 'done'; timers.delete(timer); }, Number(element.dataset.motionDuration) + Number(element.dataset.motionWait) + 80);
      timers.add(timer);
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (wordGroups.has(entry.target)) { for (const word of wordGroups.get(entry.target)) reveal(word); observer.unobserve(entry.target); }
        else reveal(entry.target);
      }
    }), { threshold: .06, rootMargin: '0px 0px -24px 0px' });
    const arm = (plan, instant) => {
      const { element, icon, isCard, vector, delay, duration, order, explicitDelay, heading } = plan;
      queued.delete(element); prepareObserver.unobserve(element); touched.add(element);
      element.classList.add('scroll-motion');
      if (isCard) element.classList.add('motion-card');
      if (icon) element.classList.add('motion-icon'); if (icon || isCard) element.classList.add('motion-hover');
      for (const [property, value] of Object.entries({ '--x': `${vector.x}px`, '--y': `${vector.y}px`, '--r': `${vector.rotation}deg`, '--i': order, '--motion-scale': vector.scale, '--motion-duration': `${duration}ms`, '--motion-ease': motionConfig.easing, '--motion-delay': explicitDelay ? `${delay}ms` : `calc(var(--i) * ${motionConfig.stagger}ms)` })) element.style.setProperty(property, value);
      element.dataset.motionDuration = String(duration); element.dataset.motionWait = String(delay);
      if (instant) { element.dataset.motionState = 'done'; seen.add(element); }
      else { pending.add(element); element.dataset.motionState = 'pending'; observer.observe(heading || element); }
    };
    // Do not promote the whole offscreen document into transformed layers at startup.
    const prepareObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        const instant = entry.boundingClientRect.top < innerHeight + 8 || entry.target.contains(document.activeElement);
        if (wordGroups.has(entry.target)) {
          for (const word of wordGroups.get(entry.target)) if (queued.has(word)) arm(queued.get(word),instant);
          prepareObserver.unobserve(entry.target);
        } else if (queued.has(entry.target)) arm(queued.get(entry.target),instant);
      }
    }, { rootMargin: '0px 0px 260px 0px' });
    const updateParallax = () => {
      frame = 0; if (closed) return;
      const updates = [...parallax].map(element => {
        const r = element.closest('section').getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - r.top - r.height / 2) / innerHeight));
        return [element, `${(progress * motionConfig.parallax * Number(element.style.getPropertyValue('--motion-depth') || 1)).toFixed(2)}px`];
      });
      for (const [element, offset] of updates) element.style.setProperty('--motion-parallax', offset);
    };
    const onScroll = () => { if (parallax.size && !frame) frame = requestAnimationFrame(updateParallax); };
    const backgroundObserver = new IntersectionObserver(entries => {
      for (const {target,isIntersecting} of entries) {
        if (isIntersecting) { touched.add(target); target.classList.add('motion-parallax'); parallax.add(target); }
        else { parallax.delete(target); target.classList.remove('motion-parallax'); target.style.removeProperty('--motion-parallax'); }
      }
      onScroll();
    }, { rootMargin: '100px 0px' });
    const focus = event => {
      for (let node = event.target; node && node !== root; node = node.parentElement) {
        if (queued.has(node)) arm(queued.get(node), true); else if (pending.has(node)) reveal(node, true);
      }
    };
    stop = () => {
      closed = true; observer.disconnect(); prepareObserver.disconnect(); backgroundObserver.disconnect(); queued.clear(); wordGroups.clear(); cancelAnimationFrame(frame); timers.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll); root.removeEventListener('focusin', focus);
      for (const element of touched) {
        element.classList.remove('scroll-motion','motion-hover','motion-icon','motion-card','motion-parallax','motion-photo');
        for (const property of properties) element.style.removeProperty(property);
        delete element.dataset.motionState; delete element.dataset.motionDuration; delete element.dataset.motionWait;
      }
      delete document.body.dataset.scrollMotion;
      document.documentElement.classList.remove('has-scroll-motion');
    };
    try {
      // Batch geometry reads before writes. The hero and initial viewport stay immediate.
      const viewport = innerWidth, fold = innerHeight, rtl = document.documentElement.dir === 'rtl';
      const plans = [], backgrounds = [], photoPlans = [], groupRects = new Map(), headingRows = new Map();
      sections.forEach((section, sectionIndex) => {
        if (!sectionIndex || section.matches('.home-hero,.about-hero,.partner-hero,.ab-breadcrum')) return;
        let index = 0;
        for (const element of section.querySelectorAll(`${cards},${icons},${text},${lines},.home-sectors__portrait,.partner-systems li,.title-anim,.split-text,.reveal,[data-aos]`)) {
          const icon = element.matches(icons);
          const word = element.matches(lines);
          if (element.closest(excluded) || (!icon && !word && element.closest('[aria-hidden="true"]'))) continue;
          if (!word && element.matches('h2') && element.querySelector('.motion-heading-word')) continue;
          if (element.closest('details') && !element.closest('summary')) continue;
          const r = element.getBoundingClientRect();
          if (!r.width || !r.height || r.top < fold + motionConfig.foldBuffer || seen.has(element)) continue;
          const isCard = element.matches(cards);
          if (!icon && !isCard && element.parentElement.closest(cards)) continue;
          let order = staggerIndex(element, icon, isCard), clusterX = 0, clusterY = 0;
          if (isCard) {
            if (!groupRects.has(element.parentElement)) groupRects.set(element.parentElement,element.parentElement.getBoundingClientRect());
            const g = groupRects.get(element.parentElement), limit = viewport < 768 ? 48 : motionConfig.cardScatter;
            clusterX = Math.max(-limit,Math.min(limit,(g.left+g.width/2-r.left-r.width/2)*.28));
            clusterY = Math.max(-limit,Math.min(limit,(g.top+g.height/2-r.top-r.height/2)*.18));
          }
          if (word) {
            const heading = element.closest('h2');
            if (!groupRects.has(heading)) groupRects.set(heading,heading.getBoundingClientRect());
            if (!headingRows.has(heading)) headingRows.set(heading,[...new Set([...heading.querySelectorAll(lines)].map(w=>Math.round(w.getBoundingClientRect().top)))].sort((a,b)=>a-b));
            order = Math.max(0,headingRows.get(heading).findIndex(y=>Math.abs(y-r.top)<3));
          }
          const direction = isCard ? 'cards' : icon ? 'gather' : element.dataset.motionDirection || section.dataset.motionDirection || motionConfig.directions[(sectionIndex - 1) % motionConfig.directions.length];
          const bounds = word ? groupRects.get(element.closest('h2')) : r;
          const vector = motionVector({ index, section: sectionIndex, direction, rtl, mobile: viewport < 768, left: bounds.left, right: bounds.right, viewport, clusterX, clusterY });
          order = Math.min(Math.floor(motionConfig.maxStagger/motionConfig.stagger),Math.max(0,Number(element.style.getPropertyValue('--i') || order)));
          const delay = Number(element.dataset.motionDelay ?? (order * motionConfig.stagger));
          const duration = Number(element.dataset.motionSpeed ?? (isCard ? motionConfig.cardDuration : icon ? motionConfig.gatherDuration : motionConfig.revealDuration));
          plans.push({ element, icon, isCard, vector, order, delay: Math.min(motionConfig.maxStagger, Math.max(0, delay)), duration, explicitDelay: element.dataset.motionDelay !== undefined, heading: word ? element.closest('h2') : null }); index++;
        }
        if (desktop.matches && section.getBoundingClientRect().top >= fold) {
          // Keep full-section gradients static; only the small media frames move.
          [...section.querySelectorAll(photos)].forEach((photo,photoIndex) => {
            photoPlans.push({photo,depth:[.55,.85,.65,1][photoIndex%4]}); backgrounds.push(photo);
          });
        }
      });
      document.body.dataset.scrollMotion = 'enabled';
      document.documentElement.classList.add('has-scroll-motion');
      for (const {photo,depth} of photoPlans) { touched.add(photo); photo.style.setProperty('--motion-depth',String(depth)); photo.classList.add('motion-photo'); }
      for (const plan of plans) {
        queued.set(plan.element,plan);
        if (plan.heading) { if (!wordGroups.has(plan.heading)) wordGroups.set(plan.heading,[]); wordGroups.get(plan.heading).push(plan.element); }
        prepareObserver.observe(plan.heading || plan.element);
      }
      for (const background of backgrounds) backgroundObserver.observe(background);
      window.addEventListener('scroll', onScroll, { passive: true }); root.addEventListener('focusin', focus);
    } catch { stop(); /* Fail open: content wins over decoration. */ }
  }
  // Below-fold decoration has no reason to compete with initial text/font/LCP work.
  // Start with actual scrolling, then prepare each target only near the viewport.
  let started = false;
  const begin = () => {
    if (started) return;
    started = true; window.removeEventListener('scroll', begin); start();
  };
  const onPreference = () => {
    if (started) start();
  };
  if (window.scrollY > 0) begin(); else window.addEventListener('scroll', begin, { passive: true });
  preference.addEventListener('change', onPreference);
  desktop.addEventListener('change', onPreference);
  return () => {
    window.removeEventListener('scroll', begin); preference.removeEventListener('change', onPreference); desktop.removeEventListener('change', onPreference); stop();
    delete document.body.dataset.scrollMotion;
  };
}
