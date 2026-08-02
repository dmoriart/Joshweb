import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Lightbox from './Lightbox';

/** Mirrors real usage: a trigger button that opens the dialog. */
function Harness({ onPrev, onNext }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                Open artwork
            </button>
            {open && (
                <Lightbox
                    label="Artwork viewer"
                    onClose={() => setOpen(false)}
                    onPrev={onPrev}
                    onNext={onNext}
                    caption={<p>A caption</p>}
                >
                    <img src="/images/artwork/1000005511.png" alt="A drawing" />
                </Lightbox>
            )}
        </>
    );
}

afterEach(() => {
    document.body.style.overflow = '';
});

describe('Lightbox', () => {
    it('is announced as a modal dialog with an accessible name', async () => {
        const user = userEvent.setup();
        render(<Harness />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-label', 'Artwork viewer');
    });

    it('closes on Escape', async () => {
        const user = userEvent.setup();
        render(<Harness />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));

        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('returns focus to the element that opened it', async () => {
        const user = userEvent.setup();
        render(<Harness />);
        const trigger = screen.getByRole('button', { name: 'Open artwork' });
        await user.click(trigger);
        await user.keyboard('{Escape}');

        expect(document.activeElement).toBe(trigger);
    });

    it('pages with the arrow keys when navigation is available', async () => {
        const user = userEvent.setup();
        const onPrev = vi.fn();
        const onNext = vi.fn();
        render(<Harness onPrev={onPrev} onNext={onNext} />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));

        await user.keyboard('{ArrowRight}');
        expect(onNext).toHaveBeenCalledTimes(1);

        await user.keyboard('{ArrowLeft}');
        expect(onPrev).toHaveBeenCalledTimes(1);
    });

    it('omits the navigation controls when there is nowhere to go', async () => {
        const user = userEvent.setup();
        render(<Harness />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));

        expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close viewer' })).toBeInTheDocument();
    });

    it('keeps Tab inside the dialog', async () => {
        const user = userEvent.setup();
        render(<Harness onPrev={vi.fn()} onNext={vi.fn()} />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));

        const dialog = screen.getByRole('dialog');
        // However far Tab travels, focus must never escape back to the page.
        for (let i = 0; i < 6; i += 1) {
            await user.tab();
            expect(dialog.contains(document.activeElement)).toBe(true);
        }
    });

    it('locks background scrolling while open', async () => {
        const user = userEvent.setup();
        render(<Harness />);
        await user.click(screen.getByRole('button', { name: 'Open artwork' }));
        expect(document.body.style.overflow).toBe('hidden');

        await user.keyboard('{Escape}');
        expect(document.body.style.overflow).toBe('');
    });
});
