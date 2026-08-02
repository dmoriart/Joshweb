import manifest from '../data/image-manifest.json';

/**
 * Resolves a source image path to its web-ready derivatives.
 *
 * Content data keeps referring to the original file (`/images/artwork/x.png`);
 * `scripts/build-images.mjs` writes WebP derivatives and records the mapping in
 * image-manifest.json. Keeping the lookup here means content.js never has to
 * know that the build step exists.
 *
 * @param {string} src Original path, e.g. "/images/artwork/1000005510.png".
 * @returns {{src: string, srcSet?: string, width?: number, height?: number}}
 *          Falls back to the given path when the image predates the manifest,
 *          so a missing entry degrades rather than breaks the page.
 */
export function resolveImage(src) {
    const entry = manifest[src];
    if (!entry) return { src };

    return {
        src: entry.src,
        srcSet: entry.widths
            .map((width) => `${entry.src.replace(/\.webp$/, '')}-${width}.webp ${width}w`)
            .join(', '),
        width: entry.width,
        height: entry.height,
    };
}

/** The largest available rendition, used for lightbox and hero display. */
export function resolveFullImage(src) {
    const entry = manifest[src];
    return entry ? { src: entry.src, width: entry.width, height: entry.height } : { src };
}
