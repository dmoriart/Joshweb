import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../routes';

const DEFAULT_SHARE_IMAGE = `${SITE_URL}/share-card.jpg`;

function setMeta(selector, attribute, value) {
    const element = document.head.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
}

/**
 * Sets per-route document metadata.
 *
 * Replaces useMetaTags.js, which rewrote the title on scroll using an
 * IntersectionObserver at threshold 0.5 — unreachable for sections taller than
 * the viewport, and it meant crawlers that run JS saw a different title from
 * those that don't. Each route now declares its own title once.
 */
function PageMeta({ title, description, path = '/', image = DEFAULT_SHARE_IMAGE }) {
    useEffect(() => {
        const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

        document.title = title;
        setMeta('meta[name="description"]', 'content', description);

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = canonical;

        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[property="og:url"]', 'content', canonical);
        setMeta('meta[property="og:image"]', 'content', image);
        setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
        setMeta('meta[name="twitter:title"]', 'content', title);
        setMeta('meta[name="twitter:description"]', 'content', description);
        setMeta('meta[name="twitter:image"]', 'content', image);
    }, [title, description, path, image]);

    return null;
}

export default PageMeta;
