#!/usr/bin/env node

/**
 * Artwork intake step for newly supplied drawings.
 *
 * Reads src/data/artwork-review.json and the private source photographs in
 * portfolio-incoming/ (gitignored, never deployed). For each record:
 *
 *   - status 'approved' → one public master in media/artwork/, from which the
 *     normal build (scripts/build-images.mjs) makes the responsive sizes.
 *   - every record      → a private preview in portfolio-incoming/review/,
 *     plus an index.html contact sheet for Josh to approve choices from.
 *
 * Processing is deliberately conservative: EXIF orientation is honoured,
 * aspect ratio kept, nothing cropped, nothing upscaled, no sharpening, no
 * retouching. Re-encoding strips camera metadata (including any location).
 *
 * Usage: npm run prepare-incoming
 */

import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INCOMING_DIR = path.join(ROOT, 'portfolio-incoming');
const REVIEW_DIR = path.join(INCOMING_DIR, 'review');
const MEDIA_DIR = path.join(ROOT, 'media');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'artwork-review.json');

/** Longest edge for a public master. The supplied photos are all smaller. */
const MASTER_MAX = 3000;
/** High enough that the re-encode is visually lossless on pencil and ink. */
const MASTER_QUALITY = 95;
const PREVIEW_MAX = 1200;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

const escapeHtml = (text) =>
    String(text ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Public masters live at media/<path under /images/>. */
const mediaPathFor = (publicSrc) =>
    path.join(MEDIA_DIR, publicSrc.replace(/^\/images\//, ''));

async function writeMaster(sourcePath, record) {
    if (!record.publicSrc) {
        throw new Error(`${record.reviewId} is approved but has no publicSrc`);
    }
    const output = mediaPathFor(record.publicSrc);
    await mkdir(path.dirname(output), { recursive: true });
    const info = await sharp(sourcePath, { failOn: 'none' })
        .rotate()
        .resize({ width: MASTER_MAX, height: MASTER_MAX, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: MASTER_QUALITY, mozjpeg: true })
        .toFile(output);
    return { output: path.relative(ROOT, output), width: info.width, height: info.height, bytes: info.size };
}

async function writePreview(sourcePath, record) {
    const name = `${record.reviewId}-${record.id}.jpg`;
    await sharp(sourcePath, { failOn: 'none' })
        .rotate()
        .resize({ width: PREVIEW_MAX, height: PREVIEW_MAX, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(path.join(REVIEW_DIR, name));
    return name;
}

function contactSheet(rows) {
    const cards = rows
        .map(({ record, preview, source }) => `
    <article class="card" data-status="${record.status}">
      <a href="${preview}"><img src="${preview}" alt="${escapeHtml(record.alt)}" loading="lazy"></a>
      <div class="body">
        <p class="status">${record.reviewId} · ${escapeHtml(record.status)}${record.group ? ` · group ${escapeHtml(record.group)}` : ''}</p>
        <h2>${escapeHtml(record.workingTitle)}${record.workingTitleApproved ? '' : ' <small>(working title)</small>'}</h2>
        <p>${escapeHtml(record.decision)}${record.section ? ` → ${escapeHtml(record.section)}` : ''}</p>
        ${record.blockers.length ? `<ul>${record.blockers.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
        ${record.processingNotes ? `<p class="note">${escapeHtml(record.processingNotes)}</p>` : ''}
        <p class="file">${escapeHtml(record.sourceFile)} · ${source.width}×${source.height} · ${kb(source.bytes)}</p>
      </div>
    </article>`)
        .join('');

    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artwork review (private)</title>
<style>
  body { margin: 0; padding: 24px; background: #0d0d0f; color: #eee; font: 15px/1.5 system-ui, sans-serif; }
  h1 { margin: 0 0 4px; } .lede { color: #aaa; margin: 0 0 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .card { background: #17171b; border: 1px solid #2a2a30; border-radius: 8px; overflow: hidden; }
  .card[data-status="approved"] { border-color: #e8772e; }
  .card[data-status="archive"], .card[data-status="exclude"] { opacity: .6; }
  img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; background: #222; }
  .body { padding: 12px 14px; } h2 { font-size: 16px; margin: 4px 0; } small { color: #888; font-weight: 400; }
  .status { margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #e8772e; }
  ul { margin: 6px 0; padding-left: 18px; color: #f5c16c; } .note, .file { color: #999; font-size: 13px; }
</style></head><body>
<h1>Artwork review</h1>
<p class="lede">Private. Generated by npm run prepare-incoming from src/data/artwork-review.json. Only “approved” records reach the website; change a record's status there to approve it.</p>
<div class="grid">${cards}
</div></body></html>
`;
}

async function main() {
    if (!existsSync(INCOMING_DIR)) {
        console.error(`No ${path.relative(ROOT, INCOMING_DIR)}/ folder: nothing to prepare.`);
        process.exit(1);
    }

    const { records } = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    const present = new Set((await readdir(INCOMING_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)));
    const expected = new Set(records.map((r) => r.sourceFile));

    // Exact filenames only: never guess a match.
    const missing = records.filter((r) => !present.has(r.sourceFile));
    const unlisted = [...present].filter((f) => !expected.has(f));

    await mkdir(REVIEW_DIR, { recursive: true });

    const rows = [];
    const report = [];
    for (const record of records) {
        if (!present.has(record.sourceFile)) continue;
        const sourcePath = path.join(INCOMING_DIR, record.sourceFile);
        const meta = await sharp(sourcePath).metadata();
        const source = { width: meta.width, height: meta.height, bytes: (await stat(sourcePath)).size };
        const preview = await writePreview(sourcePath, record);
        const master = record.status === 'approved' ? await writeMaster(sourcePath, record) : null;
        rows.push({ record, preview, source });
        report.push({ reviewId: record.reviewId, id: record.id, status: record.status, source, master });
    }

    await writeFile(path.join(REVIEW_DIR, 'index.html'), contactSheet(rows));
    await writeFile(path.join(REVIEW_DIR, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);

    for (const row of report) {
        const out = row.master
            ? `→ ${row.master.output} ${row.master.width}×${row.master.height} ${kb(row.master.bytes)}`
            : '(private preview only)';
        console.log(`${row.reviewId} ${row.status.padEnd(8)} ${row.source.width}×${row.source.height} ${out}`);
    }
    if (missing.length) console.warn(`Missing from portfolio-incoming/: ${missing.map((r) => `${r.reviewId} ${r.sourceFile}`).join(', ')}`);
    if (unlisted.length) console.warn(`Not in the review manifest (ignored): ${unlisted.join(', ')}`);
    console.log(`Contact sheet: ${path.relative(ROOT, path.join(REVIEW_DIR, 'index.html'))}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
