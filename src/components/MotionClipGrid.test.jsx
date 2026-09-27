import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import MotionClipGrid from './MotionClipGrid';

describe('MotionClipGrid pause control', () => {
    // The loops repeat forever, so there must be a way to stop them (WCAG 2.2.2).
    it('pauses every video and swaps GIFs to their still', async () => {
        const pause = vi.spyOn(window.HTMLMediaElement.prototype, 'pause');
        render(<MotionClipGrid />);
        const gif = document.querySelector('.jm-clips img');
        expect(gif.getAttribute('src')).toMatch(/\.gif$/);

        await userEvent.click(screen.getByRole('button', { name: 'Pause motion' }));

        expect(pause).toHaveBeenCalledTimes(document.querySelectorAll('.jm-clips video').length);
        expect(gif.getAttribute('src')).toMatch(/-poster\.webp$/);
        expect(screen.getByRole('button', { name: 'Play motion' })).toBeInTheDocument();
        pause.mockRestore();
    });

    it('starts paused for visitors who prefer reduced motion', () => {
        const original = window.matchMedia;
        window.matchMedia = (query) => ({
            matches: query.includes('reduce'),
            media: query,
            addEventListener() { },
            removeEventListener() { },
        });
        render(<MotionClipGrid />);
        expect(screen.getByRole('button', { name: 'Play motion' })).toBeInTheDocument();
        window.matchMedia = original;
    });
});
