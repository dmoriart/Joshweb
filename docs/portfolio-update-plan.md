# Portfolio update plan

Implements [portfolio-review.md](portfolio-review.md) (27 September 2026) in
this repository. Written at Prompt 1; later stages update the status column.

## Current implementation

React 19 + Vite single-page app, deployed on Netlify (`netlify.toml`, build
`npm run build`, publish `dist/`). No `AGENTS.md` or `CLAUDE.md`; the README is
the working guide. No hosting change is needed for any stage.

| Concern | Source |
|---|---|
| Routes, nav order, page titles/descriptions, CV path, contact details | `src/routes.js` (single source of truth; also feeds `generate-sitemap.js`) |
| Router | `src/App.jsx` |
| Navigation | `src/components/SiteNav.jsx` (desktop + mobile menu from `navRoutes`) |
| Footer, skip link | `src/components/Layout.jsx` |
| Per-route metadata | `src/components/PageMeta.jsx`; static fallback + JSON-LD in `index.html` |
| All content | `src/data/content.js` (typed in `src/data/types.js`) |
| Home | `src/pages/Home.jsx` |
| Animation | `src/pages/AnimationPage.jsx`, `src/components/MotionClipGrid.jsx` |
| Comic Art | `src/pages/ComicArt.jsx` → `src/components/ArtworkGallery.jsx` |
| Sketchbook | `src/pages/Sketchbook.jsx` → `ArtworkGallery` |
| Film | `src/pages/Film.jsx`, `src/components/VideoEmbed.jsx` (click-to-play) |
| About | `src/pages/About.jsx` |
| Contact | `src/pages/Contact.jsx`, `src/components/ContactForm.jsx` (Netlify Forms) |
| Artwork/clip/photo viewer | `src/components/Lightbox.jsx` (single accessible dialog) |
| Image pipeline | `scripts/build-images.mjs`: `media/` → WebP derivatives in `public/images/` (gitignored) + `src/data/image-manifest.json`; `src/components/ResponsiveImage.jsx` resolves them |

Adding work = drop the original in `media/<section>/`, add an entry to
`content.js`, run `npm run dev`. Nothing reads `portfolio-incoming/`, so the
private source photographs cannot reach the build unless copied into `media/`.

## Route map (regression baseline)

Recorded before any change. URLs must not change.

| Path | Nav label before | Nav label after | Notes |
|---|---|---|---|
| `/` | Home | Home | |
| `/comic-art` | Comic Art | Drawing & Comic Art | Route kept |
| `/sequential-art` | Sequential Art | Sequential Art | Hidden and unrouted while `sequences` is empty |
| `/animation` | Animation | Animation | |
| `/film` | Film | Film | |
| `/sketchbook` | Sketchbook | Sketchbook | |
| `/about` | About | About | |
| `/contact` | Contact | Contact | |
| CV | `/CV%20-%20Josh%20Moriarty-June%202026.pdf` | unchanged | Nav pill, mobile menu, footer, About |

Nav order before: Home, Comic Art, Animation, Film, Sketchbook, About, Contact.
Nav order after: Home, Animation, Drawing & Comic Art, Sketchbook, Film, About, Contact.

## Media referenced by the home page (before)

- Hero background: `featured[0]`, Guardians (`/images/artwork/1000005511.png`)
- Featured Work: the five `featured` artworks (ids 66, 62, 63, 64, 65), all digital fan art
- Animation: `motionClips` with `featured: true` (`res.mp4`, `oct.mp4`)
- About portrait: `/images/photography/about.jpeg`
- No film on the home page

## Incoming images

`portfolio-incoming/` contains all 20 filenames in the review's mapping (§7),
none missing and no extras. None of them are in `media/`, so there is no overlap
with existing site artwork. The folder is now gitignored. Contents are matched by
exact filename only; subjects are taken from the review, not inferred from names.

## Plan

| Stage | Change | Files | Status |
|---|---|---|---|
| 0 | Save guide as `docs/portfolio-review.md`; gitignore `portfolio-incoming/` | `docs/`, `.gitignore` | Done |
| 1 | This plan | `docs/portfolio-update-plan.md` | Done |
| 2 | Animation-first hero, CTAs, home section order, nav order/label, titles, footer, About status and tools/equipment disclosure | `src/routes.js`, `src/pages/Home.jsx`, `src/pages/Home.css`, `src/pages/About.jsx`, `src/pages/About.css`, `src/pages/ComicArt.jsx`, `src/components/Layout.jsx`, `src/data/content.js`, `index.html`, `README.md`, `src/pages/pages.test.jsx` | Done — see decisions below |
| 3 | Manifest for the 20 incoming images, private contact sheet, conservative web derivatives | new manifest outside `public/`; `media/` only for approved assets | Not started |
| 4 | Integrate approved artwork; audit Clean-Up claims; descriptive animation titles; Film first view | `content.js`, gallery pages, `AnimationPage.jsx`, `Film.jsx` | Not started; blocked on Josh's confirmations |
| 5 | Verification at 390 / 768 / 1440 px, a11y, build-output privacy check | — | Not started |
| 6 | Handover and maintenance guide | `docs/` | Not started |

## Stage 2 decisions to confirm with Josh

- **Home drawing selection** (the five `featured` artworks; the grid lays out
  a lead tile plus four cleanly, and a sixth leaves an orphan): Guardians (hero),
  Moon Knight and Masked Mercenary as finished work, plus Self Portrait I and
  View & Viewpoint II (the rangefinder camera drawing) as observational work.
  Sith Lord and Descent are still on `/comic-art`, just no longer on the home page.
- **Home film preview**: Creative Reel 2026, marked `featured` in `works`. It was
  the site's lead reel before the 2 August move to Film, and no other explicit
  selection exists. It is shown as a mixed reel, not as animation. Provisional.
- **About**: says "animation student" with no course, college or year. Add these
  only once Josh confirms them. The June 2026 PDF CV was not changed.

## Checks available

`npm test` (Vitest: page render/heading/title checks, nav links, content paths
and manifest entries, TODO leak guard), `npm run lint`, `npm run build`
(images → sitemap → Vite). Browser checks are manual; see
`docs/testing-checklist.md`.
