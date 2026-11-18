# Homepage hero: an idea becomes real work

> Historical implementation, superseded by the owner's workflow-focused direction. The current story, scope and verification are documented in [HERO-WORKFLOW.md](HERO-WORKFLOW.md). The screenshot/loyalty behavior and performance measurements below refer to the discarded version.

Only the hero visual and its loading/metadata support were rebuilt. The owner additionally approved redistributing the hero on desktop to fit the viewport. Approved eyebrow, H1, paragraph, button markup and badge artwork remain unchanged; their exact HTML was compared with the previous browser capture. Other homepage sections were compared verbatim, allowing only the explicitly requested removal of the pending-image wording from shared placeholders.

## Story and layout

The photo-backed glass card progresses through the four existing localized steps. The browser reveals a dashed geometric wireframe, then a user-path diagram with nodes 1, 2, 3, then the real project screenshot. The illustrative loyalty phone enters during the final step. The story holds, alternating the two projects every five seconds after the six-second introduction. Re-entry after the entire hero leaves the viewport replays the story. A separate pause control stops ongoing motion. Hidden tabs and offscreen heroes pause the active clock and CSS animations. Reduced motion shows the static final frame with the first project and no transitions, zoom, drift or parallax.

The background zoom is 1→1.06 over twenty seconds. Fine-pointer parallax is bounded to ten pixels, with smaller offsets for phone/chips; coarse pointers do not activate it. The completed frame has bounded floating motion. Temporary will-change is limited to the introduction. All step names also exist in a screen-reader list; the animated representations are decorative, while the works anchor and pause button remain accessible.

Desktop uses a two-column hero with a portrait card and a shorter-height variant at 1280×720. Tablet stacks the card beneath the copy at 4:3. Phones use an approximately square card. Compact cards show dots/checks and the active label instead of forcing all four long labels into a row. Dots avoid introducing an extra digit 4, respecting the brief's restriction to the path numerals 1, 2, 3. RTL/LTR mirror the overlap, tilt and entry direction. The badge keeps its original rotating artwork at a smaller desktop size so the new composition fits.

## Assets and provenance

All hero assets are present; no missing URL is requested. Presence is checked by scripts/prepare-home-assets.mjs and recorded in src/data/heroAssets.json. Missing screenshots fall back to an unlabeled code-built skeleton, without fabricated project names.

| File under public/images/home/ | Dimensions | Bytes at creation |
| --- | --- | ---: |
| hero/hero-background.webp | 1200×1500 | 83,504 |
| hero/fopac-screenshot.webp | 1600×1000 | 122,246 |
| hero/zavodsz-screenshot.webp | 1600×1000 | 138,746 |
| og-home.webp | 1200×630 | about 23,000 |

The photograph was generated with the built-in image generation tool and normalized to WebP. Final prompt:

> Generate a photorealistic background asset for a premium black and lime software-agency website. Dark cinematic workspace at night seen from slightly above: a matte-black desk with a closed laptop, a plain notebook with no visible writing, a small green plant and a ceramic cup, a lime LED light strip under the desk edge casting a soft glow on the surface, deep shadows, shallow depth of field, premium and calm, subject in the lower and outer edges because glass layers cover the center. No people, no hands, no faces, no readable text, no logos, no brand names. Portrait 4:5 composition. This is a background photograph only, no UI or overlays.

Original generated source: C:/Users/Smart Zone/.codex/generated_images/01a1d99f-4687-7ee1-82cf-3ae07c39ff85/exec-594116a5-ff28-4047-8523-e8644aef941c.png. The project consumes the workspace WebP, never the external original path.

The two screenshot files were absent initially. Instead of regenerating the supplied references, Chrome captured the actual sites https://fopac.ru/ and https://www.zavodsz.ru/ at 1600×1000. These captures were compressed to WebP without generative edits or changes to their layout, wording or colors. The current live render differs from the owner's reference pictures; in particular, the Fopac capture has a light area where the reference has a product photograph. This was not painted in or invented. Embedded names, phone numbers, numerical claims and logos belong to the original websites; they are not ILogic claims or new invented figures. Neither chosen screenshot contains a person or face.

The background is explicitly sized, decorative, high-priority and preloaded. Screenshot requests start at idle after the background loads. Only the background receives high fetch priority. The generated OG image comes from a real headless screenshot of the final hero card, contained on a 1200×630 dark canvas, with no fabricated UI added. Runtime and prerender metadata use it for Open Graph/Twitter. The homepage preload is removed from the partners prerender.

## Measurements and checks

Lighthouse mobile, localhost production build, Arabic, simulated throttling:

| Measurement | Before | After |
| --- | ---: | ---: |
| LCP | 1.675 s | 5.800 s |
| CLS | 0.000944 | 0.003947 |

These are single local lab runs, not field data. LCP worsened because the real screenshot becomes a later paint candidate during the deliberately delayed story. The background itself is preloaded, but the requested three-second reveal and screenshot loading sequence remain. No improvement is claimed. Changes to the story timing to improve this measurement were not silently made. The after measurement precedes the final compact-chip/phone-only spacing refinement; it was not rerun just to seek a different score.

Build/prerender and all eighteen homepage/localization/partners tests passed. Tests verify the removed pending text and the four localized step names in server HTML. Targeted ESLint passed for changed React files. Full repository lint still reports the existing 89 errors and 3 warnings in bundled Font Awesome scripts and unchanged Team.jsx; unrelated sources were not rewritten.

Browser evidence is in homepage-preview.local/hero-review/, hero-confirm/ and hero-layout-final/. Arabic/English checks cover 375, 768, 1440 and 1920px, with 1280px and short 1440×900/1280×720 checks added for the compact desktop layout. Assertions include a single H1, valid loaded assets, no document or phone overflow, no phone/text collision, and approved-content/other-section preservation. The actual timed sequence reached phases 0/1/2/3/4 at the expected milestones; after eleven seconds the project changed to ZavodSZ. Pointer parallax, user pause, real hidden-tab pause, offscreen pause, re-entry replay and reduced-motion static state passed without runtime exceptions.

No people, faces, invented claims, fabricated prices, ratings or result metrics were added. No backend, deployment, or changes to other section designs were included. The old pending-image label is absent from both translations and from the prerendered homepage. No unresolved hero asset was guessed; the only interpretation was retaining real live-site renders rather than reconstructing the owner's older screenshots.
