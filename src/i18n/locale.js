import arabic from './ar.json' with { type: 'json' };
import homepageArabic from './homepage.ar.json' with { type: 'json' };
import homepageEnglish from './homepage.en.json' with { type: 'json' };
import partnersArabic from './partners.ar.json' with { type: 'json' };
import partnersEnglish from './partners.en.json' with { type: 'json' };
import partnerFormArabic from './partner-form.ar.json' with { type: 'json' };
import partnerFormEnglish from './partner-form.en.json' with { type: 'json' };
import aboutArabic from './about.ar.json' with { type: 'json' };
import aboutEnglish from './about.en.json' with { type: 'json' };
import servicesArabic from './services.ar.json' with { type: 'json' };
import servicesEnglish from './services.en.json' with { type: 'json' };
import projectsArabic from './projects.ar.json' with { type: 'json' };
import projectsEnglish from './projects.en.json' with { type: 'json' };
import contactArabic from './contact.ar.json' with { type: 'json' };
import contactEnglish from './contact.en.json' with { type: 'json' };

const homepage = { ar: { ...homepageArabic, ...partnersArabic, ...partnerFormArabic, ...aboutArabic, ...servicesArabic, ...projectsArabic, ...contactArabic }, en: { ...homepageEnglish, ...partnersEnglish, ...partnerFormEnglish, ...aboutEnglish, ...servicesEnglish, ...projectsEnglish, ...contactEnglish } };

export const LANGUAGE_STORAGE_KEY = 'ilogic-language';
export const isLanguage = (value) => value === 'ar' || value === 'en';
export const normalizeCopy = (value) => value.replace(/\s+/g, ' ').trim();

const translations = new Map(Object.entries(arabic).map(([key, value]) => [normalizeCopy(key).toLowerCase(), value]));
const exactTranslations = new Map(Object.entries(arabic).map(([key, value]) => [normalizeCopy(key), value]));
const missingKeyWarnings = new Set();

export function translate(value, language) {
  if (typeof value === 'string' && homepage[language]?.[value] !== undefined) return homepage[language][value];
  if (import.meta.env?.DEV && typeof value === 'string' && /^(?:home|partner|partnerForm|about|services|projects|contact)\./.test(value)) {
    const warning = `${language}:${value}`;
    if (!missingKeyWarnings.has(warning)) {
      missingKeyWarnings.add(warning);
      console.error(`[i18n] Missing ${language} translation: ${value}`);
    }
  }
  if (language !== 'ar' || typeof value !== 'string') return value;
  const translated = exactTranslations.get(normalizeCopy(value)) ?? translations.get(normalizeCopy(value).toLowerCase());
  if (translated === undefined) return value;
  return `${/^\s/.test(value) ? ' ' : ''}${translated}${/\s$/.test(value) ? ' ' : ''}`;
}

export function initialLanguage(search = window.location.search) {
  const requested = new URLSearchParams(search).get('lang');
  if (isLanguage(requested)) return requested;
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch { /* The URL still works when browser storage is unavailable. */ }
  return 'ar';
}

export function localizedDestination(to, language) {
  if (typeof to === 'string') {
    if (!to || to.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(to)) return to;
    const [address, ...hash] = to.split('#');
    const queryIndex = address.indexOf('?');
    const pathname = queryIndex < 0 ? address : address.slice(0, queryIndex);
    const params = new URLSearchParams(queryIndex < 0 ? '' : address.slice(queryIndex + 1));
    params.set('lang', language);
    return `${pathname}?${params}${hash.length ? `#${hash.join('#')}` : ''}`;
  }
  if (to && typeof to === 'object') {
    const params = new URLSearchParams(to.search);
    params.set('lang', language);
    return { ...to, search: `?${params}` };
  }
  return to;
}
