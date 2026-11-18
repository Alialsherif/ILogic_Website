# About page film — November 18, 2026

**Current status: rolled back at the owner's request.** All experimental inner-page videos, their components, asset manifests and generated media have been removed. About has its light introduction from before the video experiment. The homepage's original hero video remains intact. Everything below is historical documentation and must not be treated as the current implementation or authorization to restore the experiment.

The owner first requested a moving visual similar to the homepage, then explicitly asked to try the video as a background behind the About heading and introduction. The current experimental version uses the same silent film behind the complete introductory stage, with the Russia-to-Egypt journey below it. The homepage loop is unchanged.

`PageFilm` accepts `background`; this is enabled in `AboutPage.jsx`. It was renamed from `AboutFilm` when the owner requested the same background for Services, Projects, Partners and Contact. Those pages use the shared `InnerHero` wrapper. Removing the prop and returning the component below the introduction restores the standalone presentation. The owner initially described the About placement as a trial.

The owner then found the white overlay washed out the film. It has been replaced by a dark violet gradient (58–60% opacity), with white headings, body copy and navigation plus a white primary button. This retains the footage's color without the milky white layer. Real HTML copy remains directly above the video without a text box, glass layer, text shadow or video filter. The play/pause button stays above the overlay. The descriptive caption remains available to assistive technology; its standalone heading and badge are not shown in background mode.

## Media

The source is the owner's existing `Video Project.webm`. The 48–52.5 second mobile interface shot plays forward, then backward, forming a nine-second loop. It is an illustrative design scene, not evidence of a client project; the localized caption explicitly describes it as illustrative. The source and full-length copies are untouched.

| Asset | Dimensions | Bytes |
| --- | --- | --- |
| `public/videos/about/idea-to-experience-desktop.mp4` | 1440 × 810 | 2,162,073 |
| `public/videos/about/idea-to-experience-mobile.mp4` | 960 × 540 | 949,643 |
| `public/images/about/idea-to-experience-poster.webp` | 1440 × 810 | 37,120 |

Both MP4s are H.264 at 24 fps, with faststart and no audio track. The poster is the source frame at 50 seconds. Generation used local FFmpeg; no external generation service or new dependencies were added. Contact sheets used to select the clip are in `about-video.local/`.

## Behavior

- `src/components/home/PageFilm.jsx` owns playback; `src/data/aboutVideo.json` supplies paths and dimensions. No duplicate video files are needed for the other pages.
- Initial/prerendered markup has a poster and no video source. The appropriate mobile or desktop source is attached only when playback is permitted and at least fifteen percent of the frame is visible.
- Normal motion permits muted inline automatic looping. Reduced motion shows the poster without requesting video data, while the keyboard-accessible play button permits an explicit request.
- Playback pauses offscreen and when the document is hidden. A visitor's pause persists through scrolling and preference changes. A failed autoplay request leaves the poster and manual play available.
- The icon button has a localized label reflecting actual play/pause events, with a minimum 44px target. Native controls and audio are absent.
- In background mode the video covers the introductory stage, whose height follows the copy on phones and has a 660px minimum on desktop. Its cover crop affects presentation only; the media files retain their full 16:9 frames. The unused standalone mode retains its responsive frame sizes.

## Verification

Production build, About/localization source tests (six tests), and targeted ESLint passed. `node homepage-preview.local/audit.mjs about-video-review` passed six cases: Arabic/English at 375/768/1440, covering responsive source/dimensions, nine-second duration, inline muted playback, no reduced-motion download, explicit keyboard play, visitor pause retention, automatic playback, offscreen and visibility-handler pauses, and HTTP 206 range playback. No browser exceptions.

Visual captures are in `homepage-preview.local/about-video-review/`. The full About page audit remains `node homepage-preview.local/audit.mjs about-page-review`.

The background revision also verifies that a single video covers the heading and introduction, the copy has no separate opaque plate, the overlay does not block the pause button, and the visible standalone caption is absent. Arabic captures include loop positions at two, five and eight seconds on desktop and mobile.

The full page audit subsequently passed all six language/viewport cases and all 42 section checks. Firebase Hosting deployment succeeded. The public `/about` response returned HTTP 200 with the film markup and current entry bundle; both MP4 endpoints returned HTTP 200 with the expected content lengths.
