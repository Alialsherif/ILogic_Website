// Milliseconds and CSS pixels. This feature loads no animation library.
export const motionConfig = Object.freeze({
  revealDuration: 680, gatherDuration: 900, cardDuration: 900, stagger: 100, maxStagger: 600,
  distance: 40, scatter: 44, cardScatter: 96, parallax: 12, foldBuffer: 80,
  easing: 'cubic-bezier(.22,1,.36,1)', directions: ['up', 'start', 'end', 'up'],
});

export function motionVector({ index, section, direction, rtl, mobile, left, right, viewport, clusterX = 0, clusterY = 0 }) {
  const distance = motionConfig.distance;
  // Stable random-looking positions; rerenders cannot jitter the grid.
  const seed = ((index + 1) * 16807 + (section + 1) * 48271) % 2147483647;
  const scatter = mobile ? 26 : motionConfig.scatter;
  const card = direction === 'cards';
  let x = card ? clusterX + ((seed % 101) / 50 - 1) * (mobile ? 22 : 38)
    : direction === 'gather' ? ((seed % 101) / 50 - 1) * scatter
    : direction === 'start' ? -distance : direction === 'end' ? distance : 0;
  if (rtl && !card) x *= -1;
  x = Math.min(Math.max(x, Math.min(0, 8 - left)), Math.max(0, viewport - right - 8));
  return { x, y: card ? clusterY + (((seed >> 4) % 101) / 50 - 1) * (mobile ? 24 : 40)
      : direction === 'gather' ? (((seed >> 4) % 101) / 50 - 1) * scatter : distance,
    rotation: card ? ((seed % 25) - 12) * (rtl ? -1 : 1) : direction === 'gather' ? ((seed % 29) - 14) * (rtl ? -1 : 1) : 0,
    scale: card ? .9 : direction === 'gather' ? .72 : 1 };
}
