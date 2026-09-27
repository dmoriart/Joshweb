// Explicit extension: generate-sitemap.js imports this file through plain
// Node ESM, which does not resolve extensionless paths the way Vite does.
import { sequences } from './data/content.js';

export const SITE_URL = 'https://joshmoriartyfilms.ie';
export const SITE_NAME = 'Josh Moriarty';
export const CV_PATH = '/CV%20-%20Josh%20Moriarty-June%202026.pdf';
export const EMAIL = 'joshmoriartyfilms@gmail.com';

export const SOCIAL_LINKS = [
    { label: 'Instagram', href: 'https://www.instagram.com/joshmoriartyfilms' },
    { label: 'YouTube', href: 'https://www.youtube.com/@joshmoriartyfilms' },
];

/**
 * Single source of truth for routing, navigation and the sitemap.
 *
 * `inNav: false` keeps a route reachable by URL but out of the menu.
 * `available` gates a route on real content existing — the Sequential Art
 * page stays unrouted while there are no comic pages to put in it, rather
 * than shipping an empty section.
 */
export const routes = [
    {
        path: '/',
        id: 'home',
        label: 'Home',
        title: 'Josh Moriarty | Animation Student, Artist and Filmmaker',
        description:
            'Portfolio of Josh Moriarty, an Irish animation student, artist and filmmaker exploring character, movement and storytelling through 2D animation, drawing and film.',
    },
    {
        path: '/animation',
        id: 'animation',
        label: 'Animation',
        title: '2D Animation | Josh Moriarty',
        description:
            'Hand-drawn 2D animation loops, action tests and animated comic panels by Josh Moriarty.',
    },
    {
        // The URL stays /comic-art so existing links keep working; only the
        // label widened to cover drawing generally.
        path: '/comic-art',
        id: 'comic-art',
        label: 'Drawing & Comic Art',
        title: 'Drawing & Comic Art | Josh Moriarty',
        description:
            'Character illustration, comic-style artwork and line work by Irish artist Josh Moriarty.',
    },
    {
        path: '/sequential-art',
        id: 'sequential-art',
        label: 'Sequential Art',
        title: 'Sequential Art | Josh Moriarty',
        description:
            'Sequential art, visual storytelling and comic page development by Josh Moriarty.',
        available: () => sequences.length > 0,
    },
    {
        path: '/sketchbook',
        id: 'sketchbook',
        label: 'Sketchbook',
        title: 'Sketchbook & Studies | Josh Moriarty',
        description:
            'Observational drawing, figure studies, perspective work and sketchbook pages by Josh Moriarty.',
    },
    {
        path: '/film',
        id: 'film',
        label: 'Film',
        title: 'Film & Cinematography | Josh Moriarty',
        description:
            'Live music, fashion and brand films shot on DV tape by Josh Moriarty, with photography from the same shoots.',
    },
    {
        path: '/about',
        id: 'about',
        label: 'About',
        title: 'About | Josh Moriarty',
        description:
            'Josh Moriarty is an Irish animation student who also draws and makes films, working across 2D animation, comic art and cinematic storytelling.',
    },
    {
        path: '/contact',
        id: 'contact',
        label: 'Contact',
        title: 'Contact | Josh Moriarty',
        description:
            'Get in touch with Josh Moriarty about animation, drawing, film and collaborative projects.',
    },
];

/** Routes that currently have content behind them. */
export const activeRoutes = routes.filter(
    (route) => !route.available || route.available()
);

export const navRoutes = activeRoutes.filter((route) => route.inNav !== false);
