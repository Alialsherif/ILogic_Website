# Supplied hero video and square footer

The homepage uses the quiet opening laptop shot from the owner's `Video Project.webm` as a decorative background behind the hero heading, copy and calls to action. A light gradient supports the white text. There is no text box, glass card or separate foreground player. The montage sections with large embedded typography are excluded from the background so they do not compete with the hero copy.

## Media

The original file remains untouched at the workspace root. Although its filename ends in `.webm`, its actual container is MP4 with H.264 video and AAC audio. It is 246,357,690 bytes and 122.9 seconds long.

The full-length copies remain available and untouched:

| Asset | Resolution | Bytes |
| --- | --- | --- |
| `public/videos/home/hero-project-desktop.mp4` | 1600 × 900 | 26,527,906 |
| `public/videos/home/hero-project-mobile.mp4` | 960 × 540 | 12,018,947 |
| `public/images/home/hero/video-project-poster.webp` | 1600 × 900 | 50,788 |

MP4 outputs use H.264, AAC and faststart. Neither output trims or crops the supplied content. The poster is an actual frame from the supplied video.

The active hero background has separate silent derivatives. The opening shot from 0.25s through 4.25s plays forward then backward, producing an 8-second continuous loop without the cuts to bright websites or large lettering. This does not alter the original file or full-length copies.

| Active background asset | Resolution | Bytes |
| --- | --- | --- |
| `public/videos/home/hero-background-desktop-loop.mp4` | 1600 × 900 | 1,985,070 |
| `public/videos/home/hero-background-mobile-loop.mp4` | 960 × 540 | 666,342 |
| `public/images/home/hero/hero-background-loop-poster.webp` | 1600 × 900 | 18,980 |

## Implementation

- `src/components/home/HeroVideo.jsx`: background mode, no native control bar or corner button, inline muted playback, viewport/tab pause, retained external/manual pause and reduced-motion handling. The original foreground variant remains available as the default prop value.
- `src/data/heroVideo.json`: the two source URLs, poster and dimensions.
- `src/components/home/Homepage.jsx`: imports the new visual.
- `src/scss/_atelier.scss`: covering video layer, dark contrast overlay, foreground text/button colors, and zero outer footer radius in both desktop and mobile rules.
- `index.html` and `scripts/write-home-seo.mjs`: preload the new poster on the homepage only.
- `src/i18n/homepage.ar.json` and `.en.json`: neutral localized video label/caption; no claim that the illustrative projects are ILogic client work.

The poster is preloaded and appears immediately. In background mode, playback starts after the first paint while the hero is in view; it does not require scrolling. `preload="none"` avoids a separate eager download before play is requested. The video remains muted and loops; both the native bar and corner button are removed. Without JavaScript or with reduced motion the poster remains visible and playback is not requested. Mobile visitors select the smaller source before loading video data.

The background is `aria-hidden` and uses `object-fit: cover`: the media files retain their full frames, while their visible framing adapts to the hero dimensions. Heading, paragraph, buttons and social links remain real HTML above the media and gradient. No content is burned into the video or duplicated below it.

## Video brightness and text legibility

The user rejected both heavy global darkening and a glass box behind the copy. Both are removed. The current background uses only the quiet dark laptop shot, with a 42–48% gradient and white copy directly above it. Mobile framing favors the quieter left side of the shot. No backdrop blur, text shadow or duplicate stroke is added to the hero message. The mobile navbar keeps its own independent glass style.

The hero overlay explicitly sets `display:block`: a legacy `.home-hero::before { display:none }` rule previously disabled it. The browser check verifies the overlay is actually rendered, its stacking order, absence of the rejected message box, and that the gradient does not return to heavy opacity. `hero-contrast-review` inspects the active 8-second loop at 1s, 3s, 5s and 7s on desktop and mobile. No contrast guarantee for arbitrary full-montage frames is claimed; those frames are no longer used as the background.

## Verification

- Production build and all 21 source/localization/form tests pass; targeted ESLint passes.
- Six browser cases: Arabic/English at 375, 768 and 1440px.
- Correct source selection, covering dimensions, absence of the native bar and corner button, automatic playback, offscreen pause and reduced-motion behavior pass.
- No initial video request with reduced motion, no old workflow graphic and no horizontal overflow.
- Footer corners checked at all sizes and additionally on About, Partners and Contact.
- Local media test verifies HTTP 206 range playback.

Current loop captures and results: `homepage-preview.local/hero-contrast-review/`, generated by `node homepage-preview.local/audit.mjs hero-contrast-review`. The older background and foreground captures remain for history and do not represent the active design.
