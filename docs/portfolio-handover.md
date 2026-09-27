# Portfolio update — handover

Covers Prompts 3–6 of [portfolio-review.md](portfolio-review.md). Prompts 1–2
(animation-first home page, nav, About) went live on 27 September 2026; see
[portfolio-update-plan.md](portfolio-update-plan.md).

## What changed

| Area | Change |
|---|---|
| New drawings | All 20 supplied photos recorded in `src/data/artwork-review.json`. **Smoke** (07) is published under Drawing & Comic Art → Figure Drawing, since Josh's authorship is confirmed. Development sketches 08 and 12 and composition study 15 were approved afterwards and lead the Sketchbook under "Development". The rest were then published as captured, pending better scans. Held back: 01 and 02 (to be rescanned) and the duplicate captures 05, 18 and 20. |
| Artwork titles (all) | The 35 remaining placeholder titles ("Sketchbook Study I–XXX", "Star Wars I–V" and so on) now describe what is visible. Characters are named only where unmistakable, and labelled fan art; the reflecting-sphere study credits M. C. Escher. A duplicate photo of one drawing (IMG_2046) no longer shows as a second card. |
| Pause motion | The looping clips have a Pause motion / Play motion toggle, and start paused for visitors who prefer reduced motion. GIFs swap to a generated still when paused. |
| Home drawings | Smoke replaces Masked Mercenary, which is still on Drawing & Comic Art. |
| Photography | Home page shows three picks (Skate Jump, Red Hat, and the DJ Silhouette film still) between Film and About, linking to `/film#photography`. Every photo caption was rewritten to describe what is visible. The DJ and Lockout images are labelled **film stills** in their own section, because each is a PAL DV frame (1353×1080 picture between black bars on a 1080p canvas, no camera metadata). Mark a photo `featured: true` in `photography` to put it on the home page. |
| Hero | Shortened so the animation clips come into view on the first screen at 1440×900. |
| Intake tooling | `npm run prepare-incoming` makes a public master only for approved records, plus a private contact sheet at `portfolio-incoming/review/index.html`. |
| Clean-Up | Hidden while the process was unconfirmed, then restored on 27 September 2026 once Josh confirmed he redrew the lines by hand (`processConfirmed` in `content.js`; a new pair starts unconfirmed). |
| About | Now says he studies animation at Stillorgan College (confirmed 27 September 2026). The course name and year are still to be added. |
| Animation titles | "2D movement test", "Character movement study", "Short animation experiment" and "Animation Test 1" now have descriptive titles and captions based on what each clip shows, and "Jump to Light Speed" is labelled as an animated comic panel. Clip lengths and frame counts were measured from the files. "Art Project 8" is unchanged because its content couldn't be identified reliably. |
| Artwork titles | "Digital Artwork I" → **Gold Mask**; "Digital Artwork VII" → **Invincible** (labelled fan art). |
| Film | A new **Selected Work** section leads the page: the reel plus three projects, with no alternate edits. Everything else follows in its groups. All credits are unchanged, including both "Stick n Poke - Soundhouse" entries. |
| Video thumbnails | Fixed YouTube's grey placeholder showing when a video has no high-resolution thumbnail (Lockout had this). |
| Tests | New checks that every approved record is published, nothing unapproved is, and at most one image per duplicate group goes public. |

## Files changed

`src/data/artwork-review.json` (new), `scripts/prepare-incoming.mjs` (new),
`media/artwork/smoke.jpeg` (new), `src/data/content.js`, `src/data/types.js`,
`src/data/content.test.js`, `src/data/image-manifest.json` (generated),
`src/pages/ComicArt.jsx`, `src/pages/AnimationPage.jsx`, `src/pages/Film.jsx`,
`src/pages/Film.css`, `src/pages/About.jsx`, `src/components/VideoEmbed.jsx`,
`src/routes.js`, `index.html`, `package.json`, `README.md`,
`docs/testing-checklist.md`, `docs/portfolio-update-plan.md`, this file.

## Checks completed

- `npm test`: 217 passed. `npm run lint`: clean. `npm run build`: succeeds.
- Build output: none of the 20 source filenames, the `review/` folder or the
  draft data (manifest text, the watermark handle) appear in `dist/`. Only the
  Smoke derivatives were added to `dist/images/artwork/`.
- Each page loaded in a real browser at 390, 768 and 1440 px (fixed-width
  iframes in headless Chrome): no horizontal overflow, one `h1`, no skipped
  heading levels, no image missing `alt`. The mobile menu toggle shows at 390
  and 768 and is hidden at 1440. Screenshots were checked for Home, Film and
  Drawing & Comic Art at 390, and for Film, Animation and Drawing & Comic Art at 1440.
- CV PDF, sitemap, new image derivatives and clip posters return 200 locally.
- Viewer behaviour is covered by the existing unit tests: Escape closes,
  focus returns to the opener, arrow keys page, Tab stays inside, background scroll is locked.

**Not tested:** a real phone or touch device, screen readers, the browser
console, clicking through every video embed, and the contact form (not
submitted, by design). Reduced-motion handling was not re-tested; it is
unchanged from before.

## Deployment

Hosting is unchanged: Netlify builds `main` (`npm run build`, publishes `dist/`),
and every pushed branch gets a preview URL. This work is on the
`portfolio-artwork-intake` branch. Nothing has been pushed or deployed.

**Next publication step (not done):** push the branch, check its Netlify
preview, then merge into `main`, which publishes to joshmoriartyfilms.ie.

## Maintenance guide

Local commands: `npm install`, then `npm run dev` (preview at the printed
localhost URL), `npm test`, `npm run lint`, `npm run build`, `npm run preview`
(serves the production build).

### Add one drawing

1. Put the original photo in `portfolio-incoming/`. That folder is private and
   gitignored; never put source photos in `public/`.
2. Add a record to `src/data/artwork-review.json` with `status: "draft"` and
   factual `alt` text. Leave unknown facts (medium, year, classification,
   source artist) as `null`.
3. Run `npm run prepare-incoming` and open `portfolio-incoming/review/index.html`
   to review it with Josh.
4. When approved: set `status: "approved"` and a `publicSrc` such as
   `/images/artwork/descriptive-name.jpeg`, then run `npm run prepare-incoming`
   again. This writes the public master to `media/artwork/`.
5. Add the entry to `artworks` in `src/data/content.js` (see the README). Label
   fan art and name the source artist for reference studies.
6. Run `npm run dev`. The build makes the responsive WebP sizes automatically.
   `npm test` fails if an approved record is missing from `content.js`.

For drawings photographed before this process existed, it's fine to skip steps
1–4 and put the original straight into `media/artwork/`.

**Avoiding duplicate captures:** give every capture of the same drawing the same
`group` in the manifest and approve only one of them. The tests enforce this.
Never present a raw photo and its corrected version as drawing stages.

**Image processing rules:** straighten, correct exposure and white balance
conservatively, and nothing more. No generative cleanup, no redrawn hands or
lines, no erased notes, credits or watermarks. If a photo is poor, recapture
the drawing: a flatbed scan, or square-on in soft, even light.

### Add one animation

- Short loop: put the `.mp4` or `.gif` in `media/animation/` and add it to
  `motionClips`. The build makes a poster frame if ffmpeg is installed.
  `featured: true` shows it on the home page.
- Longer piece: add a YouTube URL to `animations`.
- Titles describe what is visible. Put only measured facts in `meta`
  (e.g. `ffprobe` duration). Label animated comic panels as such.

### Add one film

Add an entry to `works` with the exact `role`. `featured: true` makes it the
reel shown on the home page and at the top of Film (use it on one entry only);
`selected: true` puts it in Film's Selected Work. Keep alternate edits unselected.

### Rollback

- Live site: Netlify → Deploys → pick the last good deploy → **Publish deploy**.
- Code: `git revert <commit>` (use `-m 1` for a merge commit) and push. This
  undoes one change without touching unrelated work. Don't use
  `git reset --hard` or force-push on `main`.

## Decisions still needed from Josh

1. **Animation:** his own titles for the three loops and "Art Project 8";
   software; original work or exercise; order.
2. **Film:** confirm Creative Reel as the lead reel and Clothing Brand
   Photoshoot, DJ Ortega and Lockout as the selected projects. Confirm the
   Creative Reel role ("Editor").
3. **Home drawings:** confirm Guardians, Moon Knight, Smoke, Self Portrait I
   and Rangefinder Camera.
4. **Artwork credits:** character/source for 14 (Judge Dredd) and 17; whether
   Gold Mask depicts an existing character; whether Smoke is an original figure
   or drawn from a reference.
5. **@j.cormacart:** is this Josh's account? Smoke is published from the
   unwatermarked photo (07), and the watermarked one (20) is excluded either way.
6. **Rescans:** fresh scans of 01 and 02, which are held until then. Better
   captures of the drawings published as photographed (03, 04, 06, 10, 11, 14,
   16, 17, 19) can replace their files in `portfolio-incoming/`; run
   `npm run prepare-incoming` again.
7. **19 orientation:** which way up is intended.
8. **Clean-Up details:** software and year for each pair (hand redrawing is
   confirmed).
9. **Film stills:** which DJ sets the DJ stills come from, so they can sit
   with the right project.
10. **08 and 12:** are they the same character? If so, they can be grouped as
   one project. Also: his own titles for any of the working titles.
11. **Course details and CV:** exact course name and year at Stillorgan College;
    whether the June 2026 CV is current.
