#!/usr/bin/env node

/**
 * Emits one sitemap entry per active route.
 *
 * Routes are read from src/routes.js so the sitemap can never drift from the
 * navigation. Routes gated on missing content — Sequential Art, until comic
 * pages exist — are excluded automatically rather than advertising a page that
 * is not there.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, activeRoutes } from './src/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().split('T')[0];

const entry = (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${activeRoutes.map(entry).join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`✅ Sitemap: ${activeRoutes.length} URLs written to ${outputPath}`);
