#!/usr/bin/env node

/**
 * Image build step.
 *
 * Source artwork lives in `media/` at full resolution and is never served.
 * This script writes web-ready derivatives into `public/images/`, which Vite
 * copies into `dist/` — so the deployed site ships kilobytes where the
 * originals are megabytes, while Josh's originals stay untouched.
 *
 * For each source image it emits:
 *   - <name>-480.webp, <name>-960.webp, <name>-1920.webp   (responsive srcset)
 *   - <name>.webp                                          (lightbox / full view)
 * Video and GIF files are copied through unchanged.
 *
 * It also writes `src/data/image-manifest.json`, mapping each original path to
 * its intrinsic dimensions and available widths. Components read that to emit
 * correct `width`/`height` attributes, which is what removes layout shift.
 *
 * Outputs are skipped when they are newer than their source, so repeat local
 * builds are near-instant.
 *
 * Usage: node scripts/build-images.mjs [--force]
 */

import { mkdir, readdir, stat, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'media');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'image-manifest.json');

/**
 * Widths emitted for srcset.
 *
 * The widest grid cell on the site is roughly 700 CSS px, so 1440 covers it at
 * 2x device pixel ratio. Anything larger only ever served bytes nobody could
 * see — several sketchbook scans were shipping 1.6 MB at 1920.
 */
const WIDTHS = [480, 960, 1440];

/** Cap for the full-size version used in the lightbox. */
const FULL_WIDTH = 2000;

/**
 * Much of the artwork is photographed sketchbook pages, where sensor grain
 * dominates the file size. Quality below ~76 starts eating line work without
 * meaningfully shrinking the result, so this is where it sits.
 */
const QUALITY_GRID = 80;
const QUALITY_FULL = 76;

const RASTER = new Set(['.jpg', '.jpeg', '.png']);
const PASSTHROUGH = new Set(['.mp4', '.webm', '.gif', '.svg']);

const force = process.argv.includes('--force');

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full);
        else if (entry.isFile() && !entry.name.startsWith('.')) yield full;
    }
}

/** True when `output` is missing or older than `source`. */
async function isStale(source, output) {
    if (force || !existsSync(output)) return true;
    const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)]);
    return sourceStat.mtimeMs > outputStat.mtimeMs;
}

async function processRaster(sourcePath, relative) {
    const image = sharp(sourcePath, { failOn: 'none' });
    const { width, height } = await image.metadata();
    if (!width || !height) throw new Error(`Unreadable dimensions: ${relative}`);

    const parsed = path.parse(relative);
    const outputBase = path.join(OUTPUT_DIR, parsed.dir, parsed.name);
    await mkdir(path.dirname(outputBase), { recursive: true });

    // Never upscale: a 700px-wide source gets one 480 variant, not three.
    const widths = WIDTHS.filter((candidate) => candidate <= width);
    if (!widths.length) widths.push(width);

    const targets = [
        ...widths.map((w) => ({
            width: w,
            quality: QUALITY_GRID,
            out: `${outputBase}-${w}.webp`,
        })),
        {
            width: Math.min(width, FULL_WIDTH),
            quality: QUALITY_FULL,
            out: `${outputBase}.webp`,
        },
    ];

    let written = 0;
    for (const target of targets) {
        if (!(await isStale(sourcePath, target.out))) continue;
        await image
            .clone()
            .resize({ width: target.width, withoutEnlargement: true })
            .webp({ quality: target.quality, effort: 4 })
            .toFile(target.out);
        written += 1;
    }

    return {
        entry: [
            `/images/${relative.split(path.sep).join('/')}`,
            {
                src: `/images/${path.join(parsed.dir, `${parsed.name}.webp`).split(path.sep).join('/')}`,
                width,
                height,
                widths,
            },
        ],
        written,
    };
}

async function processPassthrough(sourcePath, relative) {
    const output = path.join(OUTPUT_DIR, relative);
    await mkdir(path.dirname(output), { recursive: true });
    if (!(await isStale(sourcePath, output))) return 0;
    await copyFile(sourcePath, output);
    return 1;
}

async function main() {
    if (!existsSync(SOURCE_DIR)) {
        console.error(`✗ No media directory at ${SOURCE_DIR}`);
        process.exit(1);
    }

    const manifest = {};
    let processed = 0;
    let written = 0;
    const failures = [];

    for await (const sourcePath of walk(SOURCE_DIR)) {
        const relative = path.relative(SOURCE_DIR, sourcePath);
        const extension = path.extname(sourcePath).toLowerCase();

        try {
            if (RASTER.has(extension)) {
                const result = await processRaster(sourcePath, relative);
                manifest[result.entry[0]] = result.entry[1];
                written += result.written;
                processed += 1;
            } else if (PASSTHROUGH.has(extension)) {
                written += await processPassthrough(sourcePath, relative);
                processed += 1;
            }
        } catch (error) {
            failures.push(`${relative}: ${error.message}`);
        }
    }

    await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

    console.log(
        `✅ Images: ${processed} sources, ${written} files written, ` +
        `${Object.keys(manifest).length} in manifest`
    );

    if (failures.length) {
        console.error(`✗ ${failures.length} image(s) failed:`);
        failures.forEach((failure) => console.error(`   ${failure}`));
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
