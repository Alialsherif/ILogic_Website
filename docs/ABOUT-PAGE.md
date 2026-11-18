# About page

Rebuilt `/about` around the owner's account of ILogic's history and purpose, replacing the template's unrelated team, testimonials and blog sections. Arabic and English copy live in `src/i18n/about.ar.json` and `about.en.json`; layout is in `src/pages/AboutPage.jsx`, with scoped styling in `src/scss/_about-page.scss`.

## Content

1. Brand introduction and a visual journey from experience in Russia to serving Egypt and the Gulf.
2. The freelance beginnings, work for major companies, the owner's permission limits on discussing some projects, and the management burden observed in the Middle East.
3. Existing capabilities: websites/stores, SEO, ERP/CRM/custom systems, and automation.
4. The system currently in development, its small-business-to-enterprise direction, and the owner's statement that major institutions have seen it and await its launch. The visible development status distinguishes this work from an available product.
5. Support for creators through the existing Partners Program, linked to `/partners`.
6. The team's method and multidisciplinary work, ending with the owner's clear-logic signature.
7. Contact and the existing centrally configured WhatsApp destination.

No client identities, headcounts, statistics, product name, release date, pricing, new partnership terms or specific unreleased features were invented. No backend, collection or submission service was added. The homepage copy and section order remain unchanged.

## Visual direction — November 18, 2026

Reworked the page after the owner described the inner pages as lacking personality. The current identity is white, charcoal, mint and lavender, with locally hosted Alexandria and Manrope. The homepage is unchanged.

The introduction now leads with “وراء كل حل، ناس بتفكّر فيك.” A wide illustrated journey connects architectural sketches of Russia and Egypt through the actual ILogic wordmark. On phones the two destinations sit side by side, with the wordmark on a separate row. This is a decorative illustration, not a geographic map or a photograph of the team.

The charcoal story section uses two numbered chapters and a connecting line, plus a prominent question about owners' time. A link connects the story to real projects. Capabilities appear as open rows rather than repeated cards. The system in development has a lavender section and a clock illustration, explicitly labeled as a concept. The creators spotlight preserves the existing artwork, partnership scope and mint button. Open principle columns and a curved mint closing section complete the page.

The seven sections, confirmed company history, contact configuration and development status remain intact. New informal Arabic introduction copy has a matching English version. About styles load after the general identity stylesheet, with the obsolete About overrides removed from `_atelier.scss`.

The subsequent video experiment was rolled back at the owner's explicit request. About now has its light introduction and illustrated journey from before the videos were added, with no film, overlay or video controls. The homepage's original video remains intact. `docs/ABOUT-VIDEO.md` and `docs/INNER-PAGE-VIDEO.md` are historical records of the rejected experiment.

Added localized title/description, canonical and language alternates, AboutPage/Organization/WebSite/BreadcrumbList structured data, and `/about` entries in the existing sitemap. The route now prerenders its complete Arabic content to `dist/about/index.html`. Direct initial loading waits for the About module before replacing the prerendered markup. The page avoids the unrelated legacy template bundle, animation setup, loader overlay and duplicate footer callout.

## Validation

- `npm.cmd run build`: passed, including all six Arabic prerendered routes.
- `npm.cmd run test:about`: 3 passed.
- `npm.cmd run test:home`: 8 passed.
- `npm.cmd run test:partners`: 7 passed.
- `npm.cmd run test:i18n`: 3 passed.
- Targeted ESLint for the changed application modules, SEO and render scripts: passed.
- `node homepage-preview.local/audit.mjs about-page-review`: passed at 375, 768 and 1440px in Arabic/RTL and English/LTR, covering all seven sections, one H1 and six H2s, translation completeness, overflow, grid and journey-label collisions, header clearance, heading sizes, localized metadata, initial HTML, keyboard anchor activation, active navigation and homepage → about → partners navigation. The current revision also passed checks for story text contrast and the journey's reading order and separate mobile wordmark row. No browser exceptions.
- Artifacts: `homepage-preview.local/about-page-review/`, with full-page previews at 375 and 1440px in both languages. Browser captures use reduced motion; they do not establish a performance score or frame-rate guarantee.
- Published successfully to Firebase Hosting project `ai-logika`. The public `/about` route returned HTTP 200 with the new journey markup and current entry bundle. Node fetch could not connect; the PowerShell verification outside the sandbox succeeded.

## Not guessed

The new system's commercial name, feature specification and launch date were not supplied, so the page describes its purpose and development status only. Undisclosed client names and projects remain undisclosed. The production host and WhatsApp number continue to use the existing project configuration.
