# Services and About visual refinement

Both pages retain their copy, section order, heading semantics, metadata, contact links, and existing white/charcoal/mint/lavender identity.

Services now opens with a code-native diagram: clients, data and tasks connect through ILogic to time for what matters. Its labels are real localized HTML, prerendered with the rest of the page. The artwork replaces the generic automation image. Service cards have larger visual icon tiles, a two-column desktop layout, and a distinct charcoal security card. Sector open/hover states and project details use the same visual language.

About was subsequently redesigned on November 18 after the owner requested more personality for the inner pages. It now has an editorial introduction, a wide illustrated Russia-to-Egypt journey, two connected story chapters on charcoal, open service rows, a lavender product section with a concept clock, the creators spotlight, open principle columns and a curved mint closing. See `docs/ABOUT-PAGE.md` for the current implementation. The homepage is unchanged.

New decorative movement uses transform and opacity only. Existing IntersectionObserver scroll reveal remains in use. Reduced-motion visitors see static scenes, and all copy stays visible without JavaScript. No animation library, new raster image or video was added.

Main files:
- `src/components/home/LogicScene.jsx`
- `src/pages/ServicePage.jsx` and `src/pages/AboutPage.jsx`
- `src/scss/_services-page.scss` and `src/scss/_about-page.scss`
- `src/i18n/services.ar.json` and `src/i18n/services.en.json`

The scene timing is in `logic-current` (4.5 seconds) and `about-route-travel` (5 seconds); these are decorative animation cycles, not claims about the business. Scroll timing remains controlled by `src/motion/motionConfig.js`.

Validation: production build, targeted ESLint, Services/About source tests, both browser audit suites at 375/768/1440 px in Arabic and English, keyboard links/disclosures, visual review, overlap/overflow checks, SSR, metadata and reduced-motion scene checks. Screenshots are in `homepage-preview.local/services-page-review` and `homepage-preview.local/about-page-review`.

Service detail pages and backend remain outside this change. No business metrics, launch dates, prices or guarantees were added.
