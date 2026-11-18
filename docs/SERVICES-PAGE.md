# Services overview

The bilingual services overview is `/services` (`?lang=en` for English). `/servicePage` remains a compatible alias. Both render the overview directly on refresh. The original `ServiceDetails.jsx` and its separate route are reserved for future detail-page work; the new overview does not send visitors to that template.

## Content

- Six services: websites, ecommerce, search visibility, ERP/CRM and custom business systems, process automation, and website/system security.
- Twelve sector disclosures reuse the site's existing sector names, descriptions and tags. They use native `details`/`summary`, work by keyboard, and close the previous disclosure when another opens.
- Business management platform: in development. Team management and automation: planned as part of that vision. These labels distinguish confirmed development from the roadmap, without announcing availability or a launch date.
- Security explains reputation, unauthorized content, access permissions, updates and backups. The scope is agreed per project; no absolute protection guarantee is added.
- Existing contact and centrally configured WhatsApp links are reused. There is no new form or backend integration.

## Editing

- `src/pages/ServicePage.jsx`: page sections and markup.
- `src/data/servicesContent.js`: service, project and security item order.
- `src/i18n/services.ar.json` and `services.en.json`: matching localized copy.
- `src/scss/_services-page.scss`: page-scoped responsive styling, using the existing white, charcoal, mint and lavender identity.
- `src/seo/servicesSeo.js`: localized title/description, canonical, website/page and breadcrumb schema.
- `scripts/write-home-seo.mjs`: static HTML output for the overview and compatibility alias. The sitemap includes the new route.

Navigation, footer and homepage service cards point to the new overview. Service inquiries include the selected service in the existing contact URL. The About page's services link also opens the overview.

## Validation

- `npm run test:services`: copy completeness, duplicate-key checks, metadata and server-rendered sections.
- `npm run test:about`, `npm run test:home`, `npm run test:partners`: existing-page regression checks.
- Production build including static services HTML.
- `node homepage-preview.local/audit.mjs services-page-review`: Arabic/English at 375, 768 and 1440 px; no horizontal overflow; active navigation; keyboard sector disclosure; exclusive accordion behavior; service/contact links; compatibility route; static HTML; sitemap; normal/reduced motion; no runtime exceptions.
- Browser captures and report: `homepage-preview.local/services-page-review/`.

No statistics, prices, delivery/review durations or invented project launch dates were added. No Lighthouse score is claimed by these checks.
