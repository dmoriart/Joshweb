# Testing Checklist

**Last full run:** 30 July 2026, branch `redesign/portfolio-foundation`

Run before every deploy. Anything marked **automated** is covered by
`npm test` or the audit scripts and does not need repeating by hand.

---

## 1. Automated gates

```bash
npm run lint     # eslint, 0 errors 0 warnings
npm test         # 241 tests across 4 files
npm run build    # image pipeline + sitemap + vite build
```

| Suite | What it protects | Count |
|---|---|---|
| `src/data/content.test.js` | Every media path resolves in `media/`; every still has a manifest entry with real dimensions; unique artwork ids; title/category/description present on every piece; every film piece has an exact role and known group; no `TODO` can leak into rendered copy; sequences are complete-or-absent | 188 |
| `src/pages/pages.test.jsx` | Every page renders; exactly one `<h1>` each; a document title is set; skip link points at `#main`; every nav route is linked; Sequential Art stays hidden; hero states the three roles and both CTAs; **no iframe exists before a click** | 30 |
| `src/components/Lightbox.test.jsx` | Dialog semantics, Escape, focus restore, focus trap, arrow paging, scroll lock, controls omitted when there is nowhere to go | 7 |
| `src/lib/youtube.test.js` | All four YouTube URL shapes parse; every video URL in the content data resolves to a valid id | 16 |

**Status: all passing.**

---

## 2. Accessibility

Automated with `axe-core` (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`)
against the built site on all seven routes.

| Check | Result |
|---|---|
| axe violations, all 7 pages | **0** |
| axe violations, lightbox open | **0** |
| First tab stop is "Skip to content" | ✅ |
| Artwork reachable and openable with keyboard alone | ✅ |
| Escape closes the lightbox and returns focus to the tile that opened it | ✅ |
| Tab cannot escape an open dialog | ✅ (unit test) |
| Menu toggle exposes `aria-expanded`, flips on click | ✅ |
| Focus ring visible on every interactive element | ✅ — global `:focus-visible` |
| Filter changes announced (`role="status"`) | ✅ |
| Alt text carries the piece description, not just the title | ✅ |
| Touch targets ≥ 44px | ✅ — filters, nav toggle, lightbox controls, buttons |
| `prefers-reduced-motion` respected | ✅ — no autoplay, transitions disabled, smooth scroll off |

### Reproducing the audit

Playwright and axe are intentionally **not** project dependencies — they are
run from a scratch directory so the portfolio does not carry ~100 MB of
browser tooling. To re-run:

```bash
mkdir -p /tmp/jm-audit && cd /tmp/jm-audit
npm init -y && npm install playwright @axe-core/playwright
npx playwright install chromium
# then point a script at http://localhost:4173 while `npm run preview` runs
```

### Known remaining issues

| Issue | Severity | Notes |
|---|---|---|
| One console 404: `img.youtube.com/vi/GabbIXxuWKU/maxresdefault.jpg` | Cosmetic | The Lockout video was uploaded below 720p so YouTube never generated a max-res poster. `VideoEmbed` falls back to `hqdefault` via `onError` and the poster renders correctly; only the failed request is visible in devtools. Handled, not broken. |
| `net::ERR_ABORTED` on `res.mp4` / `oct.mp4` | Cosmetic | The browser aborting video preload on navigation. Expected. |
| Cloudflare Analytics CORS error on `localhost` | Local only | The beacon rejects non-production origins. Does not occur on the live domain. |
| Video has no captions | Open | The clips are silent movement tests, so captions add nothing; the reel would benefit from them. Tracked in `content-gaps.md` §3.1. |
| Colour contrast on artwork overlays | Accepted | White on a black gradient over arbitrary artwork. axe passes; the gradient reaches 0.85 opacity at the text baseline. |

---

## 3. Manual checks

### Layout and responsive

Verified at **390 × 844** (phone) and **1440 × 900** (desktop) on all pages.

- [x] No horizontal overflow at either width (measured, not eyeballed)
- [x] Hero calls to action visible on mobile — regression fixed from the old build
- [x] Artwork is not cropped in the masonry grid or the featured grid
- [x] Videos fit the viewport
- [x] Nav collapses to a menu below 900px and the overlay aligns with the bar
- [ ] Check at 768px tablet width
- [ ] Check on a real iOS device (Safari `100vh` behaviour differs from Chrome)

### Content and links

- [x] All 7 routes return 200 from the built site
- [x] Unknown routes render the 404 page rather than a blank screen
- [x] `/sitemap.xml`, `/robots.txt`, `/share-card.jpg` and the CV PDF all serve
- [x] Every image path in the content data resolves (automated)
- [x] Every video URL parses (automated)
- [ ] External links (Instagram, YouTube) still point at live accounts
- [ ] CV PDF is current and contains no home address, phone number or date of birth

### Contact form

- [x] Renders with labelled fields, all inputs bound to a `<label for>`
- [x] Error state has `role="alert"`, success state has `role="status"`
- [x] Honeypot field present
- [x] Field names match the hidden detection form in `index.html`
- [ ] **Submit a real test message from the deploy preview** — Netlify Forms only
      registers a form after a build has run with the hidden form present, so
      this cannot be verified locally

### Metadata

- [x] Home title: `Josh Moriarty | Animation Student, Artist and Filmmaker`
- [x] Each route sets its own title, description and canonical
- [x] `Person` structured data lists the disciplines (clean-up removed until confirmed)
- [x] Share card is 1200 × 630 and generated from the lead artwork
- [ ] Validate the share card in the LinkedIn / Facebook / X debuggers after deploy
- [ ] Re-submit the sitemap in Google Search Console — it grew from 1 URL to 7

---

## 4. Performance

Measured on the built output.

| Metric | Before | After |
|---|---|---|
| Largest single image | 17.6 MB (7016 × 4961 PNG) | 21 KB at 480w / 173 KB full |
| Favicon | 4.7 MB JPEG | 2.5 KB PNG |
| Images in `public/` | 589 MB | 84 MB of derivatives (originals in `media/`) |
| Unreferenced image files | 244 MB | 0 |
| YouTube player on page load | Autoplaying iframe (~1 MB JS) | None until clicked |
| JS bundle | 316 KB / 92.7 KB gzip | 291 KB / 87.7 KB gzip |
| `width`/`height` on images | None | Every image |

### Lighthouse — production, 2 August 2026

Run against `https://joshmoriartyfilms.ie` with Lighthouse 12 and system Chrome.
Mobile uses the default throttled profile (slow 4G, 4× CPU slowdown).

| Profile | Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Desktop | `/` | **100** | **100** | **100** | **100** | 0.8 s | 0 | 0 ms |
| Desktop | `/comic-art` | **99** | **100** | **100** | **100** | 0.9 s | 0 | 0 ms |
| Mobile | `/` | **93** | **100** | **100** | **100** | 2.6 s | 0 | 20 ms |
| Mobile | `/sketchbook` | **84** | **100** | **100** | **100** | 3.9 s | 0 | 10 ms |

Zero failing audits in accessibility, best practices or SEO on any page.
**CLS is 0 everywhere** — the intrinsic `width`/`height` from the image manifest
is doing its job.

Mobile scores move ±4 points between runs, so treat small differences as noise.

### Reverted: route code splitting

Lazily importing the page components was tried and **measured worse**, so it was
reverted. Recorded here so nobody repeats it:

| | Before | After splitting |
|---|---|---|
| Mobile `/sketchbook` perf | 86 | 75 |
| Mobile `/sketchbook` LCP | 4.0 s | 6.2 s |
| Desktop `/comic-art` perf | 100 | 88 |
| Main bundle | 82 KB | 79 KB |

The page components are only 0.5–4 KB each, so splitting saved 3 KB while adding
four serial round trips before images were discovered. FCP was unchanged, which
confirms the cost was the request chain, not parse time. The bundle is dominated
by React and the router, which do not split out this way.

Marking three gallery images eager instead of one also measured no better — they
compete with each other.

### Applied after the first Lighthouse run

| Change | Result |
|---|---|
| **Self-hosted Inter** — 47 KB variable latin subset, `font-display: swap`, preloaded, cached immutably | The design now renders in the typeface it was drawn in. CLS stayed at 0. |
| ~~`content-visibility: auto` on masonry items~~ | **Reverted — caused visible flickering.** See below. |
| **Truncated long grids** — Sketchbook shows 12 of 34 with a "Show all" button | Page weight **1529 KB → 1140 KB (−25%)** |

Mobile `/sketchbook` measured over four runs afterwards: 82, 86, 88, 87 —
**median 87**, up from 84–86, LCP unchanged at 4.0 s. The 82 was the first
request after deploy, against a cold CDN cache.

Mobile `/` Speed Index improved 4.2 s → 2.8 s.

Note the ±4 point spread across identical runs. Never draw a conclusion from a
single mobile Lighthouse run; take a median of three or more.

### Reverted: `content-visibility: auto` on masonry items

Added in the same pass, then removed after Josh reported flickering artwork in
the Comic Art and Sketchbook galleries.

Chrome discards the rendering of a subtree it has skipped and re-rasterises it
when the element becomes relevant again. Near a viewport edge that boundary can
be crossed repeatedly while scrolling, flashing the tile. Masonry compounds it,
because column layout depends on knowing every item's height.

It bought nothing measurable in the first place — the gains on these pages came
from truncating long grids and from responsive images.

**Do not reintroduce it without a scroll test on real hardware.** Headless
Chrome does not reproduce this: scrolling showed zero layout shifts, no tile
height changes and no unpainted in-view tiles. That false negative sent the
first fix after the wrong cause.

### Also fixed: hover oscillation

Found while investigating the flicker, and a genuine bug in its own right.

Tiles lifted 4px on hover. With the pointer resting near a tile's edge, the lift
moved the element out from under the cursor, ending the hover, dropping the tile
back under the cursor, and starting it again. A **stationary** pointer 2px inside
a tile's bottom edge produced `enter,leave,enter,leave,enter`.

Fixed in all three grids — gallery tiles, the Home featured grid, and the Film
photo grid — by removing the translate. Hover feedback now comes from the
border, shadow, image scale (clipped by `overflow`, so no layout change) and the
caption reveal.

Three tests in `ArtworkGallery.test.jsx` assert that no hover rule on a hit
target declares a `transform`. **Rule: hover must never move the element that
receives it.**

### Remaining ideas

- [ ] **Trim the sketchbook properly.** Truncation fixed the page weight, but
      `content-gaps.md` §3.4 still stands: 30 studies carry placeholder titles
      like "Sketchbook Study XIX". Cutting to the 10–15 genuinely worth showing
      is a curation call only Josh can make, and it improves the portfolio's
      signal-to-noise more than it improves the score.
- [ ] The sketchbook scans are photographed paper where sensor grain dominates
      file size — a 960w variant can reach 430 KB. Denoising before encoding
      measured ~18% smaller in testing but risks softening line work. Only worth
      doing with Josh's eyes on the result.
- [ ] `unused-javascript` still flags ~36 KB. This is React and the router
      themselves, not page code — see the reverted splitting experiment above.
      A genuinely smaller bundle would mean a lighter router, not more chunks.

---

## 5. Before merging to `main`

- [ ] Review the Netlify deploy preview for this branch
- [ ] Submit a test message through the contact form on the preview
- [ ] Confirm the redirect rule works: load `/comic-art` directly and refresh it
- [ ] Confirm build time is acceptable — the image step adds roughly a minute
      on a cold cache
