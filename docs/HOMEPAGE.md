# ILogic homepage implementation

The homepage uses the existing dark palette, IBM Plex Sans Arabic / Kanit / Teko fonts, logo, header, footer, button styles and centralized social links. Arabic source copy and matching English live in `src/i18n/homepage.ar.json` and `src/i18n/homepage.en.json`, using the existing locale provider.

## Sections delivered

1. Hero: one H1, supplied copy, two CTAs, rotating badge including AUTOMATION, animated four-node SVG/CSS flow and a reserved collage frame.
2. Trust strip: only the four supplied statements.
3. Story: supplied introduction and four scroll-revealed timeline entries; only the supplied 2023 date.
4. Services: four distinct SVG icons and the supplied logical headlines / descriptions.
5. Selected work: Fopac, ZavodSZ, the coffee loyalty system and optional behavior analytics; no results or metrics are invented.
6. Audience: the three supplied customer groups.
7. Process: the four supplied steps, with the original large circular icon orbits, fine arcs and olive background artwork.
8. ILogic Lab: roadmap, status pills, labeled interest fields, validation and honeypot. Submission is disabled, as explicitly requested without integration.
9. Partners: logical headline, supplied program terms, three steps and links to `/partners`.
10. FAQ: five keyboard-operable native accordion items; structured data shares the same source copy.
11. Final CTA and footer: existing WhatsApp URL, link to the existing contact form, tagline and partners navigation.

## Portfolio images

The portfolio's Fopac and ZavodSZ frames now use the existing real-site captures, copied byte-for-byte into the expected filenames. The loyalty project uses a newly generated concept illustration with its visible illustrative caption. All three WebPs are present and under 150,000 bytes. See `docs/WORKS-PRESENTATION.md` for provenance, generation prompt and compact-layout verification. The old hero-mockup-collage.webp is no longer used by the homepage.

| File | Dimensions |
| --- | --- |
| `fopac-website-mockup.webp` | 1600 × 1000 |
| `zavodsz-website-mockup.webp` | 1600 × 1000 |
| `loyalty-system-self-service-coffee.webp` | 1600 × 1067 |

`behavior-analytics-dashboard.svg` is implemented as an abstract, explicitly illustrative dashboard. It contains no real client data, labels or reported numeric results. No generated artwork is presented as a real client screenshot.

## TODO / deliberately not guessed

- Portfolio image gaps are resolved as described above. The hero has its own generated background and captured og-home.webp.
- Supply verified result metrics for Fopac, ZavodSZ, the loyalty system and, if desired, behavior analytics. Result rows remain absent.
- Choose and configure a real form backend before enabling the Lab form. No Firebase SDK, database, collection, security rules, API endpoint, timestamp storage or email subscription has been invented.
- The existing contact form also has no delivery backend. Its previous false-success behavior has been replaced with an honest unavailable notice; input is retained. Existing contact details remain unchanged.
- `/partners` is built in both languages with the nine requested sections and a frontend-only three-step application form. Submission and file uploading remain inactive under the owner's latest instruction; see `docs/PARTNERS.md` for details and outstanding owner policies.
- Provide real career and privacy destinations; existing footer placeholder links have been preserved. The FAQ and contact links point to actual destinations.
- Provide actual company social profiles before adding `sameAs`. The current Facebook, Instagram and LinkedIn links are generic platform homepages, so they are preserved in the UI but excluded from Organization identity claims.
- Client websites could not be independently fetched by the browsing tool; supplied names, descriptions and URLs are used as provided. No extra client claims, screenshots, results, bank names or platform names were guessed.
- Other existing template pages are outside this homepage-content task. Their independent content has not been represented as verified company facts.

## SEO and build

`npm run build` prepares the asset manifests, builds Vite, then prerenders the complete Arabic homepage into `dist/index.html`, including canonical/hreflang, Open Graph, Twitter and Organization/FAQ JSON-LD. Runtime metadata follows the existing language toggle (`?lang=en`) and route. English query URLs share Firebase's static Arabic HTML response until JavaScript renders their English variant; server-based language negotiation was not invented.

Robots and sitemap files use the supplied production origin. The hero uses its generated background, a code-built illustrative workflow and headless-captured `og-home.webp`; the former `hero-mockup-collage.webp` and project screenshot/loyalty sequence are no longer consumed by the hero. See `docs/HERO-WORKFLOW.md` for the current narrative and validation. `docs/HERO-VISUAL.md` records the discarded version and its historical measurements. Shared pending-image wording was removed in both locales; unrelated project mock-up placeholders remain unlabeled. Existing generic social URLs are not treated as verified brand identities.

No deployment is part of this change. No fabricated numbers, names, testimonials, team members, prices, awards, addresses, bank identities or technology-platform identities are added to the homepage. Cameras / vision are not mentioned in the new homepage content.

## Verification

- Production build and Arabic HTML prerender succeed.
- Eighteen homepage, localization and partners content/SEO/validation tests pass.
- Browser emulation checked 375, 768 and 1440 px in both Arabic RTL and English LTR: one H1, correct heading levels, all sections, four intentional asset placeholders, no broken images, no untranslated keys and no horizontal content overflow.
- FAQ activation by keyboard, language switching, external project link attributes, works anchor, the contact route and reduced-motion behavior were exercised.
- Secondary routes load separately. No unmeasured Lighthouse score is claimed.
- The restored original artwork, large project showcase, project selector and orbital process were checked with the partners page in 12 browser cases (375/768/1440 px, Arabic/English, both routes): no horizontal content overflow, broken images, untranslated keys or runtime errors. FAQ keyboard controls and anchors pass. See `docs/VISUAL_IDENTITY.md` for the preserved design direction.

## Refresh loading

The document now sets the existing dark canvas before scripts or external styles arrive. The base body rule also uses the site's dark background and white foreground. Bootstrap can no longer expose a temporary white background behind the header and route placeholder.

Initial homepage loading awaits both its page module and template styles before mounting React, as the partners route already did. They load in parallel, without an artificial delay. Production keeps the complete prerendered page visible until that first commit; development keeps a dark canvas until the page is ready. Secondary routes remain lazy, and the partners route does not preload the template stylesheet.

Build/prerender, the eighteen tests and targeted ESLint passed. Browser regression covered sixteen cold reloads across development/production, homepage/partners, 375/1440px and Arabic/English. Holding all boot scripts and then the route chunks showed no white canvas or incomplete client loading shell; the first client commit had the real page and one H1. Production prerender markup remained intact while the requests were held. No runtime exceptions were recorded. Report and representative held/final screenshots: `homepage-preview.local/refresh-review/`.
