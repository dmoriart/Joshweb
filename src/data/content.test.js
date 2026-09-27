import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
    animations,
    artworks,
    cleanups,
    credits,
    filmGroups,
    motionClips,
    photography,
    sequences,
    works,
} from './content';
import manifest from './image-manifest.json';
import artworkReview from './artwork-review.json';

const MEDIA_DIR = join(process.cwd(), 'media');

/**
 * Content data references originals under `media/`; the build step turns those
 * into the WebP derivatives that actually ship. Checking the source means a
 * typo fails the test whether or not derivatives happen to be built.
 */
const resolves = (src) => existsSync(join(MEDIA_DIR, src.replace(/^\/images\//, '')));

const allMediaPaths = [
    ...artworks.map((item) => item.src),
    ...motionClips.map((item) => item.src),
    ...cleanups.flatMap((item) => item.images.map((image) => image.src)),
    ...photography.flatMap((collection) =>
        collection.images.map((image) => image.src)
    ),
];

describe('media paths', () => {
    it.each(allMediaPaths)('%s exists in media/', (src) => {
        expect(resolves(src)).toBe(true);
    });

    // Every still must be in the manifest, otherwise ResponsiveImage silently
    // falls back to a path with no srcset and no dimensions.
    const stills = allMediaPaths.filter((src) => /\.(jpe?g|png)$/i.test(src));
    it.each(stills)('%s has a manifest entry with dimensions', (src) => {
        const entry = manifest[src];
        expect(entry, `missing from image-manifest.json — run npm run build-images`)
            .toBeDefined();
        expect(entry.width).toBeGreaterThan(0);
        expect(entry.height).toBeGreaterThan(0);
        expect(entry.widths.length).toBeGreaterThan(0);
    });
});

describe('artworks', () => {
    it('has a unique id per piece', () => {
        const ids = artworks.map((item) => item.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('gives every piece a title, category and description', () => {
        // The description becomes the alt text, so an empty one is an
        // accessibility failure rather than a cosmetic gap.
        artworks.forEach((item) => {
            expect(item.title?.trim()).toBeTruthy();
            expect(item.category?.trim()).toBeTruthy();
            expect(item.description?.trim()).toBeTruthy();
        });
    });

    it('keeps the featured selection short enough to read as a selection', () => {
        const featured = artworks.filter((item) => item.featured);
        expect(featured.length).toBeGreaterThan(0);
        expect(featured.length).toBeLessThanOrEqual(6);
    });
});

describe('animations', () => {
    it('gives every piece a playable source', () => {
        [...animations, ...motionClips].forEach((item) => {
            expect(item.url || item.src).toBeTruthy();
            expect(item.title?.trim()).toBeTruthy();
        });
    });
});

describe('film work', () => {
    const groupKeys = new Set(filmGroups.map((group) => group.key));

    it('assigns every piece to a known group', () => {
        works.forEach((work) => {
            expect(groupKeys.has(work.group)).toBe(true);
        });
    });

    it('states an exact role for every piece, never a vague label', () => {
        works.forEach((work) => {
            expect(work.role?.trim()).toBeTruthy();
            expect(work.role.toLowerCase()).not.toContain('worked on');
        });
    });
});

describe('credits', () => {
    it('names a role and a production for every entry', () => {
        credits.forEach((credit) => {
            expect(credit.role?.trim()).toBeTruthy();
            expect(credit.production?.trim()).toBeTruthy();
        });
    });
});

describe('sequences', () => {
    // Guards the "no empty pages" rule: if a sequence is ever added, it must
    // arrive complete rather than as a placeholder.
    it('is either empty or fully populated', () => {
        sequences.forEach((sequence) => {
            expect(sequence.pages.length).toBeGreaterThan(0);
            expect(sequence.premise?.trim()).toBeTruthy();
            expect(sequence.origin).toBeTruthy();
            sequence.pages.forEach((page) => {
                expect(page.alt?.trim()).toBeTruthy();
                expect(resolves(page.src)).toBe(true);
            });
            const numbers = sequence.pages.map((page) => page.number);
            expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
        });
    });
});

describe('content integrity', () => {
    it('never leaks a TODO marker into rendered copy', () => {
        const renderedStrings = [
            ...artworks.flatMap((item) => [item.title, item.description]),
            ...works.flatMap((work) => [work.title, work.description, work.role]),
            ...animations.map((item) => item.description),
            ...motionClips.map((item) => item.caption),
            ...cleanups.map((item) => item.caption),
        ];
        renderedStrings.forEach((text) => {
            expect(text).not.toMatch(/TODO/i);
        });
    });
});

describe('artwork review manifest', () => {
    const { records } = artworkReview;
    const approved = records.filter((record) => record.status === 'approved');
    const publishedSrcs = new Set(artworks.map((item) => item.src));

    it('publishes every approved record, and has a source file for it', () => {
        approved.forEach((record) => {
            expect(record.publicSrc, `${record.reviewId} needs a publicSrc`).toBeTruthy();
            expect(resolves(record.publicSrc)).toBe(true);
            expect(publishedSrcs.has(record.publicSrc)).toBe(true);
        });
    });

    // Drafts, archived sources and exclusions must never reach the site.
    it('publishes nothing that is not approved', () => {
        records
            .filter((record) => record.status !== 'approved')
            .forEach((record) => {
                expect(record.publicSrc, `${record.reviewId} is ${record.status}`).toBeUndefined();
            });
    });

    // Alternate captures of one drawing must not become separate gallery cards.
    it('approves at most one record per duplicate group', () => {
        const groups = approved.map((record) => record.group).filter(Boolean);
        expect(new Set(groups).size).toBe(groups.length);
    });
});
