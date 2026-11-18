# ILogic Partners

Route: `/partners` (Arabic), `/partners?lang=en` (English). Uses the existing locale provider, centralized WhatsApp URL, fonts, dark palette and original decorative artwork. No light theme or new external connection is introduced.

Nine sections, in brief order: hero with animated code-native market diagram; why; four steps; four criteria; four offers; systems strip; application heading and a three-step form card; five native accordion FAQs; closing CTA. Logic headlines appear only in the criteria, application heading and closing CTA. Reduced motion displays the completed diagram without animation.

## Current delivery: form interface only

The latest owner instruction is to continue without anything related to the backend. No Firebase dependency, configuration, service activation, database, storage rule, email integration or paid-plan change is included. Existing hosting and metadata are retained.

The application card has About you, About the system and Collaboration steps, a labeled progress bar, back/next controls, visible labels, native autocomplete and keyboard focus. Validation runs on blur and step navigation, with error descriptions and focus on the first invalid field. The public page does not supply a submission callback: a valid final submission retains the data and displays the honest unavailable/error state with retry and the existing WhatsApp link.

Files are selected and validated locally: up to three PDF/PNG/JPG files, up to 10 MiB each. Nothing is uploaded. Text fields and the current step are saved only in sessionStorage, with blocked/full-storage handling. File bytes and the honeypot are never saved. Reloading displays a reselect-files note. There is no localStorage use in the form. The honeypot silently cancels submission.

The submitting and success cards are presentation states for a future explicit callback. A success requires a confirmed `ILP-` reference with six alphanumeric characters; no reference or success is invented on the public page. Confirmed success clears the draft. A session-based cooldown and an immediate in-memory submission lock prevent accidental duplicate activation when such a callback is provided. The isolated `form-preview.local` fixture exercises these UI states with local functions and never makes a write request.

The original SVG diagram and orbital workflow remain. Part 3 SEO, native SVG refinements, the OG image, navigation linking and performance verification are now delivered; see `docs/PARTNERS-SEO-REPORT.md`. Backend work remains excluded under the owner's latest instruction.

## TODO(owner)

- Ownership / intellectual property policy.
- Review duration.
- Confidentiality terms.
- Privacy policy page.

The existing policy TODO and `<!-- TODO(owner): privacy policy page -->` remain HTML comments. The consent uses the owner's exact text. The privacy label remains muted text until a real page exists; there is no fake destination or invented legal copy. No fixed percentage, review duration, ownership rule, confidentiality promise, result statistic or fake number is added.

## Files

`src/components/partners/PartnerApplicationForm.jsx` contains the interface, `src/data/partnerForm.js` contains validation and session draft helpers, `src/i18n/partner-form.ar.json` and `.en.json` contain matching copy, and `src/scss/_partner-form.scss` contains the scoped dark theme. The application mounts inside the existing `#apply` section and `#partner-form-container`.

## SEO

Arabic page HTML is prerendered to `dist/partners/index.html`. Metadata, route-specific canonical and language alternates, sitemap entries and five matching FAQ structured-data entries are included. As on the homepage, query-based English is rendered by the existing client language switch; the static initial HTML is Arabic. No new hosting infrastructure or deployment is included.

The final requested titles/descriptions, WebPage, WebSite, BreadcrumbList, FAQ parity, OG/Twitter image and locales are included. Fonts are served locally and unnecessary legacy assets load only on their own routes. The final mobile Lighthouse results are AR 81/100/100 and EN 87/100/100 (performance/accessibility/SEO), with approximately 288.1 KB compressed excluding fonts after scrolling the complete page. Performance remains below the requested 90; the detailed report records LCP, CLS and the limitations without claiming a pass.

## Verification

Production build and prerender pass. Fourteen combined automated tests cover localization, validation, file limits and safe draft persistence. Browser review covers all three form steps at 375, 768 and 1440 pixels in Arabic and English, keyboard completion, offline error behavior, blocked sessionStorage, restored drafts, local files, the silent honeypot, and isolated submitting/success/failure presentation states. Copy uses a local clipboard substitute in the test fixture, without changing the user's system clipboard. No backend write is made during verification.
