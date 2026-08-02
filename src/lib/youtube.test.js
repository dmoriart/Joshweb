import { describe, expect, it } from 'vitest';
import { getYouTubeEmbedUrl, getYouTubeId, getYouTubeThumbnail } from './youtube';
import { animations, works } from '../data/content';

describe('getYouTubeId', () => {
    it('parses every link shape used in the content data', () => {
        expect(getYouTubeId('https://youtu.be/HpGS_WcvOBM')).toBe('HpGS_WcvOBM');
        expect(getYouTubeId('https://youtube.com/shorts/1g72m-MM1m4')).toBe('1g72m-MM1m4');
        expect(getYouTubeId('https://www.youtube.com/watch?v=amqhi52QMLY')).toBe('amqhi52QMLY');
        expect(getYouTubeId('https://www.youtube.com/embed/HRsAaCGVGRo')).toBe('HRsAaCGVGRo');
    });

    it('handles extra query parameters', () => {
        expect(getYouTubeId('https://www.youtube.com/watch?list=PL1&v=amqhi52QMLY')).toBe(
            'amqhi52QMLY'
        );
    });

    it('returns null rather than throwing on unusable input', () => {
        expect(getYouTubeId('https://vimeo.com/123456')).toBeNull();
        expect(getYouTubeId('')).toBeNull();
        expect(getYouTubeId(undefined)).toBeNull();
    });
});

describe('getYouTubeThumbnail', () => {
    it('builds a poster URL', () => {
        expect(getYouTubeThumbnail('https://youtu.be/HpGS_WcvOBM')).toBe(
            'https://img.youtube.com/vi/HpGS_WcvOBM/hqdefault.jpg'
        );
    });

    it('returns null for an unparseable url so callers can fall back', () => {
        expect(getYouTubeThumbnail('not-a-url')).toBeNull();
    });
});

describe('getYouTubeEmbedUrl', () => {
    it('uses the no-cookie host and suppresses related-video suggestions', () => {
        const url = getYouTubeEmbedUrl('https://youtu.be/HpGS_WcvOBM');
        expect(url).toContain('youtube-nocookie.com/embed/HpGS_WcvOBM');
        expect(url).toContain('rel=0');
    });
});

// Guards against a dead embed shipping unnoticed: every video URL in the
// content data must be parseable by the helpers that render it.
describe('content video URLs', () => {
    const urls = [
        ...works.map((work) => work.url),
        ...animations.map((animation) => animation.url),
    ];

    it.each(urls)('%s resolves to a video id', (url) => {
        expect(getYouTubeId(url)).toMatch(/^[A-Za-z0-9_-]{11}$/);
    });
});
