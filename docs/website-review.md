# Website Review — joshmoriartyfilms.ie

**Date:** 30 July 2026
**Reviewed commit:** `4354d2a` (branch `main`, clean tree)
**Scope:** full front-end audit prior to a repositioning of the site around comic art, sequential storytelling and 2D animation.

---

## 1. Current architecture

### Stack

| Concern | Implementation |
|---|---|
| Framework | React 19.1 |
| Build tool | Vite 6.3.5 |
| Routing | `react-router-dom` 7.6 — **one route only** (`/`) |
| Styling | Inline React style objects (~95%), `src/App.css` (global), `src/index.css` (unmodified Vite boilerplate), plus `<style>` blocks injected inside 4 components |
| Content | `src/data/content.js` — plain JS exports, no types |
| Media | All in `public/images/`, served as static paths |
| Video | YouTube iframes + 3 self-hosted MP4/GIF clips |
| Forms | Netlify Forms (hidden detection form in `index.html`, AJAX POST from React) |
| Analytics | Cloudflare Web Analytics beacon |
| Hosting | Netlify (`netlify.toml`, site ID in `.netlify/state.json`) |
| Tests | None |

### Structure

```
index.html                    ← all static SEO/meta/structured data
src/
  main.jsx                    → App
  App.jsx            (276 L)  ← the entire page: renders every section inline
  Artwork.jsx        (382 L)  ← drawing gallery + lightbox #1
  useMetaTags.js     (137 L)  ← runtime title/meta rewriting
  App.css            (411 L)  ← globals + brittle nth-child mobile overrides
  index.css           (68 L)  ← untouched Vite starter CSS
  data/content.js    (389 L)  ← works, motionClips, animations, artworks,
                                 cleanups, photography, credits, processItems
  components/
    Navigation.jsx   (257 L)
    Hero.jsx         (284 L)  ← split-panel: "Drawn Motion" / "Analogue Film"
    Portfolio.jsx    (433 L)  ← "Animation / Clean-Up Portfolio" + lightbox #2
    FeaturedReel.jsx (216 L)  ← autoplaying YouTube reel
    WorkGrid.jsx     (456 L)  ← film work + case-study modal
    Animation.jsx    (359 L)  ← animation grid + modal
    MotionClipGrid   (169 L)  ← self-hosted 2D clips + lightbox #3
    Photography.jsx  (341 L)  ← photo collections + lightbox #4
    Equipment.jsx    (163 L)  ← camera gear
    Credits.jsx      (129 L)
    ContactForm.jsx  (190 L)
    Process.jsx      (277 L)  ← DEAD (import commented out in App.jsx:10)
backend/                      ← UNRELATED FastAPI loan-origination app (see §6)
```

### Page order as a visitor experiences it

Hero → Animation/Clean-Up Portfolio → About → Creative Reel → Drawing Portfolio → Animation → Selected Film Work → Equipment → Photography → Credits → Contact.

That is **eleven** full-height sections on one scroll, with no way to jump directly to a body of work by URL.

---

## 2. Strengths

These are real and worth protecting through any redesign.

1. **Content is already centralised.** `src/data/content.js` is a single source of truth. This is the right foundation for a typed portfolio model — it needs shaping, not replacing.
2. **`MotionClipGrid.jsx` is the best component in the codebase.** Self-hosted clips, muted looping, `IntersectionObserver` play/pause so off-screen video stays paused, `prefers-reduced-motion` respected, Escape-to-close, body-scroll lock. This is the pattern the rest of the site should adopt.
3. **The clean-up before/after section already exists** (`cleanups` in content.js, rendered in `Portfolio.jsx`). Studios explicitly ask for this and most student portfolios don't have it. It is currently buried and under-explained, but the substance is there.
4. **The drawing gallery lightbox has arrow-key navigation, Escape, a position counter and scroll lock** — a solid base to build the accessible component on.
5. **Genuine volume of work:** 66 drawings, 3 self-hosted animation clips, 2 clean-up pairs, 7 film pieces, 4 photo collections, a CV PDF and a demo reel.
6. `prefers-reduced-motion` is handled globally in `App.css`.
7. Deployment is simple and works: `npm run build` regenerates the sitemap and builds; Netlify publishes `dist`. Google and Bing verification files are in place.
8. Build is fast (~0.8 s) and `npm run lint` passes clean.

---

## 3. Weaknesses

### 3.1 Positioning — the site says the wrong thing about Josh

This is the highest-priority problem, ahead of every technical issue below.

Every signal a reviewer meets in the first five seconds identifies Josh as a **DV-tape cinematographer of Dublin's underground music scene**:

| Signal | Current value |
|---|---|
| `<title>` in `index.html` | "Josh Moriarty - Cinematographer & Filmmaker Portfolio" |
| `<title>` after JS runs (`useMetaTags.js:6`) | "Josh Moriarty Films — Underground DV Tape Videographer" |
| Meta description | "Dublin-based cinematographer specialising in live music documentation… Sony PD170 DV tape." |
| Structured data `jobTitle` | "Cinematographer and Animator" |
| `knowsAbout` | 2D Animation, DV Tape, Underground Music, Live Performances, Documentary, Sony PD170 |
| OG image | `/images/process/IMG_0226.jpeg` — a behind-the-scenes film photo, not artwork |
| Hero H1 subtitle | "Visual Artist specialising in Animation and Cinematography" |
| Hero right panel | "Analogue Film — DV tape texture, live energy, fashion, music, documentary" |
| Hero CTAs | "Watch Creative Reel" / "About the Work" |
| Contact form project types | Live Band, DJ Set/Club Night, Promo Video, Documentary |
| Site name | "Josh Moriarty Films" |

Words appearing **zero** times anywhere in the codebase: *comic*, *sequential*, *panel*, *storyboard* (except one disabled data entry), *visual development*, *character design* (as a labelled discipline). A Marvel talent representative landing on this page would not identify Josh as a comic artist.

### 3.2 No comic or sequential art content exists

There is no comic page, no multi-page sequence, no thumbnail/rough/pencil/ink/final progression, and no storyboard sequence anywhere in `public/images/` or `content.js`.

The closest existing material:
- `artworks` category `fan-art` — 10 single-panel character illustrations (Star Wars ×5, plus Guardians, Masked Mercenary, Moon Knight, Sith Lord, Descent). These are strong character work but they are **single images, not sequential art**.
- `public/images/process/storyboard.png` — one image, referenced only by the disabled `Process.jsx`, and captioned in `content.js` as a *film* storyboard ("Initial sketch for the opening sequence", "communicate my vision to the crew").

**This cannot be solved in code.** Phase 5 of the brief (a prominent Sequential Art section, correct reading order, reviewer-navigable sequences) requires assets that do not exist in this repository. Detail and required formats are in [`content-gaps.md`](./content-gaps.md).

### 3.3 Performance — the dominant technical problem

| Measurement | Value |
|---|---|
| Total `public/images/` | **589 MB** |
| Unreferenced image files | **39 files / 244 MB** |
| Byte-identical duplicate files across folders | 33 |
| Largest single asset | `artwork/1000005510.png` — **17.6 MB**, 7016 × 4961 px |
| Typical sketchbook JPEG | 4284 × 5712 px, 7–9 MB |
| `.git` directory | 389 MB |
| JS bundle | 316 KB raw / 92.7 KB gzip |

Consequences:

- **The drawing gallery loads originals as thumbnails.** `Artwork.jsx:145` renders `<img src={artwork.src}>` into a masonry cell roughly 380 px wide. With "All Work" selected that is 66 full-resolution images. `loading="lazy"` limits it to what scrolls into view, but each visible thumbnail is still a multi-megabyte download. On mobile data this is not usable.
- **No responsive images anywhere.** No `srcset`, no `sizes`, no WebP/AVIF, no generated thumbnail sizes.
- **No `width`/`height` on any `<img>`.** Every image causes layout shift as it arrives. Some containers set `aspectRatio` in CSS which mitigates it in places, but not consistently.
- **33 duplicate files.** `public/images/photography/IMG_1098.jpeg` and `public/images/artwork/IMG_1098.jpeg` are the same bytes; ~40 sketchbook scans were copied into `photography/` and are referenced by nothing.
- **The reel autoplays a YouTube iframe on load.** `FeaturedReel.jsx:108` requests `…/embed/HRsAaCGVGRo?autoplay=1&mute=1&loop=1`. `loading="lazy"` defers it until near-viewport, but once triggered it pulls in the full YouTube player (~1 MB of third-party JS) and starts streaming without the visitor asking. A poster-image click-to-play façade would remove that cost entirely.
- **`react-router-dom` ships in the bundle for a single static route.** Roughly 25–30 KB gzip for nothing — though this becomes justified the moment real routes exist (see §7).

### 3.4 Styling system

- **`src/index.css` is the unmodified Vite starter template** and it is imported by `main.jsx:3`. It sets `background-color: #242424`, `color: rgba(255,255,255,0.87)`, `a { color: #646cff }` (purple), `body { display: flex; place-items: center; min-height: 100vh }` and a global `button { background-color: #1a1a1a; border-radius: 8px }`. It actively fights `App.css` and every inline style on the site. Any link or button that doesn't set its own colour inherits Vite-purple.
- **Inline styles everywhere** means no hover, focus, media-query or pseudo-element support without a workaround — which is why hovers are implemented as `onMouseEnter`/`onMouseLeave` JS handlers on dozens of elements, and why four components inject their own `<style>` tags.
- **`App.css` mobile rules target the DOM positionally** — `#work > div:nth-child(3)`, `#work > div:nth-child(4) iframe`, `#about > div > div:first-child > div:last-child`. Several no longer match the current markup, so they are dead; the rest will silently break on any structural edit.
- No design tokens. `#1a1a1a`, `#666`, `#999`, `#f5f5f5`, `0 4px 20px rgba(0,0,0,0.08)` and `clamp(2.5rem, 6vw, 4rem)` are re-typed dozens of times.

### 3.5 Duplication

| Duplicated thing | Occurrences |
|---|---|
| `getYouTubeId()` + `getYouTubeThumbnail()` | 3 — `Portfolio.jsx`, `Animation.jsx`, `WorkGrid.jsx` |
| Lightbox / modal implementation | 4 — `Artwork.jsx`, `Portfolio.jsx`, `MotionClipGrid.jsx`, `Photography.jsx` |
| Video modal with YouTube embed | 3 — `Portfolio.jsx`, `Animation.jsx`, `WorkGrid.jsx` |
| Close-button style object | 3 |
| `<MotionClipGrid />` **rendered twice on the same page** | `Portfolio.jsx:115` and `Animation.jsx:54` — the same 3 clips appear twice |
| Featured drawings shown twice | `Portfolio.jsx` featured grid, then again in the full `Artwork` gallery |
| Section-heading block | ~8 near-identical copies |

### 3.6 Accessibility

Checked against WCAG 2.2 AA.

| Issue | Location | Impact |
|---|---|---|
| **Drawing gallery is mouse-only.** Grid cells are `<div onClick>` with no `tabIndex`, `role` or key handler | `Artwork.jsx:126` | Keyboard users cannot open any of the 66 artworks. Blocker. |
| **No lightbox is a real dialog.** No `role="dialog"`, `aria-modal`, focus trap, or focus restore on close | all 4 lightboxes | Screen-reader and keyboard users get lost behind the overlay |
| `role="button"` on `<div>` instead of a real `<button>` | `WorkGrid.jsx:98`, `Animation.jsx:67` | Works, but fragile and unnecessary |
| **Contrast failure:** `#999` on `#fff` = **2.85:1** (needs 4.5:1) | piece counts, card venue/year meta, `SubheadingBlock` numbers | Fails AA |
| `#aaa` on `#f0f0f0` placeholder text | `Portfolio.jsx:284` | Fails AA |
| No skip-to-content link | `App.jsx` | Keyboard users traverse the whole nav on every section |
| `aria-expanded` missing on hamburger button | `Navigation.jsx:136` | State not announced |
| `aria-current="true"` should be `"location"` for scroll-spy | `Navigation.jsx:98,204` | Invalid value for the context |
| Alt text is just the title | `Artwork.jsx:147` etc. | `description` field is already written and unused — free improvement |
| `input:focus { outline: none }` | `App.css:71` | Replaced by border+shadow, but weaker than a visible ring |
| Anchors have no focus-visible style | global | Only `button` gets one, from the Vite boilerplate |
| Emoji/glyph controls (`✕`, `‹`, `›`, `×`, `⛶`, `▶`) as button content | all lightboxes | `aria-label` present on some, missing on `Artwork.jsx` close/prev/next |
| No captions/transcripts on video | `MotionClipGrid`, YouTube embeds | Captions text exists in data; not exposed as `<track>` |

### 3.7 Mobile

- **The hero has no calls to action on mobile.** `App.css:215` — `.hero-content > div { display: none !important; }` at ≤768 px hides the entire CTA button group. On a phone the hero is a name, a one-line subtitle, and two image panels.
- **The hero description text is also hidden** (`App.css:228`), so the two panels become unlabelled images with a title.
- The mobile menu overlay is pinned at `top: 71px` (`Navigation.jsx:181`) while `App.css:172` simultaneously switches the nav to `flex-direction: column` at the same breakpoint, changing its height. The overlay and the nav bar will not line up.
- `Artwork.jsx` thumbnails are `aspectRatio: 3/4` + `objectFit: cover` — every landscape drawing is centre-cropped in the grid. (A recent commit fixed exactly this for the featured line-work grid; the main gallery still crops.)
- Touch targets: filter pills are 10 px × 22 px padding ≈ 38 px tall — below the 44 px comfortable minimum.

### 3.8 SEO and sharing

- **Two different titles.** `index.html` says "Cinematographer & Filmmaker Portfolio"; `useMetaTags.js` overwrites it at runtime with "Underground DV Tape Videographer". Crawlers that don't execute JS index one; those that do see the other.
- `useCurrentSection` uses `threshold: 0.5` on sections that are taller than the viewport — those can never reach 50% visibility, so section-based meta switching is unreliable in practice.
- `og:image` declares `1200 × 630` but the file is `2355 × 1181`. The image itself is a film BTS shot rather than Josh's strongest artwork.
- `<meta name="keywords">` is keyword-stuffed, ignored by search engines, and describes the old positioning.
- Sitemap contains exactly one URL. `robots.txt` is correct.
- No `theme-color` for light mode, no `apple-touch-icon`; favicon is `/IMG_1073.jpeg`, an untitled photo.
- Structured data is `Person` only — no `CreativeWork` entries for the portfolio pieces.
- Image filenames are largely non-descriptive: `IMG_1098.jpeg`, `1000005510.png`, `ccf32000-3ac1-46f3-a73e-72fccb5cbd8f.png`.

### 3.9 Netlify / deployment

- **No SPA fallback rule.** `netlify.toml` has no `/* → /index.html 200` redirect. Today the site has one route so nothing breaks, but the moment real routes are added (Phase 2), every deep link and every page refresh on a sub-path will 404. This must land in the same change as routing.
- The hidden Netlify detection form in `index.html:81` lists project types `live-band, dj-set, promo, documentary, other`; the React form (`ContactForm.jsx:105`) sends `live-band, dj-set, promo, animation, other`. Field *names* match so submissions succeed, but the declared option sets have drifted.
- No security headers (`X-Frame-Options`, `Referrer-Policy`, CSP) and no cache-control rules for `/images/*`.
- No secrets in source — the Cloudflare Analytics token is a public beacon token, which is expected. **Nothing needs to move to environment variables.**

---

## 4. Usability problems

Measured against the brief's five-second test:

| Question a reviewer asks | Answerable in 5 s today? |
|---|---|
| **Who is Josh?** | Partly — name is large and clear, but the role line says "Animation and Cinematography" |
| **What does he make?** | **No** — a reviewer concludes "music videographer". Comic art is invisible. |
| **What is his strongest work?** | **No** — the hero shows two mood panels, not artwork. The first actual work is one screen down. |
| **How do I see the animation?** | Partly — "Watch Creative Reel" exists on desktop, is hidden on mobile |
| **How do I see the comics?** | **No** — nothing to see |
| **How do I contact him?** | **No** — contact is at the bottom of eleven full-height sections, and there is no email or link in the nav |

Additional friction:

- **Nothing is linkable.** Josh cannot send a reviewer "the comic page" or "the animation page" — only the whole scroll.
- **Two competing portfolio sections.** "Animation / Clean-Up Portfolio" and "Animation" both exist, both show the same three motion clips, and their relationship is unexplained.
- **The strongest character work is buried.** The five recent character pieces (Guardians, Masked Mercenary, Moon Knight, Sith Lord, Descent) are the most portfolio-relevant images on the site. They appear ~2 screens down inside a section labelled "Application Portfolio".
- **Equipment and Photography outrank the artwork in page position** relative to their importance for an animation/comic review.
- **"Selected Credits" reads as a filmography** — every entry is "Filmed and edited". No drawing, animation or comic credit appears.

---

## 5. Content gaps

Summarised here; the actionable list with formats and priorities is in [`content-gaps.md`](./content-gaps.md).

| Gap | Severity |
|---|---|
| No comic pages or multi-page sequences | **Blocking** for Phase 5 |
| No storyboard sequence framed as animation/comic work | **Blocking** for the storyboarding claim |
| No visual development work (environments, colour keys, model sheets) | High |
| No character turnaround / expression sheet | High |
| Only 2 clean-up examples, both undated and untitled | Medium |
| Animation clips have no stated duration, software, or original/exercise label | Medium |
| No poster images for the self-hosted MP4s | Medium |
| CV file is `CV - Josh Moriarty-June 2026.pdf` — contents not verified against the site | Medium |
| Film pieces state a role, but "Director of Photography" on a one-person shoot may overstate | Low — worth a check with Josh |
| Credits list has "Stick n Poke - Soundhouse" twice | Low |
| About text is 5 paragraphs, film-weighted, and never mentions comics or college plans | High |

### Existing content-integrity risks

Two items already on the live site are unverifiable and should be removed or substantiated:

1. **`App.jsx:145` — "20+ Events Covered" and "2 Visual Disciplines"** stat counters. Unsourced.
2. **`content.js:338` `processItems`** — describes lighting design ("a single key light and a lot of negative fill"), a "warehouse scene" and a timeline that don't correspond to any project on the site. The section is disabled, but the data is still in source and reads as invented. Recommend deleting the data along with the dead component.

---

## 6. Technical risks and dead weight

| Item | Detail | Recommendation |
|---|---|---|
| **`backend/`** | A complete **FastAPI loan-origination system called "VibeLend"** — credit-scoring rules, SQLModel schemas, an `/apply` endpoint. 8 files committed to this repo. Entirely unrelated to the portfolio. | Delete from this repo (confirm with owner first — it may be wanted elsewhere) |
| `src/components/Process.jsx` | 277 lines, import commented out at `App.jsx:10` | Delete with its `processItems` data |
| 39 unreferenced images / 244 MB | 37 duplicate sketchbook scans in `photography/`, `process/IMG_0230.jpeg`, `process/bts.png`, `equipment/sony-easycam.png` | Delete from `public/` (originals remain in git history) |
| `src/assets/` | `IMG_2041.jpeg`, `react.svg` — imported nowhere | Delete |
| `public/vite.svg` | Vite default, unused | Delete |
| `build/` | Empty directory | Delete |
| `.github/copilot-instructions.md` | Empty comment stub | Delete or fill in |
| `.DS_Store` × 6 | Committed in `public/`, `src/`, `public/images/*` | Remove from tracking (`.gitignore` already lists it) |
| `dist/` on disk | Not tracked (correctly gitignored) but stale, containing an old build | Leave; it is regenerated |
| `.git` at 389 MB | Caused by committing multi-megabyte originals | Out of scope to rewrite history. Going forward, commit optimised derivatives and keep originals outside the repo. |
| No tests | Nothing to protect the portfolio data shape or the lightbox behaviour | Add a small number of high-value tests (see plan) |

---

## 7. Recommended changes

### 7.1 Information architecture

Move from one scroll to real routes. The brief's navigation, filtered against content that actually exists:

| Route | Status | Content |
|---|---|---|
| `/` Home | Rebuild | Hero + Featured Work + Sequential Art + Animation Reel + short About + Contact CTA |
| `/comic-art` | Build | The 10 character/fan-art pieces + the 5 recent character pieces, presented as illustration |
| `/sequential-art` | **Build once assets exist** | Multi-page sequences with a reader. **Do not ship an empty page.** |
| `/animation` | Rebuild | Reel first, then the 3 self-hosted clips + 2 YouTube tests, then clean-up before/after |
| `/film` | Consolidate | The 7 film pieces, grouped, with exact roles. Demoted below animation. |
| `/sketchbook` | Rebuild | The 30 sketchbook studies + self-portraits + street + viewpoint, filtered |
| `/about` | Rewrite | Concise professional bio per Phase 8 |
| `/contact` | Rebuild | Email, socials, form, CV |

Photography and Equipment do not warrant top-level nav for an animation/comic review. Recommend folding Photography into `/film` as a sub-section and moving Equipment to a short list on `/about`.

**Until sequential-art assets arrive**, `/sequential-art` stays out of the nav rather than shipping as a placeholder.

### 7.2 The core reusable pieces to build

1. **`PortfolioItem` data model** (typed via JSDoc, since the project is plain JS): `id, slug, title, category, year, description, tools[], role, thumbnail, full, processImages[], externalUrl, alt`.
2. **One `Lightbox` component** with `role="dialog"`, `aria-modal="true"`, focus trap, focus restore, Escape, arrow keys — replacing all four current implementations.
3. **One `MediaCard`** replacing the three near-identical card+modal grids.
4. **`lib/youtube.js`** — the shared ID/thumbnail helpers, extracted once.
5. **`SequenceReader`** — page-by-page navigation for multi-page comics, with keyboard paging and a thumbnail strip, so a reviewer never returns to the grid mid-sequence.
6. **Design tokens** — CSS custom properties for colour, spacing, type scale, shadow; move component styling out of inline objects into CSS modules or a single stylesheet with real classes.

### 7.3 Performance

- Generate derivatives at build time: 400 px / 800 px / 1600 px WebP + a JPEG fallback; keep the original only as the lightbox "full" source, itself capped at ~2400 px.
- Add `srcset`/`sizes` and explicit `width`/`height` to every image.
- Preload only the hero image; lazy-load everything below the fold.
- Replace the autoplaying YouTube embed with a poster-image click-to-play façade.
- Add poster images to the self-hosted MP4s.
- Delete the 244 MB of unreferenced assets.
- Add long-cache headers for `/images/*` in `netlify.toml`.

Expected effect: first-load image payload from tens of megabytes to well under 1 MB, without visibly degrading artwork quality.

### 7.4 SEO

- Retire `useMetaTags.js` runtime rewriting; give each route its own static title/description/canonical, set at the document level.
- Home title: `Josh Moriarty | Comic Artist, 2D Animator and Filmmaker`
- Home description: `Portfolio of Irish comic artist, 2D animator and filmmaker Josh Moriarty, featuring illustration, sequential art, animation and film work.`
- New OG image: the strongest character piece, rendered at 1200 × 630.
- Drop the `keywords` meta.
- Extend `generate-sitemap.js` to emit one entry per route.
- Update `Person` structured data (`jobTitle`, `knowsAbout`); add `CreativeWork` for featured pieces.
- Rename image files descriptively as they are re-exported.

### 7.5 Content integrity

- Remove the "20+ Events Covered" / "2 Visual Disciplines" counters.
- Delete `processItems` and `Process.jsx`.
- Every unknown (software, duration, role, year) becomes a `TODO:` comment in `content.js` — never rendered, never guessed.
- No claim of publication, client work or awards is to be added anywhere.

---

## 8. Proposed implementation order

Each stage is independently shippable and independently revertible.

| # | Stage | Files | Risk |
|---|---|---|---|
| **0** | **Content request to Josh** — issue `content-gaps.md` so asset gathering runs in parallel with the build | — | none |
| **1** | **Cleanup + foundation.** Delete `backend/`, `Process.jsx`, `processItems`, `src/assets/`, unreferenced images, `.DS_Store`. Fix `index.css`. Introduce design tokens. Add SPA redirect + cache headers to `netlify.toml`. | `netlify.toml`, `index.css`, `App.css`, deletions | Low |
| **2** | **Shared components.** `lib/youtube.js`, accessible `Lightbox`, `MediaCard`, `SectionHeading`. Swap the four ad-hoc lightboxes onto the shared one. | `src/components/*`, `src/lib/*` | Medium — touches every gallery |
| **3** | **Data model.** Reshape `content.js` into typed portfolio items; add `TODO:` markers for every unknown. | `src/data/*` | Medium |
| **4** | **Image pipeline.** Build-time derivative generation, `srcset`, `width`/`height`, poster images, YouTube façade. | new build script, `MediaCard` | Medium |
| **5** | **Routing + IA.** Real routes, per-route metadata, retire `useMetaTags.js`, sitemap per route. | `App.jsx`, new `pages/` | Medium |
| **6** | **Home page rebuild** to the Phase 3 spec. | `pages/Home`, `Hero` | Low |
| **7** | **Comic Art + Animation pages** to Phase 4 / 6 spec, incl. clean-up promoted and properly captioned. | `pages/*` | Low |
| **8** | **Sequential Art page + `SequenceReader`** — *gated on assets from Stage 0.* | `pages/SequentialArt` | Low |
| **9** | **Film consolidation**, exact roles, Photography folded in. | `pages/Film` | Low |
| **10** | **About + Contact rewrite.** | `pages/*`, `ContactForm` | Low |
| **11** | **Accessibility pass** — skip link, focus rings, contrast fixes, `aria-expanded`, alt text from `description`. | global | Low |
| **12** | **Validation** — build, lint, tests, link check, keyboard walkthrough, mobile widths, Lighthouse. Produce `testing-checklist.md` and `deployment-notes.md`. | `docs/` | — |

**Suggested testing (kept small and high-value):** a data-integrity test asserting every portfolio item has a title, alt, category and an image path that resolves on disk; a `youtube.js` unit test across the four URL shapes in use; and a `Lightbox` interaction test for Escape, arrow keys and focus restore.

---

## 9. Decisions needed before Stage 1

1. **Comic and sequential art assets** — the single blocker on the site's main purpose. See `content-gaps.md`.
2. **Delete `backend/`?** It is an unrelated loan-origination app. Confirm it is backed up elsewhere.
3. **Delete the 244 MB of unreferenced images from `public/`?** They remain recoverable from git history.
4. **Photography and Equipment** — fold into `/film` and `/about` as recommended, or keep as top-level sections?
5. **Film roles** — "Director of Photography" and "Director, Cinematographer & Editor" on what appear to be solo shoots. Confirm with Josh so nothing overstates.
6. **Domain and site name** — `joshmoriartyfilms.ie` and "Josh Moriarty Films" both lean film. Keep the domain (changing it costs SEO and it is on the CV), but retire "Josh Moriarty Films" as the site's name in favour of "Josh Moriarty"?
