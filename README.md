# joshmoriartyfilms.ie

Portfolio site for Josh Moriarty — animation student, artist and filmmaker.

React 19 + Vite, deployed on Netlify.

---

## Local setup

Requires **Node 20.11** or later (matching the Netlify build) and **ffmpeg** if
you want poster frames generated for the self-hosted video clips. Without
ffmpeg the build still succeeds; the clips just fall back to no poster.

```bash
git clone https://github.com/dmoriart/Joshweb.git
cd Joshweb
npm install
npm run dev
```

The first `npm run dev` generates the web-ready images, which takes about a
minute. Runs after that are near-instant because unchanged files are skipped.

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Build images, then start the dev server |
| `npm run build` | Build images → generate sitemap → production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint over the whole project |
| `npm run build-images` | Regenerate image derivatives only (`--force` to rebuild all) |
| `npm run generate-sitemap` | Regenerate `public/sitemap.xml` from the route list |

---

## Project structure

```
media/                  Full-resolution source artwork. NEVER served directly.
public/                 Static files. public/images/ is GENERATED — do not edit.
scripts/
  build-images.mjs      Generates WebP derivatives, posters and the share card
src/
  routes.js             Routes, nav, site constants — one source of truth
  data/
    content.js          ALL site content lives here
    types.js            JSDoc typedefs for the content shapes
    image-manifest.json Generated. Maps source images to dimensions and widths
  components/           Reusable UI
  pages/                One file per route
  lib/                  Framework-free helpers (YouTube, image resolution)
docs/                   Review, content gaps, testing, deployment
```

---

## Updating content

**Everything editable lives in [`src/data/content.js`](src/data/content.js).**
You should not need to touch a component to add work.

### Adding artwork

1. Put the original file in `media/artwork/`. Use a descriptive filename —
   `moon-knight-inks.png`, not `IMG_1234.png`. It becomes part of the URL.
2. Add an entry to the `artworks` array:

   ```js
   {
     id: 67,                          // must be unique
     src: '/images/artwork/moon-knight-inks.png',   // note: /images/, not /media/
     title: 'Moon Knight',
     category: 'fan-art',             // see the category lists in the page files
     description: 'Digital character illustration',  // also used as alt text
     tools: 'Autodesk Sketchbook',    // optional
     year: '2026',                    // optional
     featured: true,                  // optional — promotes it to the home page
   }
   ```

3. Run `npm run dev`. The image pipeline picks up the new file automatically.

The `src` path points at `/images/...` even though the file lives in `media/`.
The build writes derivatives to `public/images/` mirroring the `media/` layout,
and `src/lib/images.js` resolves the rest.

### Adding a comic sequence

The `sequences` array is empty and the Sequential Art page is hidden until it
isn't. Filling it in makes the page and its nav entry appear automatically —
see the `SequenceItem` typedef in `src/data/types.js` for the shape, and
[`docs/content-gaps.md`](docs/content-gaps.md) for what to prepare.

### Adding a video

Add to `animations` (hosted on YouTube) or `motionClips` (self-hosted, in
`media/animation/`). Any YouTube URL shape works — `youtu.be/`, `watch?v=`,
`shorts/` or `embed/`.

### The one rule

**Never invent a fact to fill a field.** If you don't know the software, the
duration, or whether something was original work or an exercise, leave the
field out and add a comment:

```js
// TODO: Confirm the software used for this piece.
```

Nothing renders a TODO, and `npm test` fails if one ever reaches copy that
would be displayed. Outstanding gaps are catalogued in
[`docs/content-gaps.md`](docs/content-gaps.md).

---

## Images

Originals live in `media/` and are never served. `scripts/build-images.mjs`
generates, for each source image:

- `name-480.webp`, `name-960.webp`, `name-1440.webp` — the responsive `srcset`
- `name.webp` — capped at 2000px, used in the lightbox

It also records intrinsic dimensions in `src/data/image-manifest.json`, which is
what lets every `<img>` carry `width` and `height` and stops the page reflowing
as images arrive.

### Guidance

- **Use descriptive filenames.** They appear in URLs and matter for search.
- **Don't commit camera originals.** Anything over ~3000px on the long edge is
  bigger than the site will ever serve. See
  [`docs/deployment-notes.md`](docs/deployment-notes.md#repository-size).
- **Don't edit `public/images/`.** It is generated and gitignored; changes there
  are wiped on the next build.
- Quality sits at 80 for grid sizes and 76 for full size. Much of the artwork is
  photographed paper, where grain dominates file size — going lower eats line
  work without meaningfully shrinking the file.
- Use `<ResponsiveImage>` rather than a bare `<img>` so srcset and dimensions
  come along automatically.

---

## Deployment

Pushing to `main` deploys to production. Every other branch gets a Netlify
preview URL — use it, especially for anything touching the contact form, which
can only be tested on a deployed build.

Full detail, including the SPA redirect rule, caching, rollback and the
Netlify Forms arrangement, is in
[`docs/deployment-notes.md`](docs/deployment-notes.md).

---

## Documentation

| Document | Contents |
|---|---|
| [`docs/website-review.md`](docs/website-review.md) | The audit this rebuild came from — architecture, weaknesses, plan |
| [`docs/content-gaps.md`](docs/content-gaps.md) | What Josh still needs to supply, in priority order |
| [`docs/testing-checklist.md`](docs/testing-checklist.md) | Pre-deploy checks and current results |
| [`docs/deployment-notes.md`](docs/deployment-notes.md) | Hosting, headers, secrets, rollback |
