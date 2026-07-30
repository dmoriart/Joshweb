/**
 * Portfolio data shapes.
 *
 * The project is plain JavaScript, so these are JSDoc typedefs rather than
 * TypeScript. Editors still get completion and type checking from them, and
 * `docs/testing-checklist.md` describes the data-integrity test that enforces
 * the required fields at build time.
 *
 * Rule for every field below: if the real answer isn't known, leave the field
 * out and add a `TODO:` comment beside the entry. Nothing renders a TODO, and
 * nothing is ever guessed — see docs/content-gaps.md.
 */

/**
 * A single still piece: illustration, character design, study or comic page.
 *
 * @typedef  {object} ArtworkItem
 * @property {number}  id
 * @property {string}  src          Path under /public.
 * @property {string}  title
 * @property {string}  category     Key from `artworkCategories`.
 * @property {string}  description  Doubles as the alt text.
 * @property {string}  [year]
 * @property {string}  [tools]      e.g. "Autodesk Sketchbook, XP-Pen Artist 15.6".
 * @property {boolean} [featured]   Surfaces the piece on the home page.
 */

/**
 * A moving piece: animation test, exercise or finished clip.
 *
 * Either `src` (self-hosted) or `url` (YouTube) must be present.
 *
 * @typedef  {object} AnimationItem
 * @property {string}  id
 * @property {string}  title
 * @property {string}  description
 * @property {'video'|'gif'|'youtube'} type
 * @property {string}  [src]        Self-hosted media under /public.
 * @property {string}  [url]        YouTube URL.
 * @property {string}  [poster]     Still shown before playback.
 * @property {string}  [duration]   e.g. "0:04".
 * @property {string}  [tools]
 * @property {string}  [year]
 * @property {'Original'|'Collaboration'|'Exercise'} [origin]
 *           Stated plainly so a reviewer never has to guess whether a piece
 *           was self-directed, briefed, or a study.
 * @property {boolean} [featured]
 */

/**
 * A before/after clean-up pair.
 *
 * @typedef  {object} CleanupItem
 * @property {number}  id
 * @property {string}  caption
 * @property {Array<{label: string, src: string}>} images  Ordered rough → clean.
 * @property {string}  [tools]
 * @property {string}  [year]
 */

/**
 * A film or video project.
 *
 * @typedef  {object} FilmItem
 * @property {string}  title
 * @property {string}  url
 * @property {string}  group        Key from `filmGroups`.
 * @property {string}  venue
 * @property {string}  description
 * @property {string}  year
 * @property {string}  category
 * @property {string}  role         Josh's exact contribution. Never "worked on".
 * @property {string}  [concept]
 * @property {string}  [challenge]
 * @property {string}  [technicalDetails]
 * @property {string}  [criticalAnalysis]
 * @property {string}  [outcome]
 */

/**
 * A multi-page comic or storyboard sequence, read in order.
 *
 * @typedef  {object} SequenceItem
 * @property {string}  id
 * @property {string}  slug         URL segment.
 * @property {string}  title
 * @property {string}  premise      One or two sentences of orientation.
 * @property {string}  year
 * @property {string}  [tools]
 * @property {'Original'|'Collaboration'|'Exercise'} origin
 * @property {Array<SequencePage>} pages  In reading order.
 * @property {Array<{label: string, src: string, note?: string}>} [process]
 *           Thumbnail → rough → pencils → inks → final for a single page.
 */

/**
 * @typedef  {object} SequencePage
 * @property {number}  number
 * @property {string}  src
 * @property {string}  alt
 * @property {string}  [note]  Why the page is laid out the way it is.
 */

export { };
