# Compact homepage portfolio

The owner requested a smaller «من أعمالنا» section and a suitable generated image. The original layout stacked a full-width visual above the explanation, so the first desktop project section measured roughly 1,508px high. It now uses the same black/lime identity and decorative rails, with a smaller heading, reduced padding and image/copy columns on desktop. Tablet and phone layouts stack cleanly; phone project selectors use two columns with usable touch targets. Project descriptions and destinations are preserved.

The generated loyalty illustration is the initially selected project so the requested artwork is visible on arrival. All other projects remain selectable. Its existing «تصوّر توضيحي للنظام» caption remains visible; it is not presented as a screenshot of a real application.

## Assets

- Generated with the built-in image tool: public/images/home/loyalty-system-self-service-coffee.webp, 1600×1067, 114,346 bytes. The original PNG is C:/Users/Smart Zone/.codex/generated_images/01a1d99f-4687-7ee1-82cf-3ae07c39ff85/exec-877ec924-18f0-4444-b335-644af977973e.png. Browser canvas was used only for resizing/compression, as requested by the site's WebP asset specification.
- The existing actual-site captures at public/images/home/hero/fopac-screenshot.webp and zavodsz-screenshot.webp were copied byte-for-byte into the portfolio's expected fopac-website-mockup.webp and zavodsz-website-mockup.webp locations. SHA-256 equality was checked. No generative edits were applied to those evidence images.
- The existing illustrative analytics SVG remains unchanged.

Generation prompt:

> Use case: product-mockup, an explicitly illustrative portfolio cover for a software automation project. Premium cinematic 3D product visualization, landscape 3:2. A refined matte-black smartphone in the foreground with a minimal dark app screen: one bright lime circular check, a few abstract loyalty reward tokens below it, and clean abstract interface blocks, absolutely no readable text, no numbers, no currency, no logos. Behind it, a compact self-service coffee dispenser with a cup and a small decorative QR-style square (not a real QR code), and a slim laptop showing an abstract connected-workflow dashboard with no statistics or labels. The SOFTWARE and connected service are the hero: phone and screen occupy most of the composition; the coffee machine is small supporting context, not a coffee-machine advertisement. One restrained lime connector visually leads from the QR-style square to the phone check and the laptop. Materials: charcoal anodized metal, smoked glass, premium realistic product surfaces. Near-black background and desk, controlled olive/lime edge lighting, soft directional highlights and deep shadows, calm high-end ILogic brand palette (#090808, #101010, #ccff00). Carefully spaced arrangement with a clear central focal point and no excessive glowing effects. No people, hands, faces, readable words, brand names, fabricated analytics, prices or star ratings. This is a concept illustration, not a screenshot or documentation of a real customer interface.

## Validation

Production build/prerender and all eight homepage tests pass. Native browser checks cover all four project selections at 375, 768 and 1440px in Arabic and English: one visible project, selection state, no overflow or image/copy collision, preserved content and native keyboard activation. Before/after artifacts are homepage-preview.local/works-compact-before/ and works-compact-review/. The generated asset preparation report is works-assets/assets.json.

At 1440px, the first website project decreased from 1,508px to 743px in Arabic and 1,525px to 746px in English. The initially selected loyalty project is about 801px high in Arabic and 806px in English. On 375px, the first website project decreased from 1,197px to 980px in Arabic and 1,274px to 1,008px in English while retaining the complete project explanation. No pricing, rating, client result metric or new factual claim was added. No other section's styling was changed.

## Gostinec addition

Added the owner's Russia ecommerce project, https://gostinec.pro/, after ZavodSZ and Fopac. Arabic title: `Gostinec، متجر إلكتروني بروسيا`; English title: `Gostinec · Online store in Russia`. Descriptions cover the visible hospitality catalog, search, product details and shopping cart, without client metrics or unsupported integrations. The existing compact layout and initial loyalty selection remain unchanged.

`public/images/home/gostinec-website-mockup.webp` is a real Chrome viewport capture of the live storefront, 1600×1000, 124,052 bytes. Canvas converted it to WebP without generative edits. Source details are recorded in `homepage-preview.local/works-gostinec-assets/source.json`. The screenshot retains the store's own interface and cookie notice. Capture and RTL/LTR selection checks can be run with the `works-gostinec-assets` and `works-gostinec-review` stages of the private homepage audit harness.

Validation after this addition: production build and prerender passed, all 8 homepage and 3 localization tests passed, and targeted ESLint passed. Chrome checks covered all 5 projects across 375, 768 and 1440px in Arabic and English (30 selections), including image loading, destination links, keyboard activation, selection state and absence of overflow/collision. Report and screenshots: `homepage-preview.local/works-gostinec-review/`.

## Al Sherif addition

Added the owner's Egypt project, https://alsherifpanel.com/, after Gostinec. Arabic title: `الشريف، موقع لتركيب غرف التبريد في مصر`; English title: `Al Sherif · Cold room installation website in Egypt`. Descriptions cover the site's visible services, project portfolio and site visit/consultation form. No result metrics or unsupported integrations were added. The compact presentation and initial loyalty selection are preserved.

`public/images/home/alsherif-website-mockup.webp` is a real 1600×1000 Chrome capture of the live website, compressed to 141,308 bytes without generative edits. Source metadata: `homepage-preview.local/works-alsherif-assets/source.json`. The private audit harness reuses the existing project checks with `works-alsherif-assets` and `works-alsherif-review` stages.

Validation: production build/prerender, all 8 homepage tests, all 3 localization tests and targeted ESLint passed. Chrome verified all 6 projects at 375, 768 and 1440px in both locales (36 selections), including image loading, outbound links, keyboard selection and no overflow or image/copy collision. Artifacts: `homepage-preview.local/works-alsherif-review/`.
