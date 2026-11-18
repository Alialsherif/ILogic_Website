# Scroll rendering and button fixes

The browser wheel was already native: equal wheel deltas reached the expected offsets and no programmatic scroll calls were made during the wheel test. The perceived speed changes coincided with rendering stalls.

Changes:
- Marquees pause outside the viewport and in hidden tabs, while preserving user pause and reduced-motion behavior.
- Full-section gradient backgrounds stay static. Desktop parallax remains on small media frames.
- `will-change` is limited to entering reveal elements and visible parallax media, allowing the browser to prepare their transform/opacity layers. Completed reveals release their hint.
- Route changes without a hash reset instantly, avoiding an animated sweep to the top. Explicit section/hash navigation retains its smooth behavior and reduced-motion handling.
- Removed the template's white button wipe and forced hover text color. Contextual light buttons retain dark text and stroke arrows, including the About partners spotlight and Services security button.
- Removed the portfolio filters. All six projects are displayed together.

Before/after audit: `homepage-preview.local/scroll-health-before/report.json` and `scroll-health-after/report.json`. Headless Chrome, CPU throttled 4x, identical wheel input, normal-motion preference. These are local scroll measurements, not Lighthouse scores or a promise about every device.

| Page | Width | Long-task total before / after | 95th percentile frame interval before / after |
|---|---:|---:|---:|
| Home | 1440 | 4981 / 175 ms | 166.6 / 33.3 ms |
| Home | 375 | 6012 / 183 ms | 216.6 / 33.3 ms |
| About | 1440 | 3589 / 0 ms | 133.4 / 33.4 ms |
| Projects | 1440 | 626 / 62 ms | 66.7 / 16.8 ms |

Measured scroll CLS after the changes was zero in these cases. No wheel or touch event interception, scroll multiplier, smoothing library, backend or content rewrite was introduced.
