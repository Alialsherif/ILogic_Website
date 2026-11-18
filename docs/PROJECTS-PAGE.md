# Projects overview

The public overview is `/projects`, with `/projectPage` as a compatible alias and `?lang=en` for English. Its Arabic HTML is prerendered for refreshes and search indexing, and the route is included in the sitemap.

The page uses the existing six projects from `src/data/homeContent.js`: ZavodSZ, Fopac, Gostinets, Al Sherif, the self-service coffee loyalty system, and the user behavior analytics system. Existing names, descriptions, images, illustrations and the Al Sherif laptop video are retained. No results, client names, statistics or claims were invented.

`ProjectMedia.jsx` is shared by the homepage and this overview so laptop framing and video behavior stay consistent. Three client websites use the existing laptop frame. Al Sherif uses the existing video, which pauses offscreen, in hidden tabs and under reduced motion. System artwork is clearly labeled as illustrative. All media have dimensions reserved.

The layout is deliberately simple: two columns on desktop, one on phones. All projects are present in the initial HTML and displayed together. Filters are deferred until the portfolio grows.

Only the four supplied client websites have visit links. There are no internal project-detail links or placeholder detail actions. Existing detail source files/routes are reserved for later work. Blog links have been removed from the shared main/mobile navigation and footer; blog source files/routes are retained for later work.

Edit page layout in `src/pages/ProjectPage.jsx`, styling in `src/scss/_projects-page.scss`, and new overview copy in `src/i18n/projects.ar.json` and `projects.en.json`. Project content remains shared with the homepage.

Validation: `npm run test:projects`, `npm run test:home`, targeted ESLint and production build. Browser QA: `node homepage-preview.local/audit.mjs projects-page-review`, Arabic/English at 375/768/1440 px, all projects visible without filters, assets, overflow, navigation/alias, absent blog/detail links, static HTML and sitemap. Captures/report are in `homepage-preview.local/projects-page-review/`.

No backend integration or deployment is included.
