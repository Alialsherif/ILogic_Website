export const sectorPagesEnabled = false;
export const sectorInterval = 7000;
export const sectors = [
  { slug: 'clinics' },
  { slug: 'beauty' },
  { slug: 'dental' },
  { slug: 'medical-centers' },
  { slug: 'restaurants', proof: true },
  { slug: 'real-estate' },
  { slug: 'education' },
  { slug: 'industrial', proof: true },
  { slug: 'retail' },
  { slug: 'professional-services' },
  { slug: 'hospitality' },
  { slug: 'fitness' },
];

export const nextSector = (index, delta = 1) => ((index + delta) % sectors.length + sectors.length) % sectors.length;
export const sectorImage = slug => `/images/identity-v2/sectors/sector-${slug}.webp`;

export function sectorContact(baseUrl, language, name) {
  if (!baseUrl) return undefined;
  const url = new URL(baseUrl);
  const text = language === 'en'
    ? name ? `Hello ILogic, I work in ${name} and would like advice on a website or system.` : 'Hello ILogic, I would like advice on a website or system for my field.'
    : name ? `مرحبًا ILogic، أعمل في مجال ${name} وأرغب في استشارة بخصوص موقع أو نظام.` : 'مرحبًا ILogic، أرغب في استشارة بخصوص موقع أو نظام لمجالي.';
  url.searchParams.set('text', text);
  return url.href;
}
