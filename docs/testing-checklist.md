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

- [x] Home title: `Josh Moriarty | Comic Artist, 2D Animator and Filmmaker`
- [x] Each route sets its own title, description and canonical
- [x] `Person` structured data lists the eight disciplines
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

Outstanding:

- [ ] Run Lighthouse against the deploy preview and record LCP / CLS / TBT
- [ ] Consider `content-visibility: auto` on the long sketchbook grid if the
      66-item page measures poorly

---

## 5. Before merging to `main`

- [ ] Review the Netlify deploy preview for this branch
- [ ] Submit a test message through the contact form on the preview
- [ ] Confirm the redirect rule works: load `/comic-art` directly and refresh it
- [ ] Confirm build time is acceptable — the image step adds roughly a minute
      on a cold cache
