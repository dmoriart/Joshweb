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
 * TODO: Confirm duration, software and frame timing (1s or 2s) for each clip.
 * TODO: Confirm whether each is original work or a college/self-directed exercise.
 * TODO: Supply a poster frame per clip so nothing loads as a black rectangle.
 * TODO: Replace the placeholder titles with the real names of these pieces.
 *
 * @type {AnimationItem[]}
 */
export const motionClips = [
    {
        id: 'res',
        type: 'video',
        src: '/images/animation/res.mp4',
        title: '2D movement test',
        caption: 'Exploring timing, pose changes and motion.',
        featured: true,
    },
    {
        id: 'oct',
        type: 'video',
        src: '/images/animation/oct.mp4',
        title: 'Character movement study',
        caption: 'Focused on rhythm, spacing and gesture.',
        featured: true,
    },
    {
        id: 'anim16',
        type: 'gif',
        src: '/images/animation/Animation16.gif',
        title: 'Short animation experiment',
        caption: 'Independent test using frame-by-frame movement.',
    },
];

/**
 * Hosted animation pieces.
 *
 * TODO: Confirm duration for both pieces.
 * TODO: Confirm whether each is original work or a college exercise.
 *
 * @type {AnimationItem[]}
 */
export const animations = [
    {
        id: 2,
        type: 'youtube',
        title: 'Animation Test 1',
        url: 'https://youtu.be/amqhi52QMLY',
        description: 'Animated comic book panel using drawing tablet.',
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
 * five or six pieces at most, or it stops being a selection.
 *
 * TODO: The 30 "Sketchbook Study I–XXX" and 7 "Digital Artwork I–VII" entries
 * carry placeholder titles and rotating generic descriptions. Identify the
 * 10–15 genuinely worth showing and give those real titles; see
 * docs/content-gaps.md §3.4.
 *
 * @type {ArtworkItem[]}
 */
export const artworks = [
    // Latest character work — the strongest pieces for a comic portfolio review.
    // TODO: Confirm the software and year for these five pieces.
    { id: 66, src: '/images/artwork/1000005511.png', title: 'Guardians', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 62, src: '/images/artwork/1000005510.png', title: 'Masked Mercenary', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 63, src: '/images/artwork/1000005524.png', title: 'Moon Knight', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 64, src: '/images/artwork/1000005515.png', title: 'Sith Lord', category: 'fan-art', description: 'Digital character illustration', featured: true },
    { id: 65, src: '/images/artwork/1000005520.png', title: 'Descent', category: 'fan-art', description: 'Digital character illustration', featured: true },

    // Digital Artwork — tools confirmed from the existing descriptions.
    { id: 55, src: '/images/artwork/25b9fafb-b8ed-463e-b5f2-46c2ae4c2366.png', title: 'Digital Artwork I', category: 'digital', description: 'Done with XPPen Magic Drawing Pad and sketchbook', tools: 'XPPen Magic Drawing Pad, Autodesk Sketchbook' },
    { id: 61, src: '/images/artwork/de75bddc-dc52-445b-be0e-5714c0692112.png', title: 'Digital Artwork VII', category: 'digital', description: 'Done with XPPen Magic Drawing Pad and sketchbook' },

    // Self Portraits
    { id: 1, src: '/images/artwork/Selfportrait1.jpeg', title: 'Self Portrait I', category: 'self-portraits', description: 'Observational self portrait exploring likeness and tonal range' },
    { id: 2, src: '/images/artwork/Selfportrait2.jpeg', title: 'Self Portrait II', category: 'self-portraits', description: 'Study in proportion and expression' },
    { id: 4, src: '/images/artwork/Selfportrait4.jpeg', title: 'Self Portrait IV', category: 'self-portraits', description: 'Expressive self portrait capturing mood and character' },

    // Star Wars Fan Art
    { id: 5, src: '/images/artwork/Star Wars1.jpeg', title: 'Star Wars I', category: 'fan-art', description: 'Character illustration inspired by the Star Wars universe' },
    { id: 6, src: '/images/artwork/Star Wars2.jpeg', title: 'Star Wars II', category: 'fan-art', description: 'Exploring character design and dynamic poses' },
    { id: 7, src: '/images/artwork/Star Wars3.jpeg', title: 'Star Wars III', category: 'fan-art', description: 'Detailed character study with attention to costume and form' },
    { id: 8, src: '/images/artwork/Star Wars4.jpeg', title: 'Star Wars IV', category: 'fan-art', description: 'Fan art exploring iconic imagery and composition' },
    { id: 9, src: '/images/artwork/Star Wars5.jpeg', title: 'Star Wars V', category: 'fan-art', description: 'Character design showcasing illustration technique' },

    // View & Viewpoint
    { id: 10, src: '/images/artwork/View and viewpoint1.jpeg', title: 'View & Viewpoint I', category: 'viewpoint', description: 'Perspective study exploring depth and spatial composition' },
    { id: 11, src: '/images/artwork/View and viewpoint2.jpeg', title: 'View & Viewpoint II', category: 'viewpoint', description: 'Observational drawing focusing on architectural perspective' },
    { id: 12, src: '/images/artwork/View and viewpoint3.jpeg', title: 'View & Viewpoint III', category: 'viewpoint', description: 'Landscape composition and spatial awareness' },
    { id: 13, src: '/images/artwork/View and viewpoint4.jpeg', title: 'View & Viewpoint IV', category: 'viewpoint', description: 'Study of environment and viewpoint' },
    { id: 14, src: '/images/artwork/View and viewpoint5.jpeg', title: 'View & Viewpoint V', category: 'viewpoint', description: 'Perspective and compositional exploration' },

    // Music (now merged with Street)

    // Street

    // Photoshoot
    { id: 22, src: '/images/artwork/Photoshoot1.jpeg', title: 'Photoshoot I', category: 'photoshoot', description: 'Figure drawing from photographic reference' },
    { id: 23, src: '/images/artwork/Photoshoot2.jpeg', title: 'Photoshoot II', category: 'photoshoot', description: 'Study of pose and form from reference' },

    // Sketchbook & Studies
    { id: 25, src: '/images/artwork/IMG_1080.jpeg', title: 'Sketchbook Study II', category: 'sketchbook', description: 'Exploratory sketches and mark-making' },
    { id: 28, src: '/images/artwork/IMG_1098.jpeg', title: 'Sketchbook Study V', category: 'sketchbook', description: 'Tonal study and rendering' },
    { id: 29, src: '/images/artwork/IMG_1099.jpeg', title: 'Sketchbook Study VI', category: 'sketchbook', description: 'Composition and form exploration' },
    { id: 30, src: '/images/artwork/IMG_1102.jpeg', title: 'Sketchbook Study VII', category: 'sketchbook', description: 'Life drawing session' },
    { id: 31, src: '/images/artwork/IMG_1105.jpeg', title: 'Sketchbook Study VIII', category: 'sketchbook', description: 'Quick gesture and proportion study' },
    { id: 32, src: '/images/artwork/IMG_1106.jpeg', title: 'Sketchbook Study IX', category: 'sketchbook', description: 'Detailed observational drawing' },
    { id: 33, src: '/images/artwork/IMG_1107.jpeg', title: 'Sketchbook Study X', category: 'sketchbook', description: 'Exploratory mark-making and form' },
    { id: 35, src: '/images/artwork/IMG_1110.jpeg', title: 'Sketchbook Study XII', category: 'sketchbook', description: 'Study of light and shadow' },
    { id: 36, src: '/images/artwork/IMG_1111.jpeg', title: 'Sketchbook Study XIII', category: 'sketchbook', description: 'Drawing from observation' },
    { id: 37, src: '/images/artwork/IMG_1112.jpeg', title: 'Sketchbook Study XIV', category: 'sketchbook', description: 'Composition study' },
    { id: 38, src: '/images/artwork/IMG_1113.jpeg', title: 'Sketchbook Study XV', category: 'sketchbook', description: 'Exploratory drawing' },
    { id: 39, src: '/images/artwork/IMG_1114.jpeg', title: 'Sketchbook Study XVI', category: 'sketchbook', description: 'Detail and texture study' },
    { id: 40, src: '/images/artwork/IMG_1115.jpeg', title: 'Sketchbook Study XVII', category: 'sketchbook', description: 'Figure and form exploration' },
    { id: 42, src: '/images/artwork/IMG_2041.jpeg', title: 'Sketchbook Study XIX', category: 'sketchbook', description: 'Life drawing and tonal work' },
    { id: 43, src: '/images/artwork/IMG_2042.jpeg', title: 'Sketchbook Study XX', category: 'sketchbook', description: 'Mark-making and expression' },
    { id: 44, src: '/images/artwork/IMG_2043.jpeg', title: 'Sketchbook Study XXI', category: 'sketchbook', description: 'Compositional exploration' },
    { id: 45, src: '/images/artwork/IMG_2044.jpeg', title: 'Sketchbook Study XXII', category: 'sketchbook', description: 'Tonal range and rendering' },
    { id: 46, src: '/images/artwork/IMG_2045.jpeg', title: 'Sketchbook Study XXIII', category: 'sketchbook', description: 'Observational detail study' },
    { id: 47, src: '/images/artwork/IMG_2046.jpeg', title: 'Sketchbook Study XXIV', category: 'sketchbook', description: 'Drawing development' },
    { id: 49, src: '/images/artwork/IMG_2247.jpeg', title: 'Sketchbook Study XXVI', category: 'sketchbook', description: 'Study of form and space' },
    { id: 51, src: '/images/artwork/IMG_1138.jpeg', title: 'Sketchbook Study XXVIII', category: 'sketchbook', description: 'Exploratory sketching and technique' },
    { id: 52, src: '/images/artwork/IMG_1139.jpeg', title: 'Sketchbook Study XXIX', category: 'sketchbook', description: 'Observational drawing practice' },
    { id: 53, src: '/images/artwork/IMG_1140.jpeg', title: 'Sketchbook Study XXX', category: 'sketchbook', description: 'Study of form and detail' },
    { id: 54, src: '/images/artwork/IMG_1146.jpeg', title: 'Character Sketch', category: 'sketchbook', description: 'Illustration in marker and ink' },
];

/**
 * Clean-up before-and-after pairs. Each entry runs rough original → cleaned up.
 * Drop new photos into /public/images/cleanup/ and set each image's `src`.
 *
 * TODO: Confirm the software used for each clean-up.
 * TODO: Confirm the year of each.
 * TODO: Confirm whether the source rough was Josh's own drawing or supplied.
 *
 * @type {CleanupItem[]}
 */
export const cleanups = [
    {
        id: 1,
        caption: 'Self-directed clean-up exercise: a rough original drawing refined into clean, consistent line work while preserving the character pose and readability.',
        images: [
            { label: 'Original', src: '/images/cleanup/clean1.png' },
            { label: 'Cleaned up', src: '/images/cleanup/clean2.png' },
        ],
    },
    {
        id: 2,
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
