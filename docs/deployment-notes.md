# Deployment Notes

**Host:** Netlify · **Site ID:** `5a8cf505-bc77-4107-b3ef-635516fcfd4b`
**Production domain:** https://joshmoriartyfilms.ie
**Repository:** https://github.com/dmoriart/Joshweb

---

## How a deploy happens

Netlify builds from the repository. Configuration lives in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

`npm run build` runs three steps in order:

1. **`build-images`** — `scripts/build-images.mjs` reads `media/` and writes
   WebP derivatives plus `public/share-card.jpg` and `src/data/image-manifest.json`.
2. **`generate-sitemap`** — reads `src/routes.js` and writes `public/sitemap.xml`.
3. **`vite build`** — bundles the app and copies `public/` into `dist/`.

Node is pinned to **20.11.0** via `[build.environment]`.

### Build time

The image step is the slow part: roughly **60 seconds** for 110 source images
on a cold cache. Locally it is near-instant on repeat runs because outputs are
skipped when newer than their source, but Netlify starts clean each time, so
expect about a minute of additional build time per deploy.

If that becomes painful, the options in order of preference are:

1. Cache `public/images/` between builds with `netlify-plugin-cache`.
2. Downscale the committed originals in `media/` — see "Repository size" below.
3. Move derivative generation to a separate, manually-run step and commit the
   output. This trades repository size for build time.

---

## Redirects and headers

### SPA fallback

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**This is required.** The site now has seven client-side routes. Without this
rule, loading `/comic-art` directly — or refreshing on it — returns a 404,
because no such file exists in `dist/`. Netlify serves matching static files
first, so `/sitemap.xml`, `/robots.txt` and `/images/*` are unaffected.

Verify after any deploy by loading a sub-route directly and refreshing it.

### Caching

| Path | Policy | Why |
|---|---|---|
| `/assets/*` | `max-age=31536000, immutable` | Vite content-hashes these filenames, so they can never go stale |
| `/images/*` | `max-age=604800, stale-while-revalidate=86400` | Artwork filenames are **not** hashed. Josh may replace a file in place, so a week with background revalidation avoids stranding anyone on an old image for a year |

If an image ever needs to change immediately, either rename the source file in
`media/` or trigger a Netlify cache purge.

### Security headers

`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY` and a
`Permissions-Policy` denying camera, microphone, geolocation and FLoC.

**No Content-Security-Policy is set.** Adding one would need to allow
`youtube-nocookie.com` frames, `img.youtube.com` images and the Cloudflare
Insights beacon. A CSP that is subtly wrong is worse than none — it silently
breaks video. Worth adding deliberately, not as a footnote.

---

## Secrets

**There are none, and none are needed.**

- The Cloudflare Web Analytics token in `index.html` is a public beacon
  identifier, not a credential. It is meant to be in client source.
- The contact form posts to Netlify Forms, which needs no API key.
- The Google and Bing verification files in `public/` are public by design.

No `.env` file exists and no environment variables are required to build.
If that ever changes, add them in the Netlify UI under
**Site settings → Environment variables** — never in the repository.

---

## Contact form

Netlify Forms works through a two-part arrangement that is easy to break:

1. A **hidden static form** in `index.html` with `name="contact"`, which is what
   Netlify's build-time parser detects.
2. The **React form** in `ContactForm.jsx`, which POSTs url-encoded data to `/`
   with a matching `form-name` field.

Rules:

- **Field names must match between the two.** If you add a field to the React
  form, add it to the hidden form or Netlify will discard it.
- The option values in `PROJECT_TYPES` and in the hidden `<select>` are kept in
  sync deliberately. Both were updated when the form moved from film-focused
  categories to illustration, animation, film and collaboration.
- Spam is handled by `netlify-honeypot="bot-field"`. No third-party script, no
  keys in the client.
- **A form can only be verified on a deployed build.** Netlify registers it
  during the build; submitting locally will not work.

Submissions appear under **Forms** in the Netlify dashboard. Check that email
notifications are configured, otherwise messages arrive silently.

---

## Repository size

`.git` is around **389 MB**, and `media/` is **368 MB**, because full-resolution
originals were committed — some at 17 MB each. Everything still works, but
clones and CI checkouts are slow.

This has deliberately **not** been changed, because destroying originals is
Josh's call, not a maintenance decision. Two options when he wants to act:

**Option A — downscale the originals (recommended).** A 2400px cap is far more
than the site ever serves and keeps a comfortable master:

```bash
# Preview what would change first.
node -e "
const sharp=require('sharp'), fs=require('fs');
for (const f of process.argv.slice(1)) {
  sharp(f).metadata().then(m => console.log(f, m.width+'x'+m.height));
}" media/artwork/*.png
```

Shrinking new commits only affects future size — the history keeps the old
blobs. A full reduction needs `git filter-repo` and a force push, which
rewrites history for anyone else with a clone.

**Option B — move originals out of git.** Keep `media/` in cloud storage and
fetch it during the build. Cleaner long-term, more moving parts.

Going forward: commit optimised sources, not camera originals. Anything over
about 3000px on the long edge is larger than the site will ever use.

---

## Rollback

Every deploy is immutable and independently addressable.

1. Netlify dashboard → **Deploys**
2. Pick the last known-good deploy
3. **Publish deploy**

This takes effect in seconds and needs no rebuild. For a code-level revert,
each change in this branch is a self-contained commit, so `git revert <sha>`
works cleanly per stage.

---

## Branch previews

Every branch pushed to GitHub gets its own Netlify preview URL. Use it before
merging to `main` — `main` publishes straight to the live domain.

The `redesign/portfolio-foundation` branch should be reviewed on its preview,
including a live contact-form submission, before it goes to production.

---

## Domain and DNS

- Primary: `joshmoriartyfilms.ie`
- The domain still reads as film-first, and the site is now positioned around
  comic art and animation. It has deliberately been kept: it is on the CV, it
  carries the existing search history, and changing it would cost more than it
  gains. The **site name** was changed to "Josh Moriarty" instead — `og:site_name`,
  the wordmark and the footer no longer say "Josh Moriarty Films".

---

## Post-deploy tasks

After this branch reaches production:

- [ ] Re-submit `sitemap.xml` in Google Search Console — it went from 1 URL to 7
- [ ] Re-submit in Bing Webmaster Tools (`BingSiteAuth.xml` is already in place)
- [ ] Validate the new share card in the LinkedIn, Facebook and X debuggers;
      each caches aggressively and needs a manual re-scrape
- [ ] Confirm old inbound links still work — the previous site used hash anchors
      (`/#work`, `/#artwork`), which now land on the home page rather than
      404ing. Consider redirect rules if any are actively shared:
      ```toml
      [[redirects]]
        from = "/"
        to = "/film"
        status = 301
        force = false
        conditions = {}   # hash fragments are client-side; a JS redirect is
                          # the only way to map them
      ```
      Hash fragments never reach the server, so this needs a small script in
      `Home.jsx` if it matters. It probably does not.
