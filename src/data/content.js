/**
 * Central content source for the whole site.
 *
 * Shapes are documented in ./types.js. Editing guidance, including how to add
 * artwork and what must never be invented, is in the README.
 *
 * @typedef {import('./types.js').ArtworkItem}   ArtworkItem
 * @typedef {import('./types.js').AnimationItem} AnimationItem
 * @typedef {import('./types.js').CleanupItem}   CleanupItem
 * @typedef {import('./types.js').FilmItem}      FilmItem
 * @typedef {import('./types.js').SequenceItem}  SequenceItem
 */

/**
 * Multi-page comic and storyboard sequences, in reading order.
 *
 * Deliberately empty: no sequential-art assets exist in this repository yet.
 * The Sequential Art page and its nav entry stay hidden while this is empty,
 * rather than shipping a placeholder. See docs/content-gaps.md §1.1–1.3 for
 * exactly what is needed.
 *
 * @type {SequenceItem[]}
 */
export const sequences = [];

/** Groupings for the film page. @see FilmItem.group */
export const filmGroups = [
    { key: 'all', label: 'All Film Work' },
    { key: 'reel', label: 'Reel' },
    { key: 'fashion', label: 'Fashion & Brand' },
    { key: 'music', label: 'Live Music' },
    { key: 'editing', label: 'Editing & Colour' },
];

/**
 * Film and video projects.
 *
 * `featured` is the reel that leads Film (and the home page); `selected`
 * marks the few projects shown with it before everything else. The current
 * selection is provisional — the first main cut from each group, never an
 * alternate edit.
 * TODO: Confirm the reel and the selected projects with Josh.
 *
 * TODO: Verify every `role` below with Josh. Several of these appear to be
 * solo shoots, and "Director of Photography" on a one-person handheld gig
 * reads as inflated to an industry reviewer — "Camera and edit" is stronger
 * because it is plainly true. See docs/content-gaps.md §3.3.
 *
 * @type {FilmItem[]}
 */
export const works = [
    {
        title: 'CLOTHING BRAND PHOTOSHOOT',
        url: 'https://youtu.be/HpGS_WcvOBM',
        selected: true,
        type: 'djs',
        group: 'fashion',
        venue: 'Dublin',
        description: 'A clothing brand photoshoot set against Dublin\'s gritty urban backdrop, captured with the raw, authentic grain of DV tape cinematography.',
        year: '2026',
        category: 'Commercial',
        role: 'Director, Cinematographer & Editor',
        concept: 'Blending streetwear fashion with Dublin\'s raw urban landscape to create an authentic, textured visual identity for the brand.',
        challenge: 'Balancing the commercial demands of a fashion shoot with the lo-fi aesthetic of DV tape, ensuring the clothing pops while maintaining the gritty atmosphere.',
        technicalDetails: 'Sony PD170 | MiniDV | Natural & Practical Lighting | Handheld',
        criticalAnalysis: 'Shooting on DV gave it a tactile, analogue feel that suited the streetwear and kept it grounded in a real setting rather than a polished studio look.',
        outcome: 'A short brand video that captured the energy of the shoot and the urban setting of the clothing.'
    },
    {
        title: 'CLOTHING BRAND PHOTOSHOOT 2',
        url: 'https://youtube.com/shorts/1g72m-MM1m4',
        type: 'djs',
        group: 'fashion',
        venue: 'Dublin',
        description: 'A second clothing brand photoshoot capturing the raw textures of Dublin\'s car park backdrops with the unmistakable grain of DV tape.',
        year: '2026',
        category: 'Commercial',
        role: 'Director, Cinematographer & Editor',
        concept: 'Continuing the urban fashion series with a grittier, more intimate perspective on streetwear in Dublin\'s concrete landscapes.',
        challenge: 'Working within the vertical format while maintaining the cinematic DV tape aesthetic and ensuring the clothing remains the focal point against harsh industrial backdrops.',
        technicalDetails: 'Sony PD170 | MiniDV | Practical Lighting | Handheld',
        criticalAnalysis: 'The vertical format worked well for the portrait-style fashion framing, and the DV grain gave it a more authentic feel than a clean digital shoot.',
        outcome: 'One of the pieces I included in my demo reel.'
    },
    {
        title: 'CREATIVE REEL 2026',
        url: 'https://youtu.be/HRsAaCGVGRo',
        type: 'djs',
        group: 'reel',
        venue: 'Various Locations',
        description: 'A reel bringing together hand-drawn movement and DV cinematography — rhythm, light and atmosphere across both sides of the work.',
        year: '2026',
        category: 'Reel',
        // TODO: Confirm the exact role and the list of pieces included.
        role: 'Editor',
        // Home page film preview. Provisional: it was the site's lead reel
        // before moving to Film, and no other selection has been made yet.
        // TODO: Confirm with Josh which film should represent him on the home page.
        featured: true,
    },
    {
        title: 'DEMO REEL 2026',
        url: 'https://youtu.be/IUF6f7UPeaQ',
        type: 'djs',
        group: 'reel',
        venue: 'Various Locations',
        description: 'A curated compilation of underground moments from Dublin\'s music scene—raw performances, intimate DJ sets, and the authentic energy of DV tape cinematography.',
        year: '2026',
        category: 'Demo Reel',
        role: 'Director, Cinematographer & Editor',
        concept: 'Showcasing the breadth of underground club culture documentation across multiple venues and artists.',
        challenge: 'Selecting and sequencing the most compelling moments from dozens of hours of footage while maintaining narrative flow and rhythmic pacing.',
        technicalDetails: 'Sony PD170 | MiniDV | Mixed Lighting Conditions | Multi-venue Compilation',
        criticalAnalysis: 'Putting it together helped me see a consistent style starting to form across different venues and subjects, with the DV look tying the clips together.',
        outcome: 'A showreel pulling together some of my favourite moments from the past year of filming.'
    },
    {
        title: 'DJ ORTEGA',
        url: 'https://youtu.be/mo90B3F9Lkk',
        selected: true,
        type: 'djs',
        group: 'music',
        venue: 'Wigwam',
        description: 'DJ Ortega\'s set recorded live at Wigwam on 4th July 2025, capturing the energy of the crowd and the night.',
        year: '2025',
        category: 'DJ Set',
        role: 'Cinematography & Editing',
        concept: 'To capture the frenetic energy of the crowd and the DJ\'s performance using rapid cuts and close-ups.',
        challenge: 'The venue was extremely dark with rapidly flashing strobes. I had to manually ride the gain on the PD170 to balance exposure without introducing excessive noise, while anticipating the lighting cues.',
        technicalDetails: 'Sony PD170 | MiniDV | Manual Exposure | Interlaced 50i',
        criticalAnalysis: 'The DV tape added a grit that suited the underground techno, and the 50i motion gave the movement a fluid feel that matched the pace of the track.',
        outcome: 'One of my earlier live sets — good practice at filming in a fast-moving, low-light venue.'
    },
    {
        title: 'DJ ORTEGA (ALT)',
        url: 'https://youtu.be/VDjuqnk_Gqs',
        type: 'djs',
        group: 'music',
        venue: 'Wigwam',
        description: 'A focused, technical perspective on DJ Ortega\'s set. This cut strips away the crowd to focus purely on the craft of mixing.',
        year: '2025',
        category: 'DJ SET',
        role: 'Cinematography & Editing',
        concept: 'Focusing on the interaction between the DJ and the equipment, highlighting the technical skill involved.',
        challenge: 'Maintaining focus on small buttons and mixers in a chaotic, vibrating environment. I used a heavier tripod setup to dampen the floor vibrations from the bass.',
        technicalDetails: 'Sony PD170 | Telephoto Macro | Tripod Locked | 4:3 Aspect Ratio',
        criticalAnalysis: 'The more static approach gave a clearer view of the mixing, a nice contrast to the busier crowd shots.',
        outcome: 'An alternative cut focusing on the technical side of the set.'
    },
    {
        title: 'LOCKOUT AT SOUND HOUSE',
        url: 'https://youtu.be/GabbIXxuWKU',
        selected: true,
        type: 'bands',
        group: 'music',
        venue: 'Sound House',
        description: 'Raw underground energy captured through analogue grain. Lockout\'s punk energy meets the texture of magnetic tape.',
        year: '2025',
        category: 'Live Performance',
        role: 'Director of Photography',
        concept: 'Documenting the raw, unpolished nature of a live punk performance using handheld movement.',
        challenge: 'The mosh pit was intense, requiring physical resilience to keep the camera steady while being pushed. Audio levels peaked constantly, requiring on-the-fly adjustment of the XLR input levels.',
        technicalDetails: 'Sony PD170 | XLR Audio Recording | Handheld Rig | Wide Angle Adapter',
        criticalAnalysis: 'The handheld movement matched the chaos of the gig, and the tape dropouts and shutter artefacts became part of the look rather than mistakes.',
        outcome: 'A raw, hands-on shoot in the middle of a busy punk gig.'
    },
    {
        title: 'DJ RHR',
        url: 'https://youtu.be/qPzb5GKsq58',
        type: 'djs',
        group: 'editing',
        venue: 'Wigwam',
        description: 'DJ RHR\'s live set — a short edit focused on rhythm and light.',
        year: '2025',
        category: 'DJ SET',
        role: 'Editor & Colourist',
        concept: 'Creating a rhythmic edit that syncs perfectly with the beat of the track.',
        challenge: 'Syncing 50i video footage with high-fidelity digital audio master tracks without drift. Colour grading the flat DV footage to bring out the neons without crushing the blacks.',
        technicalDetails: 'Adobe Premiere Pro | DV Capture via Firewire | Lumetri Color | Rhythm Edit',
        criticalAnalysis: 'Pacing mattered most here — I tried to build the edit around the musical drops, and leaned the colour grade into the cyan/magenta shift coming off the CRT monitors in the venue.',
        outcome: 'An edit focused on cutting to the beat of the track.'
    }
];

/**
 * Short, self-hosted 2D movement loops, rendered inline as muted autoplay
 * loops (videos) or as a GIF — the fastest way to show movement to a reviewer.
 *
 * Titles and captions describe what is visible in each clip; `meta` holds
 * measurements read from the files. Nothing here states intent or software.
 *
 * TODO: Confirm software and whether each is original work or a
 * college/self-directed exercise. Replace the descriptive titles with Josh's
 * own names for these pieces if they have them.
 *
 * @type {AnimationItem[]}
 */
export const motionClips = [
    {
        id: 'res',
        type: 'video',
        src: '/images/animation/res.mp4',
        title: 'Hooded Figure in the Rain',
        caption: 'Star Wars fan animation: a hooded figure walks with clone troopers through rain, ending on an explosion.',
        meta: '3.2 s loop',
        featured: true,
    },
    {
        id: 'oct',
        type: 'video',
        src: '/images/animation/oct.mp4',
        title: 'Leap onto the Droid',
        caption: 'Star Wars fan animation: a figure leaps up and lands on top of a three-legged combat droid.',
        meta: '3.3 s loop',
        featured: true,
    },
    {
        id: 'anim16',
        type: 'gif',
        src: '/images/animation/Animation16.gif',
        title: 'Action Test with Smear Frame',
        caption: 'Frame-by-frame action test that uses a smear frame for the fastest move.',
        meta: '26 frames at 12 fps',
    },
];

/**
 * Hosted animation pieces.
 *
 * TODO: Confirm duration for both pieces.
 * TODO: Confirm whether each is original work or a college exercise.
 * TODO: "Art Project 8" keeps its placeholder title: the content cannot be
 * identified reliably enough from outside to give it an accurate one.
 *
 * @type {AnimationItem[]}
 */
export const animations = [
    {
        id: 2,
        type: 'youtube',
        title: 'Jump to Light Speed',
        url: 'https://youtu.be/amqhi52QMLY',
        // An animated comic panel, not full character animation.
        description: 'Animated comic panel: a transport ship makes the jump to light speed beneath a caption box. Drawn on a tablet.',
        year: '2026',
        category: 'Test',
        tools: 'Autodesk Sketchbook, XP-Pen Artist 15.6',
        technicalDetails: 'Autodesk Sketchbook using an XP-Pen Artist 15.6 drawing tablet',
        featured: true,
    },
    {
        id: 3,
        type: 'youtube',
        title: 'Art Project 8',
        url: 'https://youtu.be/HB9AqAWKESM',
        description: 'Sample animation exploring movement and form, hand-drawn digitally using Sketchbook on an XP-Pen Artist 15.6 drawing tablet.',
        year: '2026',
        category: 'Sample',
        tools: 'Autodesk Sketchbook, XP-Pen Artist 15.6',
        technicalDetails: 'Autodesk Sketchbook using an XP-Pen Artist 15.6 drawing tablet',
    },
];

// The Creative Reel moved to `works` (group 'reel') on 2026-08-02. It leads
// with live-action footage, so opening the animation page with it showed a
// reviewer cinematography before any drawn work. The animation page now opens
// on the 2D movement tests instead.
//
// TODO: An animation-only reel would be the strongest single addition to the
// animation page. See docs/content-gaps.md §3.1.

/**
 * Every still piece on the site.
 *
 * `featured: true` promotes a piece to the home page. Keep that list short —
 * five is what the home grid lays out cleanly (lead tile + four), and more
 * stops reading as a selection. Keep some observational work in it alongside
 * the finished illustration, so the home page shows range rather than only
 * fan art (docs/portfolio-review.md §2).
 *
 * Titles and descriptions describe what is visible. Characters are named only
 * where unmistakable, and labelled fan art; source artists are named for
 * studies when known.
 * TODO: Josh to replace working titles with his own where he has them, and
 * trim the Sketchbook to the drawings genuinely worth showing
 * (docs/content-gaps.md §3.4).
 *
 * @type {ArtworkItem[]}
 */
export const artworks = [
    // Latest character work — the strongest pieces for a comic portfolio review.
    // TODO: Confirm the software and year for these five pieces.
    { id: 66, src: '/images/artwork/1000005511.png', title: 'Guardians', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 62, src: '/images/artwork/1000005510.png', title: 'Masked Mercenary', category: 'fan-art', description: 'Digital character illustration' },
    { id: 63, src: '/images/artwork/1000006079.png', title: 'Moon Knight', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 64, src: '/images/artwork/1000005515.png', title: 'Sith Lord', category: 'fan-art', description: 'Digital character illustration' },
    { id: 65, src: '/images/artwork/1000005520.png', title: 'Descent', category: 'fan-art', description: 'Digital character illustration' },

    // Digital illustration — tools confirmed from the original descriptions.
    { id: 55, src: '/images/artwork/25b9fafb-b8ed-463e-b5f2-46c2ae4c2366.png', title: 'Gold Mask', category: 'digital', description: 'Digital portrait of a figure in an ornate gold mask and a red hood', tools: 'XPPen Magic Drawing Pad, Autodesk Sketchbook' },
    { id: 61, src: '/images/artwork/de75bddc-dc52-445b-be0e-5714c0692112.png', title: 'Invincible', category: 'fan-art', description: 'Digital fan art of Invincible, in profile', tools: 'XPPen Magic Drawing Pad, Autodesk Sketchbook' },

    // Drawings on paper from the September 2026 intake. Only records marked
    // 'approved' in ./artwork-review.json belong here; see that file for the
    // drafts still awaiting a decision.
    { id: 67, src: '/images/artwork/smoke.jpeg', title: 'Smoke', category: 'figure', description: 'Black-and-white drawing of a figure in a jacket and wide trousers, head tilted back, breathing out a large stylised cloud of smoke', featured: true },
    // Development and composition sketches: shown first on Sketchbook so the
    // process is visible. 68 and 70 are kept separate until Josh confirms
    // whether they are the same character.
    { id: 68, src: '/images/artwork/armoured-swordsman-sketch.jpeg', title: 'Armoured Swordsman (Development)', category: 'development', description: 'Development sketch of an armoured figure standing with a sword, with handwritten notes about proportions and armour' },
    { id: 69, src: '/images/artwork/airborne-figure-sketch.jpeg', title: 'Airborne Figure (Development)', category: 'development', description: "Development sketch of an airborne figure aiming a weapon, with handwritten notes including 'Star Wars inspired'" },
    { id: 70, src: '/images/artwork/rooftop-confrontation-study.jpeg', title: 'Rooftop Confrontation (Composition Study)', category: 'development', description: 'Composition study of a fantasy confrontation on a rooftop, with a wide, detailed background' },

    // Rest of the September 2026 intake, published as captured while better
    // scans are made (01 and 02 are held for rescanning). Titles are working
    // titles; 81's orientation is as photographed, still to be confirmed.
    { id: 71, src: '/images/artwork/creature-and-caped-figure.jpeg', title: 'Looming Creature', category: 'sketchbook', description: 'Heavily hatched drawing of a large creature looming over a caped figure' },
    { id: 72, src: '/images/artwork/leaping-combat.jpeg', title: 'Leaping Attack', category: 'figure', description: 'Drawing of two figures in combat, one leaping down on the other along a strong diagonal, with a red accent' },
    { id: 73, src: '/images/artwork/explosion-ensemble.jpeg', title: 'Beneath the Explosion', category: 'figure', description: 'Drawing of a group of figures in action beneath a large billowing explosion' },
    { id: 74, src: '/images/artwork/judge-dredd.jpeg', title: 'Judge Dredd', category: 'fan-art', description: 'Black-and-white fan art of Judge Dredd aiming a pistol at the viewer' },
    { id: 75, src: '/images/artwork/staff-raised.jpeg', title: 'Staff Raised', category: 'fan-art', description: 'Fan art of an armoured creature raising a staff overhead with both hands' },
    { id: 76, src: '/images/artwork/construction-grid.jpeg', title: 'Construction Grid', category: 'development', description: 'Crouching figure with arms raised, drawn over a red construction grid' },
    { id: 77, src: '/images/artwork/pose-sheets.jpeg', title: 'Pose Sheets', category: 'development', description: 'Two overlapping sheets of character pose drawings' },
    { id: 78, src: '/images/artwork/cyclops.jpeg', title: 'Facing the Cyclops', category: 'development', description: 'Composition sketch of a small armed figure facing a giant cyclops, with perspective guide lines' },
    { id: 79, src: '/images/artwork/winged-figure-landscape.jpeg', title: 'Winged Figure in a Landscape', category: 'sketchbook', description: 'Drawing of a winged figure in the foreground and a distant armoured figure in a wide landscape' },
    { id: 80, src: '/images/artwork/eye-beams.jpeg', title: 'Eye Beams', category: 'sketchbook', description: 'Drawing of a caped, muscular figure firing beams upward from the eyes' },
    { id: 81, src: '/images/artwork/falling-figure.jpeg', title: 'Falling Figure', category: 'sketchbook', description: 'Foreshortened drawing of an armoured figure falling towards the viewer' },

    // Self Portraits
    { id: 1, src: '/images/artwork/Selfportrait1.jpeg', title: 'Self Portrait I', category: 'self-portraits', description: 'Observational self portrait exploring likeness and tonal range', featured: true },
    { id: 2, src: '/images/artwork/Selfportrait2.jpeg', title: 'Self Portrait II', category: 'self-portraits', description: 'Study in proportion and expression' },
    { id: 4, src: '/images/artwork/Selfportrait4.jpeg', title: 'Self Portrait IV', category: 'self-portraits', description: 'Expressive self portrait capturing mood and character' },

    // Star Wars Fan Art
    { id: 5, src: '/images/artwork/Star Wars1.jpeg', title: 'Mandalorian Helmet', category: 'fan-art', description: 'Colour Star Wars fan art of a Mandalorian helmet and armour, split by a diagonal slash' },
    { id: 6, src: '/images/artwork/Star Wars2.jpeg', title: 'General Grievous', category: 'fan-art', description: 'Colour Star Wars fan art of General Grievous with his cape spread wide' },
    { id: 7, src: '/images/artwork/Star Wars3.jpeg', title: 'Hooded Alien', category: 'fan-art', description: 'Colour Star Wars fan art of a green-skinned alien with red eyes in a red hood' },
    { id: 8, src: '/images/artwork/Star Wars4.jpeg', title: 'Clone Trooper Helmet', category: 'fan-art', description: 'Shaded Star Wars fan art of a clone trooper helmet' },
    { id: 9, src: '/images/artwork/Star Wars5.jpeg', title: 'Armoured Alien', category: 'fan-art', description: 'Colour Star Wars fan art of a blue-armoured alien figure with arms spread' },

    // View & Viewpoint
    { id: 10, src: '/images/artwork/View and viewpoint1.jpeg', title: 'Sony Camcorder', category: 'viewpoint', description: 'Observational drawing of a Sony camcorder, with the label picked out in gold' },
    { id: 11, src: '/images/artwork/View and viewpoint2.jpeg', title: 'Rangefinder Camera', category: 'viewpoint', description: 'Observational drawing of a FED rangefinder camera', featured: true },
    { id: 12, src: '/images/artwork/View and viewpoint3.jpeg', title: 'Reflecting Sphere', category: 'viewpoint', description: 'Perspective study of a figure and room reflected in a sphere held in a hand, after M. C. Escher’s Hand with Reflecting Sphere' },
    { id: 13, src: '/images/artwork/View and viewpoint4.jpeg', title: 'View Through a Ring', category: 'viewpoint', description: 'Perspective study of a room seen past a large ring, with red perspective lines' },
    { id: 14, src: '/images/artwork/View and viewpoint5.jpeg', title: 'Eye Study', category: 'viewpoint', description: 'Study of an eye, half of it rendered in tone' },

    // Music (now merged with Street)

    // Street

    // Photoshoot
    { id: 22, src: '/images/artwork/Photoshoot1.jpeg', title: 'Two Seated Figures', category: 'photoshoot', description: 'Colour figure drawing from photographic reference: two seated figures in streetwear, faces left blank' },
    { id: 23, src: '/images/artwork/Photoshoot2.jpeg', title: 'Camera Operator', category: 'photoshoot', description: 'Colour figure drawing from photographic reference: a figure in a red hoodie beside a camera operator in camouflage' },

    // Sketchbook & Studies
    { id: 25, src: '/images/artwork/IMG_1080.jpeg', title: 'Money Skull', category: 'sketchbook', description: 'Line drawing of a skull with dollar-sign eyes over banknotes, lettered MONEY' },
    { id: 28, src: '/images/artwork/IMG_1098.jpeg', title: 'Tonal Portrait', category: 'sketchbook', description: 'Heavily shaded portrait study with strong contrast' },
    { id: 29, src: '/images/artwork/IMG_1099.jpeg', title: 'Portrait with Red Lips', category: 'sketchbook', description: 'Shaded portrait of a woman with long dark hair and red lips' },
    { id: 30, src: '/images/artwork/IMG_1102.jpeg', title: 'Faces in Shadow', category: 'sketchbook', description: 'Group of faces drawn in high-contrast black and white' },
    { id: 31, src: '/images/artwork/IMG_1105.jpeg', title: 'Smoking Portrait', category: 'sketchbook', description: 'Shaded portrait of a man with a cigarette' },
    { id: 32, src: '/images/artwork/IMG_1106.jpeg', title: 'Face in the Dark', category: 'sketchbook', description: 'High-contrast drawing of a face emerging from solid black' },
    { id: 33, src: '/images/artwork/IMG_1107.jpeg', title: 'Skull in a Helmet', category: 'sketchbook', description: 'Black-and-white drawing of a skull wearing a written-on military helmet' },
    { id: 35, src: '/images/artwork/IMG_1110.jpeg', title: 'Gunslinger', category: 'sketchbook', description: 'Black-and-white drawing of a figure in a wide-brimmed hat and long coat' },
    { id: 36, src: '/images/artwork/IMG_1111.jpeg', title: 'Soldier', category: 'sketchbook', description: 'Black-and-white drawing of a soldier in a helmet and gear' },
    { id: 37, src: '/images/artwork/IMG_1112.jpeg', title: 'Grinning Face', category: 'sketchbook', description: 'High-contrast black-and-white drawing of a grinning face' },
    { id: 38, src: '/images/artwork/IMG_1113.jpeg', title: 'Wolverine', category: 'sketchbook', description: 'Black-and-white fan art of Wolverine with his claws raised' },
    { id: 39, src: '/images/artwork/IMG_1114.jpeg', title: 'Man in Sunglasses', category: 'sketchbook', description: 'Black-and-white drawing of a man in sunglasses and a long coat' },
    { id: 40, src: '/images/artwork/IMG_1115.jpeg', title: 'Hellboy', category: 'sketchbook', description: 'Black-and-white fan art of Hellboy' },
    { id: 42, src: '/images/artwork/IMG_2041.jpeg', title: 'Rainbow Hillside', category: 'sketchbook', description: 'Colour drawing of two figures on a green hill beneath a tree and a rainbow' },
    { id: 43, src: '/images/artwork/IMG_2042.jpeg', title: 'Long-Haired Figure', category: 'sketchbook', description: 'Shaded drawing of a long-haired figure with a cigarette' },
    { id: 44, src: '/images/artwork/IMG_2043.jpeg', title: 'Pig Mask', category: 'sketchbook', description: 'Line drawing of a figure in a pig mask, smoking, at an electronic music machine' },
    { id: 45, src: '/images/artwork/IMG_2044.jpeg', title: 'Fire Escape', category: 'sketchbook', description: 'Shaded drawing of an apartment building with a fire escape and a hand-lettered caption' },
    { id: 46, src: '/images/artwork/IMG_2045.jpeg', title: 'Man in the Rain', category: 'sketchbook', description: 'Shaded drawing of a bald man in a suit with a mark on his forehead, between umbrellas in the rain' },
    // IMG_2046.jpeg (formerly id 47) is a second photo of id 46; one card per drawing.
    { id: 49, src: '/images/artwork/IMG_2247.jpeg', title: 'Graffiti Lettering', category: 'sketchbook', description: 'Blue bubble-letter graffiti piece' },
    { id: 51, src: '/images/artwork/IMG_1138.jpeg', title: 'Stairway', category: 'sketchbook', description: 'Perspective sketch of figures on a stairway in front of a building' },
    { id: 52, src: '/images/artwork/IMG_1139.jpeg', title: 'Skateboarder', category: 'sketchbook', description: 'Shaded drawing of a skateboarder mid-trick, dated 29 August 2024, with handwritten notes' },
    { id: 53, src: '/images/artwork/IMG_1140.jpeg', title: 'Cluttered Room', category: 'sketchbook', description: 'Line drawing of a room interior crowded with shelves and equipment' },
    { id: 54, src: '/images/artwork/IMG_1146.jpeg', title: 'Seated Figure from Below', category: 'sketchbook', description: 'Character drawing in marker and ink of a seated figure seen from below' },
];

/**
 * Clean-up before-and-after pairs. Each entry runs rough original → cleaned up.
 * Drop new photos into /public/images/cleanup/ and set each image's `src`.
 *
 * `processConfirmed` gates each pair on the Animation page. Both are held
 * (docs/portfolio-review.md §2, priority 3): they are only shown as clean-up
 * once Josh confirms he redrew the lines by hand. If they turn out to be
 * something else, describe the actual process instead.
 *
 * TODO: Confirm how each clean-up was made, the software, and the year.
 * TODO: Confirm whether the source rough was Josh's own drawing or supplied.
 *
 * @type {CleanupItem[]}
 */
export const cleanups = [
    {
        id: 1,
        processConfirmed: false,
        caption: 'Self-directed clean-up exercise: a rough original drawing refined into clean, consistent line work while preserving the character pose and readability.',
        images: [
            { label: 'Original', src: '/images/cleanup/clean1.png' },
            { label: 'Cleaned up', src: '/images/cleanup/clean2.png' },
        ],
    },
    {
        id: 2,
        processConfirmed: false,
        caption: 'Further clean-up study showing the same refinement from rough drawing to tidied line work.',
        images: [
            { label: 'Original', src: '/images/cleanup/Screenshot_20260614-210212.png' },
            { label: 'Cleaned up', src: '/images/cleanup/Screenshot_20260614-210352.png' },
        ],
    },
];

export const photography = [
    {
        id: 'brand',
        title: 'Clothing Brand Campaign',
        orientation: 'portrait',
        description: 'Commercial fashion photography focusing on urban aesthetics and texture.',
        images: [
            { id: 'b1', src: '/images/photography/brand1.jpeg', title: 'Urban Texture', description: 'Collection Lead' },
            { id: 'b2', src: '/images/photography/brand2.jpeg', title: 'Detail Shot', description: 'Fabric detail' },
            { id: 'b3', src: '/images/photography/brand3.jpeg', title: 'Street Style', description: 'Location shoot' },
            { id: 'b4', src: '/images/photography/brand4.jpeg', title: 'Motion', description: 'Dynamic movement' },
            { id: 'b5', src: '/images/photography/brand5.jpeg', title: 'Portrait', description: 'Model closeup' },
            { id: 'b6', src: '/images/photography/brand6.jpeg', title: 'Atmosphere', description: 'Wide context' },
            { id: 'b7', src: '/images/photography/brand7.jpeg', title: 'Editorial', description: 'Campaign shot' },
            { id: 'b8', src: '/images/photography/brand8.jpeg', title: 'Styling', description: 'Creative direction' }
        ]
    },
    {
        id: 'dj',
        title: 'DJ Sessions',
        orientation: 'landscape',
        description: 'Capturing the energy and technical precision of underground club culture.',
        images: [
            { id: 'd1', src: '/images/photography/DJ1.jpg', title: 'Focus', description: 'In the mix' },
            { id: 'd2', src: '/images/photography/dj2.jpg', title: 'Control', description: 'Tactile interaction' },
            { id: 'd3', src: '/images/photography/DJ3.jpg', title: 'Atmosphere', description: 'Club lighting' },
            { id: 'd4', src: '/images/photography/DJ4.jpg', title: 'Connection', description: 'Crowd interaction' },
            { id: 'd5', src: '/images/photography/DJ5.jpg', title: 'Intensity', description: 'Peak moment' },
            { id: 'd6', src: '/images/photography/DJ6.jpg', title: 'Technique', description: 'Hands on decks' }
        ]
    },
    {
        id: 'aurora',
        title: 'Aurora Borealis',
        orientation: 'landscape',
        description: 'Long exposure astrophotography capturing natural phenomena.',
        images: [
            { id: 'a1', src: '/images/photography/aurora1.jpeg', title: 'Northern Lights I', description: 'Wide sky capture' },
            { id: 'a2', src: '/images/photography/aurora2.jpeg', title: 'Northern Lights II', description: 'Vibrant colors' },
            { id: 'a3', src: '/images/photography/aurora3.jpeg', title: 'Northern Lights III', description: 'Night sky' }
        ]
    },
    {
        id: 'live',
        title: 'Live Performance',
        orientation: 'landscape',
        description: 'Raw energy of live music performance.',
        images: [
            { id: 'l1', src: '/images/photography/lockout.jpg', title: 'Lockout Live', description: 'Performance intensity' }
        ]
    }
];

/**
 * Software Josh actually uses, evidenced by the existing content data.
 *
 * TODO: Confirm the full list. Anything not listed here — Photoshop, Clip
 * Studio Paint, Procreate, After Effects, TVPaint, Toon Boom, Blender — must
 * be confirmed before it is added. See docs/content-gaps.md §2.3.
 */
export const software = [
    'Autodesk Sketchbook',
    'Adobe Premiere Pro',
    'XP-Pen Artist 15.6',
    'XPPen Magic Drawing Pad',
];

/** Cameras and hardware, moved out of the old Equipment component. */
export const equipment = [
    {
        name: 'XP-Pen Artist 15.6',
        type: 'Drawing tablet',
        image: '/images/equipment/xppen.jpg',
        description: 'Display tablet used for hand-drawn 2D animation and digital art.',
    },
    {
        name: 'Sony PD170',
        type: 'Professional DV camcorder',
        image: '/images/equipment/sony-pd170.png',
        description: 'Primary camera for video work. 3-CCD professional DV tape camcorder.',
    },
    {
        name: 'Sony CCD-TR810E',
        type: 'Hi8 & Video8 Handycam',
        image: '/images/equipment/sony-tr810e.png',
        description: 'Compact Hi8/Video8 camcorder for alternative perspectives.',
    },
    {
        name: 'FED-3 Olympic',
        type: 'Soviet rangefinder camera',
        image: '/images/equipment/fed3-olympic.png',
        description: '35mm film rangefinder for still photography.',
    },
    {
        name: 'Petri 1.9 Super',
        type: 'Japanese rangefinder',
        image: '/images/equipment/petri-super.png',
        description: 'Fast f/1.9 rangefinder for low-light photography.',
    },
    {
        name: 'Cosina',
        type: '35mm SLR camera',
        image: '/images/equipment/cosina.png',
        description: 'Vintage SLR for film photography.',
    },
];

/**
 * TODO: "Stick n Poke - Soundhouse" appears twice below. Confirm whether these
 * are two separate dates or a duplicate entry.
 * TODO: Every credit is a film credit. Add any drawing, animation or
 * illustration credits that exist.
 */
export const credits = [
    {
        role: 'Filmed and edited',
        production: 'Background video for clothing brand photoshoot',
        year: '2026'
    },
    {
        role: 'Filmed and edited',
        production: 'Stick n Poke - Soundhouse',
        year: '2025'
    },
    {
        role: 'Filmed and edited',
        production: 'Lockout - Soundhouse',
        year: '2025'
    },
    {
        role: 'Filmed and edited',
        production: 'DJ Ortega - Wigwam',
        year: '2025'
    },
    {
        role: 'Filmed and edited',
        production: 'Stick n Poke - Sound recording studio',
        year: '2025'
    },
    {
        role: 'Filmed and edited',
        production: 'Stick n Poke - Soundhouse',
        year: '2025'
    },
    {
        role: 'Filmed and edited',
        production: 'DJ RHR - Wigwam',
        year: '2025'
    }
];

// `processItems` and its `Process` component were removed on 2026-07-30.
// The entries described lighting setups, a "warehouse scene" and an edit
// timeline that correspond to no project on this site, and the section had
// been disabled in App.jsx for some time. A genuine process section will be
// rebuilt from real assets — see docs/content-gaps.md §1.2 and §1.3.
