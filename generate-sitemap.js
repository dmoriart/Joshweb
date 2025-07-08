#!/usr/bin/env node

/**
 * Simple sitemap generator for Josh Moriarty Films
 * Run this script to update the sitemap.xml file
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://joshmoriartyfilms.ie';
const TODAY = new Date().toISOString().split('T')[0];

const urls = [
  {
    loc: `${DOMAIN}/`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    loc: `${DOMAIN}/#work`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: `${DOMAIN}/#artwork`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: `${DOMAIN}/#about`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: `${DOMAIN}/#contact`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: `${DOMAIN}/artwork`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: '0.8'
  }
];

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  urls.forEach(url => {
    sitemap += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>

`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

// Generate and write sitemap
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
console.log(`📍 Sitemap URL: ${DOMAIN}/sitemap.xml`);
