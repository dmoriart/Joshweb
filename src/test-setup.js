import '@testing-library/jest-dom/vitest';

/**
 * jsdom implements none of these, and all are progressive enhancement rather
 * than core behaviour — inline clips pause off-screen, and autoplay is skipped
 * for reduced-motion visitors. Stubbing keeps the render tests focused on
 * markup and semantics.
 */
if (!globalThis.IntersectionObserver) {
    globalThis.IntersectionObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}

if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        addEventListener() { },
        removeEventListener() { },
    });
}

// jsdom has no media pipeline; without this every inline <video> logs a
// "not implemented" error on mount.
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => { };

// Layout scrolls to top (or to a #hash target) on navigation; jsdom has no
// scroll implementation.
window.scrollTo = () => { };
window.Element.prototype.scrollIntoView = () => { };
