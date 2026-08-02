# Content Gaps

**Date:** 30 July 2026
**Purpose:** everything the website needs from Josh that does not exist in the repository today.

Nothing on this list can be written, invented or inferred in code. Where an answer is missing at build time it is recorded as a `TODO:` comment in `src/data/content.js` and **never rendered on the page**.

Ordered by how much it affects a portfolio review.

---

## Priority 1 — Blocking

These prevent the site from doing the job it is being rebuilt for. Without them the Sequential Art section cannot ship, and the site cannot honestly present Josh as a comic artist.

### 1.1 A complete comic sequence

**Needed:** at least one finished multi-page sequence — 3 to 6 pages is enough. More than one is better.

For each sequence:

| Field | Notes |
|---|---|
| Title | |
| Page order | Filenames numbered `01`, `02`, … or an explicit ordering |
| Year | |
| Page images | Full resolution, one file per page |
| Script/premise | 1–2 sentences of what happens — not a synopsis, just orientation |
| Storytelling note per page (optional) | Why a panel is laid out that way, where the eye goes, why a beat is held. **This is what portfolio reviewers actually respond to.** |
| Tools | Pencil/ink/digital, software |
| Original or exercise | Say plainly which it is |

**Nothing comparable exists in the repo.** The `fan-art` category is 10 strong single-panel character illustrations, which is illustration, not sequential art.

### 1.2 Process progression for at least one page

**Needed:** the same page shown at each stage — thumbnail → rough layout → pencils → inks → final.

Even one page carried through all five stages is worth more to a reviewer than five finished pages. It shows how Josh thinks, not just what he can render.

If a full five-stage set doesn't exist for any page, partial is still useful (rough → final).

### 1.3 A storyboard sequence

**Needed:** a storyboard presented as animation or comic work — a sequence of panels with shot numbers, and ideally an accompanying note on the action.

`public/images/process/storyboard.png` exists but is a **single image**, is referenced only by a disabled component, and its caption in `content.js` frames it as film pre-production ("communicate my vision to the crew"). If that storyboard is genuinely Josh's and represents a real sequence, the remaining panels and an accurate caption would make it usable.

---

## Priority 2 — High

Strongly expected in an animation-college and comic-review portfolio. Their absence is noticeable.

### 2.1 Character design sheet

A turnaround (front / three-quarter / side / back) and/or an expression sheet for one original character. The site currently shows finished character illustrations but nothing demonstrating design thinking — construction, consistency, model.

### 2.2 Visual development work

Environment designs, colour keys, prop designs, or a mood/colour study for a scene. Nothing of this kind is in the repo.

### 2.3 About page facts

The current About text is five paragraphs, film-weighted, and never mentions comics, animation training, or study plans. To write the Phase 8 bio the following are needed:

- [ ] Current study status — course, institution, year, or "applying to X for entry 20XX"
- [ ] Which colleges/courses he is applying to (only if he wants it public)
- [ ] Software he actually uses, confirmed. Known from the repo: **Autodesk Sketchbook**, **Adobe Premiere Pro**, **XP-Pen Artist 15.6** tablet, **XPPen Magic Drawing Pad**. Anything else — Photoshop, Clip Studio Paint, Procreate, After Effects, TVPaint, Toon Boom, Blender — must be confirmed, not assumed.
- [ ] What he is available for: internships, junior roles, collaborative projects, commissions
- [ ] Whether the CV PDF (`public/CV - Josh Moriarty-June 2026.pdf`) is current and safe to link publicly — it must not contain a home address, phone number or date of birth, since it is downloadable by anyone

### 2.4 A hero image

One piece — most likely one of the recent character works — suitable as the first thing a reviewer sees, and as the social-sharing preview at 1200 × 630. Confirm which piece Josh considers his strongest.

---

## Priority 3 — Medium

Fixes existing content that is thin, unlabelled or unverified.

### 3.1 Animation clip metadata

The three self-hosted clips (`res.mp4`, `oct.mp4`, `Animation16.gif`) and the two YouTube tests currently have generic captions. Each needs:

- [ ] Duration
- [ ] Software used
- [ ] Frame rate / whether it's on 1s or 2s
- [ ] **Original work, collaboration, or college/self-directed exercise** — the brief requires this to be explicit
- [ ] A poster frame (a still to show before playback)
- [ ] A proper title — "2D movement test" and "Character movement study" are placeholders

### 3.2 Clean-up examples

Two pairs exist and they are genuinely useful. Each needs:

- [ ] What the source drawing was, and whether it was Josh's own rough or someone else's
- [ ] Software used
- [ ] Year
- [ ] A one-line note on what the clean-up was solving — line weight consistency, volume preservation, readability

### 3.3 Film roles — verification

`content.js` assigns these roles. Several are on what look like solo shoots; the brief requires exact roles and no vague labels, so each needs confirming:

| Piece | Stated role | Confirm |
|---|---|---|
| Clothing Brand Photoshoot | Director, Cinematographer & Editor | [ ] |
| Clothing Brand Photoshoot 2 | Director, Cinematographer & Editor | [ ] |
| Demo Reel 2026 | Director, Cinematographer & Editor | [ ] |
| DJ Ortega | Cinematography & Editing | [ ] |
| DJ Ortega (Alt) | Cinematography & Editing | [ ] |
| Lockout at Sound House | Director of Photography | [ ] |
| DJ RHR | Editor & Colourist | [ ] |

"Director of Photography" on a one-person handheld shoot is likely to read as inflated to an industry reviewer. "Camera and edit" is stronger because it is plainly true.

### 3.4 Drawing gallery titles

30 pieces are titled "Sketchbook Study I" through "Sketchbook Study XXX" with rotating generic descriptions. This reads as filler and dilutes the strong work around it.

- [ ] Identify the 10–15 sketchbook pieces genuinely worth showing
- [ ] Give those real titles and one honest line each
- [ ] Retire the rest, or keep them behind a "more studies" toggle

The same applies to the seven pieces titled "Digital Artwork I–VII".

---

## Priority 4 — Low

Small corrections.

- [ ] `credits` lists **"Stick n Poke - Soundhouse" twice** (`content.js` entries 2 and 6) — is one of them a different date or venue, or is it a duplicate?
- [ ] Credits are all "Filmed and edited". Are there any drawing, animation, illustration or design credits to add?
- [ ] Photography collection image captions are single words — "Focus", "Control", "Atmosphere", "Intensity". Fine as texture, but they carry no information.
- [ ] Favicon is `/IMG_1073.jpeg`, an untitled photo. A mark or a cropped character detail would be better.
- [ ] Confirm the Instagram/YouTube handles are the ones Josh wants reviewers to see, and whether there are others (ArtStation, Behance, Tumblr, Bluesky).
- [ ] Confirm `joshmoriartyfilms@gmail.com` is the address to publish.

---

## What is *not* being asked for

To be explicit about content integrity — none of the following will be added to the site, and none should be supplied unless genuinely true:

- Client lists, commissions or paid work that hasn't happened
- Publication or exhibition credits
- Awards or competition placements
- Software proficiency that isn't real
- Collaborators or crew roles that overstate involvement
- Follower counts, view counts or engagement statistics
- The existing "20+ Events Covered" / "2 Visual Disciplines" counters — these are being removed as unverifiable

---

## Quick summary for Josh

If you can only do three things before the next portfolio review:

1. **One finished comic sequence, 3–6 pages, in reading order.**
2. **One of those pages photographed at each stage** — thumbnail, rough, pencils, inks, final.
3. **Confirm your study status, your real software list, and which single piece is your strongest.**

Those three unlock the Sequential Art section, the process section, and the whole home page.
