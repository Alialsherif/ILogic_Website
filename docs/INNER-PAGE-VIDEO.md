# Shared video introductions

**Current status: rolled back at the owner's explicit request.** Services, Projects, Partners and Contact have been restored from the saved versions before video backgrounds were added. Their original light introductions and original positions of the Services/Partners diagrams are restored. Experimental components, styling, manifests and generated footage were removed. The remainder of this document is historical; it does not describe the current site.

The owner requested video backgrounds on the inner pages, then rejected using the same film everywhere. Services, Projects, Partners and Contact now have distinct footage and posters selected through `src/data/innerHeroVideos.json`. The homepage keeps its original quiet laptop loop; About keeps its own lavender mobile interface film.

| Page | Current visual | Source | Duration | Desktop / mobile bytes |
| --- | --- | --- | --- | --- |
| Services | Blue interface and desktop presentation | Owner's video, 30–33 seconds, forward and reverse | 6 seconds | 728,875 / 300,514 |
| Projects | Slow movement and crossfades through actual client websites | Existing approved ZavodSZ, Fopac and Gostinets screenshots | 11 seconds | 1,576,894 / 611,452 |
| Partners | Mint particles gathering into a shape on dark charcoal | Owner's video, 83–85.5 seconds, cropped to the abstract graphic, inverted, lightened and tinted mint, forward and reverse | 5 seconds | 2,442,085 / 1,140,435 |
| Contact | Quiet dark blue data scene | Owner's video, 74.1–77.1 seconds, forward and reverse | 6 seconds | 482,353 / 185,011 |

All videos are silent H.264 at 24 fps with faststart, 1440×810 on desktop and 960×540 on mobile. Their WebP posters are real frames at two seconds. Files are in `public/videos/inner` and `public/images/inner`. The Projects film uses three four-second shots with a small gradual zoom, half-second crossfades and matching dark fades at the loop boundary. The other scenes remain explicitly illustrative; they do not identify client work.

## Implementation

- `src/components/home/PageFilm.jsx`: playback component with an `asset` prop and About defaults. It retains responsive sources, a static poster, explicit keyboard play/pause, reduced-motion handling, visitor pause retention, and offscreen/tab pauses. Changing the media clears the old source before the new clip may load.
- `src/components/home/InnerHero.jsx`: common introductory stage with the decorative film and a real HTML content container.
- `src/scss/_inner-hero.scss`: scoped treatment for the four introductions, imported after their individual styles. White copy and primary buttons, a transparent outlined secondary button, and white keyboard focus indicators. Overlay color and strength adapt to each film; darker Contact and Partners footage needs less masking. No white wash, CSS video filter, text box or text shadow.
- Each page requests only its selected responsive source when playback is allowed. The other pages' films are not prefetched.

The Services logic diagram and Partners market diagram remain within their original introductory sections, in a light area immediately below the video stage. This prevents the tall mobile diagrams from extending the video behind the entire section. The Projects gallery and Contact form start below their video introductions with appropriate spacing.

No business copy, claims, project filters, project identities, contact destinations, form behavior, partnership terms, route metadata or section counts were changed. The hidden Projects film caption now names its three actual websites; other films retain an illustrative caption. The Projects audit counts illustrative project captions inside project media, separately from the hidden decorative film caption.

## Verification

- Production build and targeted ESLint passed.
- All 28 source tests across Home, About, Services, Projects, Partners, partner form, Contact and localization passed.
- `node homepage-preview.local/audit.mjs inner-heroes-review`: all 24 responsive video and accessibility cases passed for the four pages in Arabic/English at 375/768/1440. Captures are in `homepage-preview.local/inner-heroes-review/`.
- The current audit verifies the correct page-specific poster, source and duration, and distinct file paths and SHA-256 content for the films and posters. The revised Partners crop and color treatment is checked separately with `node homepage-preview.local/audit.mjs inner-heroes-review /partners`.
- `node homepage-preview.local/audit.mjs inner-pages-review`: all four existing page suites passed, covering galleries, service disclosures, partner copy, contact preparation, navigation and metadata. WhatsApp checks intercept the window open action and do not send messages. No browser exceptions were reported.

The offscreen check scrolls beyond the video frame itself. Section anchor scroll margins can intentionally leave a strip of the previous section in the viewport, which is not a fully offscreen condition.

Firebase Hosting deployment succeeded. All four public routes returned HTTP 200 with `page-video-stage` and the current entry bundle.
