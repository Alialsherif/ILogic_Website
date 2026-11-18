import { useLocale } from '../i18n/useLocale';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLocale();
  const next = language === 'ar' ? 'en' : 'ar';
  return (
    <button
      type="button"
      className="language-switcher"
      onClick={() => setLanguage(next)}
      aria-label={language === 'ar' ? 'Switch to English (EN)' : 'التبديل إلى العربية (العربية)'}
      lang={next}
      dir={next === 'ar' ? 'rtl' : 'ltr'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      {next === 'ar' ? 'العربية' : 'EN'}
    </button>
  );
}
