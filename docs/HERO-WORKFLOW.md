# Hero: rotating service stories

The owner rejected the website-screenshot → loyalty-points sequence because it did not show a causal relationship. The hero now introduces ILogic through three rotating, explicitly illustrative service stories. The first preserves the approved automation story:

1. Customer requests, customer details and follow-up are scattered across messages/files and require manual reminders.
2. Those same tasks straighten and move into one workspace, illustrating how we connect the work.
3. Their descriptions change to centralized requests, connected data and automatic follow-up reminders.
4. The system handles details while the owner focuses on work that needs their attention.

Arabic outcome, using the owner's final wording: «نوفر وقتك بالمنطق الرقمي — وقتك أهم لنمو عملك وزيادة دخلك». The headline says «وقت أوفر. فرص أكثر للمكسب.» and the system includes a progressive logic → time → growth strip with matching line icons. The explanation explicitly connects adding logic to time saved and investing that time in business growth and income opportunities. English conveys the same relationship. There are no time-saved figures, invented performance claims, customer identities, payment events, loyalty points or unrelated company screenshots in this story. The caption explicitly labels it as an illustrative workflow. The link to real work remains #works, separate from the demonstration.

The second story explains Google presence: a customer searches for a service, sees another business and cannot find yours, then sees your website with clear services/contact information. The actual requested line «لو ملقكش، هيكلم غيرك» appears during the problem stage. The result is easier discovery and contact, not a numerical ranking promise. All businesses and query text are generic illustrative labels, without ratings, real URLs or invented customer data.

The third story explains an online store: a small product catalog, one selected product, then an organized order with product/customer information and a product → order → follow-up strip. Only the chosen product gets a check. No prices, order counts, payment events or real transactions are simulated.

## Scope

HeroVisual.jsx manages the shared story clock. HeroStoryScenes.jsx supplies the three code-built illustrations; src/data/heroStories.js defines their order and interval. All flow labels and copy are localized in both homepage JSON files. The main approved eyebrow, H1, paragraph, buttons, enlarged/lowered badge and previously approved desktop arrangement remain intact.

The black/lime photograph remains the existing generated background, not a new image. Previously captured project screenshots remain on disk as supplied-work assets but the hero no longer requests or displays them. Its only image request is the existing background. Open Graph artwork is recaptured from the new final frame, replacing the obsolete loyalty/screenshot graphic at the same og-home.webp URL. The tool does not connect to a backend or simulate successful submissions.

## Motion and access

Each story reaches its stages at 0.8, 2.2, 3.7 and 5.5 seconds, holds until ten seconds, then automatically advances automation → Google → store → automation. Three native buttons below the card allow direct selection and reset the selected story's clock. The separate pause control stops rotation and the active clock; hidden tabs and offscreen heroes also pause. Full-hero re-entry replays the currently selected story. Reduced motion shows a static final frame and disables automatic rotation while leaving all three selection buttons usable. The background image stays mounted across story changes. Fine-pointer parallax is limited to six pixels and has no effect for coarse pointers. The active story description is available outside the aria-hidden illustration; it is announced politely only while not autoplaying. The works link, selectors and pause button stay keyboard-accessible. No hover-pause was added.

The card has explicit inline width and a readable minimum height. Its aspect ratio does not force a wider-than-container card on phones. The final row, task details and footer reserve separate space; the growth-focused final copy has a taller reserved outcome region and bounded desktop type size. English compact-phone copy uses short labels so the same structure fits both directions.

## Verification

Build/prerender and targeted ESLint pass. Homepage tests now require the system workspace/outcome and the three automated tasks in AR/EN server markup, and prohibit the former phone and project screenshot references within the hero. The full homepage and locale tests pass.

The prior single-story regression remains in homepage-preview.local/hero-workflow-confirm/. The current service-story audit is homepage-preview.local/hero-services-confirm/: all three final frames at 320, 375, 768, 1280, 1440 and 1920px in both locales, short 1280×720 checks, an actual full automatic loop, explicit pause, real hidden-tab pause, keyboard and native-touch selection, and reduced-motion manual selection. It checks visible scene isolation, text/illustration containment and workspace/outcome/footer separation. Invisible introductory outcome frames are excluded from overlap checks. Hero content is compared with the approved baseline. New OG artwork is captured from the final card and copied into the production output.

No new Lighthouse measurement was requested for this change. The 5.800-second LCP in the prior hero report belongs to the discarded late-screenshot version and is not a measurement of this implementation. No new performance score is claimed.
