# Sector card: cinematic photographs with glass UI

The latest revision changes only the large sector card and the code needed to load its backgrounds. The surrounding header, sector list, chips, navigation, WhatsApp behavior, translated text and per-sector landing mock-up markup are unchanged from the completed search/landing revision.

## Photograph recovery

The workspace is not a Git repository: git log returned “not a git repository”, so no Git history was available. All twelve usable earlier no-people photographs were found in sectors-preview.local/v1 and restored byte-for-byte to public/images/home/sectors/. SHA-256 checks verify the restored assets against those backups. No new image generation or stock photography was needed; no sector lacks a photograph. The people/before-and-after images were not restored.

| Restored file | Bytes |
| --- | ---: |
| sector-clinics.webp | 71,130 |
| sector-beauty.webp | 102,026 |
| sector-dental.webp | 71,836 |
| sector-medical-centers.webp | 107,832 |
| sector-restaurants.webp | 97,496 |
| sector-real-estate.webp | 100,890 |
| sector-education.webp | 83,548 |
| sector-industrial.webp | 83,530 |
| sector-retail.webp | 57,892 |
| sector-professional-services.webp | 82,316 |
| sector-hospitality.webp | 98,920 |
| sector-fitness.webp | 99,572 |

All files are 1000×1250 WebP, under 110KB, stored under public/images/home/sectors/. They are decorative (empty alt, aria-hidden), lazy/async, with explicit dimensions. Only the active and next image load initially; next is preloaded when idle and in view. The existing next-sector search pill remains code-built and unchanged. Previously visited images can stay cached as the carousel advances.

## Visual treatment

- Full-bleed photographs with a 1.00→1.06 transform zoom over seven seconds and a 600ms crossfade between sectors.
- A scrim is about 55% dark at the top, 10% in the middle and 70% at the bottom, keeping the subject visible in the middle band.
- The search pill uses translucent dark glass, blur(14px), a 45% lime border and restrained glow. Its opacity was raised from the approximate reference to 64% to guarantee text contrast even over a theoretical pure-white photograph.
- Compact glass results are 88px tall on larger screens and 80px on phones. The ad tag has its own dark backplate; organic labeling remains illustrative.
- The landing browser is 88% of the card width and 38% of its height, anchored 16px from the bottom, with a 176px minimum height on phones. It uses a rich translucent gradient, thin lime border, soft offset lime-tinted shadow, a four-degree perspective tilt and better-distributed inner content.
- The portrait retains its 4:5 ratio with a 440px minimum height on phones. Radius, sector index and “تصوّر توضيحي” / “Illustrative mock-up” caption remain unchanged.

No real URLs, logos, ratings, prices, statistics, sector claims or names were added. The only mock-up numerals remain the previously specified dental steps, and the true sector index remains outside the mock-up. Photographs contain no people, faces or readable branding.

## Contrast

All twelve photographs were checked across the six viewport/locale combinations (72 sector/card states). The calculation uses pure white behind the glass as a conservative worst case, which is brighter than any of these photographs and does not take credit for the scrim:

- Search text: at least 5.30:1.
- Landing headline: at least 8.42:1 against the lighter gradient bound.
- Ad-tag text at the fully visible 65% ad state: at least 4.72:1.
- Organic tag and CTA use dark text on the solid lime accent.

Blur is a visual treatment; the alpha/background choices provide contrast without depending on blur support. Intermediate fade frames are transitions; the figures above apply to visible text states. Clear gaps remain between the raised organic result and the landing card, exposing the photograph.

## Motion

The seven-second timing now follows the requested cinematic sequence: photo alone for 0–0.6s; glass field/typing from 0.6–2s; results from 2–2.8s; ad removal from 2.8–3.8s; organic lift/outline from 3.8–4.5s; cursor click/landing rise from 4.5–5.5s; then hold and one CTA pulse until 7s. Full search phrases remain DOM text.

Pausing shows the final frame, preserving the existing carousel timer behavior. Reduced motion is static, with no zoom, cursor, transitions or autoplay. Hovering no longer pauses playback. Keyboard interaction pauses the carousel while focus remains inside; a pointer click returns it to pointer mode. Explicit pause, visibility, viewport and reduced-motion guards still apply. No animation library was added.

## Page weight

Measured with Chrome at 1440px in Arabic, a cleared browser cache, the same scroll to the sector card, and a 2.2-second settle:

| Encoded response payload | Before photographs | After photographs | Change |
| --- | ---: | ---: | ---: |
| All loaded responses including fonts | 1,016,715 B | 1,190,483 B | +173,768 B |
| Excluding fonts | 720,615 B | 894,383 B | +173,768 B |
| Requests | 35 | 37 | +2 |

The two initial photographs account for 173,156 B; the remainder of the measured change is 612 B. The entire twelve-photo set is 1,056,988 B and loads progressively, not upfront. Measurement artifacts are in homepage-preview.local/sectors-glass-weight-before/weight.json and sectors-glass-weight-after/weight.json.

## Verification

- Build and prerender passed. All twelve names and Arabic searches remain actual text in dist/index.html.
- All 18 locale/homepage/partners tests passed, including full AR/EN homepage rendering without raw keys, finite-key coverage and decorative asset checks.
- Targeted ESLint on changed JS passed. Full lint still reports the existing 89 errors and 3 warnings in bundled Font Awesome scripts and unchanged Team.jsx; unrelated files were not repaired.
- Six viewport/locale cases at 375/768/1440 passed, including 72 sector/photo/mock-up checks, image dimensions and attributes, text contrast, overflow, index clearance, next-sector pill, keyboard and WhatsApp links.
- Eighteen overlap checks passed at 1440×900, 1280×720 and 1920×1080 in both locales, including section-bottom alignment. No floating WhatsApp/control collision was found.
- Timeline samples include the photo-only moment, glass entrance, result swap, cursor/landing reveal and final hold; photo zoom, a real seven-second rotation and reduced-motion final states passed.
- The card-only scope check compares every other section verbatim and strips just the large figure from the audience section for comparison. It confirms no changes to the list, chips, header block, controls or other page content. Translation files and landing mock-up markup retain their prior hashes.

The six-case/contrast report is homepage-preview.local/sectors-glass-review/report.json; the separate motion report is sectors-glass-motion/report.json. No unresolved photo requirement or source text was guessed. The only recovery limitation was absent Git history; the verified local originals supplied every background.

## Pointer interaction correction

The section-wide pointer-enter pause prevented viewers from seeing the automatic search sequence while their mouse was over the section. That pause was removed. Explicit document-level input modality tracking distinguishes keyboard focus from mouse-click focus, including when the browser restores focus after switching tabs. Modifier-only keys do not change modality, and the listeners are cleaned up on unmount. Copy, photography, layout and timing are unchanged.

Build/prerender, all eight homepage tests and targeted ESLint passed. The native browser regression passed at 375, 768 and 1440px in Arabic and English: a stationary pointer over the card allows its search animation to progress; hovering the intro/list, clicking sector chips, Next and Pause/Play works; two actual seven-second cycles advance with the mouse still inside the website. Keyboard pause/arrows/exit, switching back to pointer input, hidden-tab pause/return, offscreen pause/resume and reduced motion also passed. No runtime exceptions were recorded. Evidence: homepage-preview.local/sectors-pointer-review/report.json.

## Compact-screen window spacing

The original proportional portrait and browser heights allowed the result and landing windows to overlap on narrow effective viewports. At 280px, the medical-center result overlapped the browser by about 37px and department rows overlapped its CTA. At 320px the outer overlap was about 6px. A nested text span also picked up the template's larger global span font, clipping long English searches.

Below 768px, the portrait now reserves at least 440px, the landing browser at least 176px, and search top padding is 70px to separate its entrance from the index. The query text inherits the intended search font. All changes are scoped to the mobile media query; photo treatment, copy, seven-second timing and desktop rules are unchanged.

Build/prerender passed. Native browser checks passed at 280, 320, 360, 375, 768 and 1440px in both locales: 144 sector final states, 132 opacity-aware timeline samples, and user-paused final states. Text ranges, visible window pairs, content descendants against the CTA and photograph containment were checked, with zero violations or runtime exceptions. The narrow medical card now has about 28px between result and browser and 7px between content and CTA. Native pointer/Next interactions still allow autoplay. Baseline and corrected evidence: homepage-preview.local/sectors-compact-before/ and homepage-preview.local/sectors-compact-review/.

## Identifying the client's website

The organic result now displays “موقعك في نتائج البحث” / “Your website in search” instead of an abstract title bar. The browser preview repeats “موقعك” / “Your website” in its chrome, making the search-to-website relationship explicit without a fabricated domain or ranking promise. Both labels use the existing translator. Build/prerender, all eight homepage tests and targeted ESLint passed. The compact browser regression above also passed with extra result-title, description and preview-label containment checks.

