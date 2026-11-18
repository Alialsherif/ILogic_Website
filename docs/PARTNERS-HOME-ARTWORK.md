# Homepage partners illustration

The built-in image_gen tool generated a concept scene showing a developer's software arriving at ILogic and being distributed by ILogic to end users. The black/lime identity and exact ILogic spelling were retained. The image replaces the previous two-node diagram in the homepage partners section. Existing text, section anchors and application link remain intact. Desktop columns now allocate 7/12 to text and 5/12 to the artwork; mobile stacks them.

## Saved files

- Generated PNG: `output/imagegen/partners-system-to-users.png` (1536×1024).
- Consumed WebP: `public/images/home/partners-system-to-users.webp` (1600×1067, 38,794 bytes).
- Original generated source: `C:/Users/Smart Zone/.codex/generated_images/01a1d99f-4687-7ee1-82cf-3ae07c39ff85/exec-0631214d-ffb0-44bb-86c6-e05feaabb1f1.png`.
- FFmpeg resized/encoded the generated art; no other images were changed.
- Asset registered in `scripts/prepare-home-assets.mjs`, displayed in `Homepage.jsx`, with Arabic and English alt descriptions of the partnership flow. Explicit dimensions reserve layout space and the image loads lazily.
- This image illustrates the partnership concept; no client metrics, prices, ownership or confidentiality terms were added.

## Verification

Production build/prerender, all eight homepage tests and targeted ESLint passed. Browser checks at 375, 768 and 1440px in Arabic and English verified the image loads with localized alt text and explicit dimensions, the existing copy and application destination remain correct, and no image/copy overlap or horizontal overflow occurs. Desktop/mobile captures were inspected. Artifacts: `homepage-preview.local/partners-artwork-review/`.

## Final prompt

Use case: product-mockup. Asset type: homepage partners-program illustration for ILogic, a premium software company. Primary request: make it immediately clear that a developer hands their software system to ILogic, and ILogic actively takes it to end users. A single coherent cinematic photorealistic 3D scene, landscape 3:2, on a near-black studio backdrop that blends into #101010. Composition follows a clean RIGHT-TO-LEFT journey: on the right, a small elegant dark software module on a low pedestal with a simple { } code symbol and miniature abstract interface; in the center, a larger authoritative matte-black ILogic distribution hub, receiving that software tile and presenting it toward users; on the left, three tasteful glass customer cards with anonymous head-and-shoulder outline icons and small software screen tiles, connected individually to the central ILogic hub. One thin continuous lime path with subtle arrowheads connects developer's software on the right into ILogic in the center, then branches FROM ILogic TO the three customers on the left. The central hub visibly holds the same software module and redistributes it: the brand is the active bridge, not just another isolated logo. Text (verbatim): 'ILogic' on the front face of the central hub ONLY, bold clean geometric sans, initial capital I in lime #ccff00, 'Logic' in white, correct capitalization and spelling, absolutely do not write ILOGIK or any other words. Keep this wordmark flat, crisp and clearly readable. Materials: charcoal anodized metal, smoked glass, restrained lime inset accents, black ceramic pedestals, soft controlled studio highlights, tactile edges and calm realistic shadows. Premium restrained ILogic identity: black #101010, dark olive, white and lime #ccff00, no additional saturated colors. Large simple forms readable on mobile, uncluttered, generous breathing room around all subjects. No people or photographed faces, no handshake, no robot, no rocket, no brain, no coins, no charts, no numerical metrics, no prices, no fake client logos, no extra text or watermark, no excessive neon glow, no background props, no cropped hardware. This is a concept visualization of a partnership workflow, not a screenshot of an existing application.

