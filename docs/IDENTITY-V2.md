# ILogic visual identity, version 2

The owner requested a complete change from the dark/lime visual identity to a white editorial direction, while keeping all content, section order, routes and functionality.

## Design system

White canvas, near-black type and actions, soft mint and lavender panels, rounded geometry, generous spacing and a contrasting black work gallery. Existing Arabic IBM Plex Sans Arabic is retained; English headings use a clean sans-serif stack. The ILogic wordmark remains the brand name, now rendered in monochrome.

| Role | Value |
| --- | --- |
| Canvas | #ffffff |
| Ink / actions | #111111 |
| Muted copy | #565b60 |
| Mint | #e4f4f0 |
| Lavender | #f0eef8 |
| Borders | #d5dbde |
| Focus | #615b88 |

The final shared visual rules are in [_atelier.scss](../src/scss/_atelier.scss), loaded last in both the core and lazy legacy stylesheets. Contextual surface tokens preserve contrast in the black gallery. Header, mobile navigation, search, footer, WhatsApp, forms, icons and breadcrumb styling follow the same palette.

## Assets

21 images were generated through the built-in image generation tool. They include the hero, partnership distribution, behavior analysis, loyalty software, transparent laptop frame, four service illustrations and twelve sector photos. Originals are retained in `output/imagegen/identity-v2/`; the site uses compact WebP versions in `public/images/identity-v2/`. The generated set totals 1.32 MiB; no image exceeds 110 KB. Individual images load only where needed.

The two 1200 × 630 OG cards use the new artwork and real page titles, composed from the site's fonts. They are `og-home.webp` and `og-partners.webp` in the same public directory.

[Asset catalog and final prompts](identity-v2-assets.json) · [Complete generation and edit prompt set](identity-v2-prompts.json)

| Asset | Dimensions | Size | Installed file |
| --- | --- | --- | --- |
| hero | 1600 × 1000 | 28.2 KB | [WebP](../public/images/identity-v2/hero.webp) |
| partners | 1600 × 1067 | 42.9 KB | [WebP](../public/images/identity-v2/partners.webp) |
| behavior | 1600 × 1067 | 56.1 KB | [WebP](../public/images/identity-v2/behavior.webp) |
| loyalty | 1600 × 1067 | 53.0 KB | [WebP](../public/images/identity-v2/loyalty.webp) |
| laptopFrame | 1536 × 1024 | 54.8 KB | [WebP](../public/images/identity-v2/laptopFrame.webp) |
| service-web | 1200 × 800 | 35.9 KB | [WebP](../public/images/identity-v2/service-web.webp) |
| service-seo | 1200 × 800 | 34.6 KB | [WebP](../public/images/identity-v2/service-seo.webp) |
| service-automation | 1200 × 800 | 34.5 KB | [WebP](../public/images/identity-v2/service-automation.webp) |
| service-identity | 1200 × 800 | 47.2 KB | [WebP](../public/images/identity-v2/service-identity.webp) |
| sector-clinics | 800 × 1000 | 62.4 KB | [WebP](../public/images/identity-v2/sectors/sector-clinics.webp) |
| sector-beauty | 800 × 1000 | 92.9 KB | [WebP](../public/images/identity-v2/sectors/sector-beauty.webp) |
| sector-dental | 800 × 1000 | 59.5 KB | [WebP](../public/images/identity-v2/sectors/sector-dental.webp) |
| sector-medical-centers | 800 × 1000 | 66.1 KB | [WebP](../public/images/identity-v2/sectors/sector-medical-centers.webp) |
| sector-restaurants | 800 × 1000 | 77.4 KB | [WebP](../public/images/identity-v2/sectors/sector-restaurants.webp) |
| sector-real-estate | 800 × 1000 | 105.6 KB | [WebP](../public/images/identity-v2/sectors/sector-real-estate.webp) |
| sector-education | 800 × 1000 | 49.9 KB | [WebP](../public/images/identity-v2/sectors/sector-education.webp) |
| sector-industrial | 800 × 1000 | 69.2 KB | [WebP](../public/images/identity-v2/sectors/sector-industrial.webp) |
| sector-retail | 800 × 1000 | 84.0 KB | [WebP](../public/images/identity-v2/sectors/sector-retail.webp) |
| sector-professional-services | 800 × 1000 | 89.3 KB | [WebP](../public/images/identity-v2/sectors/sector-professional-services.webp) |
| sector-hospitality | 800 × 1000 | 107.1 KB | [WebP](../public/images/identity-v2/sectors/sector-hospitality.webp) |
| sector-fitness | 800 × 1000 | 99.2 KB | [WebP](../public/images/identity-v2/sectors/sector-fitness.webp) |

## Preserved source and behavior

All locale JSON files, original client screenshots, the supplied Al Sherif video and `public/social-links.json` were hash-compared against a pre-edit baseline and remain byte-for-byte unchanged. Real client captures are displayed inside the new laptop frame; the supplied transparent video is retained. Homepage, About and Partners sections and their ordering remain intact. Forms, their draft storage and validation remain frontend-only; existing backend and policy TODOs were not changed. No external delivery or deployment was performed.

## Verification

- Production build and all three Arabic prerenders pass.
- 21 source/content/localization/form tests pass. Targeted ESLint passes.
- Core pages: 18 route/locale/viewport cases at 375, 768 and 1440 px, with no horizontal overflow, missing rendered images or browser exceptions.
- Legacy pages: 24 route/locale/viewport cases across services, contact, projects, blog and detail pages at 375 and 1440 px.
- Hero: all three stories in both languages at all three widths; keyboard switching, layout containment and reduced-motion behavior checked. Automatic cycling and pause/play checked with the pointer inside the site.
- Gallery: all six projects in all six locale/viewport combinations, with no image/text collision; mobile menu and FAQ keyboard operation checked.
- Partners form: 18 responsive states, validation, keyboard completion, file selection, draft restoration, offline error and honeypot behavior checked. No external write requests. Success callbacks tested only in a local fixture.
- Lighthouse was not run for this visual change; no score is claimed.

[Machine-readable QA summary](identity-v2-qa.json)

Visual captures are saved under `homepage-preview.local/identity-v2-final/`, `identity-v2-functional/` and `identity-v2-legacy/`. The prior visual source backup and content baseline are under `identity-v2.local/previous/` and `identity-v2.local/baseline.json`.
