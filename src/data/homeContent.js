export const showBehaviorCard = true;
export const services = ['web', 'seo', 'automation', 'security'];
export const processSteps = ['understand', 'plan', 'build', 'improve'];
export const faqKeys = ['cost', 'seo', 'custom', 'partners', 'region'];
export const labChoices = ['website', 'store', 'seo', 'erp', 'crm', 'teamAutomation', 'other'];
export const roadmap = [
  { key: 'web', status: 'available' },
  { key: 'automation', status: 'available' },
  { key: 'business', status: 'building' },
  { key: 'teams', status: 'soon' },
];
export const projects = [
  { key: 'zavodsz', asset: 'zavodsz', href: 'https://www.zavodsz.ru/' },
  { key: 'fopac', asset: 'fopac', href: 'https://fopac.ru/' },
  { key: 'gostinec', asset: 'gostinec', href: 'https://gostinec.pro/' },
  { key: 'alsherif', asset: 'alsherif', href: 'https://alsherifpanel.com/', video: { src: '/videos/home/laptop_transparent.webm', poster: '/images/home/alsherif-laptop-poster.webp', width: 2880, height: 1912 } },
  { key: 'loyalty', asset: 'loyalty' },
  ...(showBehaviorCard ? [{ key: 'behavior', asset: 'behavior' }] : []),
];

export function validateLabInterest({ choice, email, website = '' }) {
  if (website.trim()) return { blocked: true };
  return {
    choice: labChoices.includes(choice) ? '' : 'home.lab.choiceError',
    email: email.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'home.lab.emailError',
  };
}
