# ILogic — Arabic and English

Arabic is the default. The header and mobile menu offer a language switcher. A visitor's choice is saved in browser storage. `?lang=ar` and `?lang=en` open an explicit language and take priority over that saved choice. Other query parameters and the current page remain intact when switching.

## Copy

Arabic copy lives in `src/i18n/ar.json`. English text is the translation key and the fallback. Use `t()` from `useLocale()` for visible text, placeholders, image descriptions and validation messages. Keep technical names, URLs and contact details unchanged. When adding a page, use `LocalizedLink` for internal navigation so the selected language survives.

Use short, direct Arabic sentences. Translate the purpose of a heading or button rather than its English word order. Avoid inflated claims, repeated superlatives and literal marketing idioms. Use specific keys for headings that need different wording in different contexts.

## Typography and direction

The Arabic version uses **IBM Plex Sans Arabic**, self-hosted in `public/fonts/ibm-plex-sans-arabic/`, with its Open Font License included. The English typefaces and ILogic wordmark retain their established styling. `src/scss/_localization.scss` defines Arabic type sizes, line spacing, mirrored controls and responsive adjustments. Shared spacing utilities use logical inline properties.

The provider updates the document language, direction, title and description. Text animations keep complete letterforms intact; carousels remount with their new direction. Switching languages preserves form inputs.

## Validation

Run `npm run test:i18n` for translation and language-aware navigation checks, and `npm run build` for the production build.

With the local Vite server running on `http://127.0.0.1:5173`, `node scripts/audit-localization.mjs` checks all routes in both languages at desktop and phone widths, plus tablet navigation, repeated switching, storage and form-input preservation. It uses local Chrome in headless mode and writes screenshots and a report to the ignored `localization-preview.local/` directory. The browser audit currently targets Windows with Google Chrome installed in its standard location.
