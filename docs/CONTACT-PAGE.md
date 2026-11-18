# Contact page

`/contact` is a bilingual contact page in the existing identity. Arabic content is prerendered, and the page has localized metadata, ContactPage/Breadcrumb schema, a PostalAddress and sitemap entries.

The owner-provided address is displayed as:

كمباوند المشارق، خلف جامعة MSA، مدينة 6 أكتوبر، الجيزة، مصر.

The Google Maps embed is the exact URL supplied by the owner. It is lazy-loaded in a frame with a reserved responsive height, a localized accessible title and `strict-origin-when-cross-origin`. The external Google Maps link uses the same place's CID extracted from that embed. No postal code, opening hours or coordinates for structured data were guessed.

WhatsApp and social contacts use `public/social-links.json` through the existing provider; that file was not changed. The displayed WhatsApp number is derived from its configured `wa.me` URL. The old template email, phone numbers and Australian map were removed. No verified business email was available, so none is displayed.

The form prepares a WhatsApp message with name, optional email, message and an optional service/sector context from existing internal links. Labels stay visible, errors are localized and linked to fields, and focus moves to the first invalid field. The action explicitly says to continue on WhatsApp: it opens the chat with a draft for the visitor to review and send. It does not send a message, submit to a backend, store personal information or claim delivery. Values remain in the form.

Key files: `src/pages/Contact.jsx`, `src/data/contactDetails.js`, `src/i18n/contact.ar.json`, `src/i18n/contact.en.json`, `src/scss/_contact-page.scss`, `src/seo/contactSeo.js`.

Validation: `npm run test:contact`, targeted ESLint, production build, and `node homepage-preview.local/audit.mjs contact-page-review`. Browser checks cover 375/768/1440 px in Arabic/English, layout, the supplied map URL, active contact links, accessible form errors, preserved values, service context and exact WhatsApp draft encoding. Tests intercept `window.open`; no WhatsApp message is sent. Screenshots/report are in `homepage-preview.local/contact-page-review/`.

The embedded map is an external Google service; its load time is outside the site's control. No backend, email address, business hours, response-time promise, billing or deployment was added.
