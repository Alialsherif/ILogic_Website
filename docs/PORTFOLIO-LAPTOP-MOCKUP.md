# Portfolio laptop mockup

The four actual website projects (ZavodSZ, Fopac, Gostinets and Al Sherif) now appear inside the same generated matte-black laptop with a restrained lime accent. Existing screenshot assets are displayed intact through HTML/CSS; no website text, logos, products, or customer results were regenerated. Loyalty and analytics illustrations retain their existing presentation.

## Assets and implementation

- Built-in image_gen generation; no CLI/API fallback.
- Original generated PNG copied to `output/imagegen/portfolio-laptop-frame.png` (1536×1024).
- WebP consumed by the site: `public/images/home/portfolio-laptop-frame.webp` (1536×1024, 73,622 bytes; transparent alpha retained).
- Generated source: `C:/Users/Smart Zone/.codex/generated_images/01a1d99f-4687-7ee1-82cf-3ae07c39ff85/exec-98909004-4593-437d-ab73-f6eaf46bc1cb.png`.
- Shared asset preparation: `scripts/prepare-home-assets.mjs`; rendering: `src/components/home/Homepage.jsx`; styling: `src/scss/_identity.scss`.
- Display aperture measured at x=160, y=109, width=1216, height=760 within the 1536×1024 frame. Physical coordinates keep the frame aligned in RTL and LTR. Screen captures preserve their original 16:10 ratio and localized alt text. Frame image is decorative, with empty alt and aria-hidden.
- Explicit dimensions/aspect ratio reserve space; both images load lazily. One shared frame is cached across all four projects.

## Final generation prompt

Use case: product-mockup. Asset type: reusable premium laptop frame for an ILogic website portfolio. Generate ONE photorealistic matte charcoal-black open laptop, viewed perfectly straight-on from the front, with absolutely no horizontal perspective skew: the screen plane is a true flat rectangle, its upper/lower edges horizontal and left/right edges vertical. Landscape composition 3:2. The entire laptop and its thin base are visible, centered with generous transparent padding. Large display with a 16:10 inner screen ratio; very thin dark bezels, subtly rounded outer corners, blank uniform near-black display, no reflections or graphics on the screen because real website screenshots will be overlaid programmatically later. Refined black anodized aluminum, understated studio highlights sufficient to show the silhouette against a dark webpage. Slim keyboard base visible below the display with a little depth, small centered trackpad, subtle restrained lime #ccff00 edge accent on the outer base only. No decorative floating elements, no people, no desk, no background, no logos, no brand names, no readable text, no UI, no fake screen contents, no neon glow. Transparent background with clean alpha. Keep the blank rectangular display unobstructed and sharply defined so actual website screenshots can be displayed on top without distortion.

## Verification

The browser audit stage is `node homepage-preview.local/audit.mjs works-laptop-review`. Artifacts are written to `homepage-preview.local/works-laptop-review/`.

Passed production build/prerender, all eight homepage tests and targeted ESLint. Chrome checked all six projects at 375, 768 and 1440px in Arabic and English (36 selections). The four website screens load inside the laptop display at the correct ratio, preserve their localized alt text and working links, and have no overflow or image/copy collision. Keyboard selection passed. Desktop and phone captures were inspected visually.

## Al Sherif supplied video

The owner subsequently supplied `laptop_transparent.webm` in the workspace root and requested using it instead of the Al Sherif still image. It is copied unchanged to `public/videos/home/laptop_transparent.webm` (6,768,811 bytes, 2880×1912, VP9 with alpha and an audio track, 11.826 seconds). SHA-256 of both copies: `4968B6089DFB527C55AFF3EDED57F0D6BD6FC20112423D16B1AFFC673C7AC60F`. The video already includes the laptop and real website, so it is rendered directly without another laptop frame.

A transparent static poster was extracted at one second with FFmpeg's libvpx-vp9 decoder: `public/images/home/alsherif-laptop-poster.webp` (1440×956, 81,276 bytes). `PortfolioVideo.jsx` reserves the original aspect ratio, uses the existing localized image description as its accessible label, and provides a localized 44px keyboard-accessible play/pause button. Playback is muted, inline and looped; preload is none. Intersection/visibility observers pause hidden or offscreen playback. Reduced-motion users see the static poster and can start playback explicitly. Manual pause persists. Other projects retain their existing presentation.

Build/prerender, all eight homepage tests and targeted ESLint passed. `works-video-review` verified 375/768/1440px in Arabic and English: actual advancing playback, muted/loop/inline settings, transparent decoded video pixels, no hidden initial video request, reduced-motion behavior, keyboard start, manual pause, pause on project change or scroll, resume when visible, and no overflow or collision. Browser exceptions: none. Artifacts: `homepage-preview.local/works-video-review/`.

