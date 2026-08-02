import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ArtworkGallery from './ArtworkGallery';

const makeItems = (count, category = 'sketchbook') =>
    Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        src: '/images/artwork/1000005511.png',
        title: `Piece ${index + 1}`,
        category,
        description: `Description ${index + 1}`,
    }));

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'sketchbook', label: 'Studies' },
    { key: 'fan-art', label: 'Character' },
];

describe('ArtworkGallery truncation', () => {
    it('shows everything when no initialCount is given', () => {
        render(<ArtworkGallery items={makeItems(20)} noun="drawing" />);
        expect(screen.getAllByRole('button')).toHaveLength(20);
        expect(screen.queryByRole('button', { name: /show all/i })).not.toBeInTheDocument();
    });

    it('truncates a long grid and says so in the count', () => {
        render(<ArtworkGallery items={makeItems(30)} noun="drawing" initialCount={12} />);
        expect(screen.getByText('Showing 12 of 30 drawings')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Piece 12. Description 12' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Piece 13. Description 13' })).not.toBeInTheDocument();
    });

    it('reveals the rest on request', async () => {
        const user = userEvent.setup();
        render(<ArtworkGallery items={makeItems(30)} noun="drawing" initialCount={12} />);

        await user.click(screen.getByRole('button', { name: 'Show all 30 drawings' }));

        expect(screen.getByRole('button', { name: 'Piece 30. Description 30' })).toBeInTheDocument();
        expect(screen.getByText('Showing 30 drawings')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /show all/i })).not.toBeInTheDocument();
    });

    it('does not truncate when the set already fits', () => {
        render(<ArtworkGallery items={makeItems(8)} noun="drawing" initialCount={12} />);
        expect(screen.getByText('Showing 8 drawings')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /show all/i })).not.toBeInTheDocument();
    });

    it('re-truncates after changing filter, so one long category cannot leak into another', async () => {
        const user = userEvent.setup();
        const items = [...makeItems(20, 'sketchbook'), ...makeItems(4, 'fan-art')].map(
            (item, index) => ({ ...item, id: index + 1 })
        );
        render(
            <ArtworkGallery items={items} categories={CATEGORIES} noun="drawing" initialCount={12} />
        );

        await user.click(screen.getByRole('button', { name: 'Show all 24 drawings' }));
        expect(screen.getByText('Showing 24 drawings')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Studies' }));
        expect(screen.getByText('Showing 12 of 20 drawings')).toBeInTheDocument();
    });

    it('keeps the whole filtered set reachable in the lightbox while truncated', async () => {
        const user = userEvent.setup();
        render(<ArtworkGallery items={makeItems(30)} noun="drawing" initialCount={12} />);

        await user.click(screen.getByRole('button', { name: 'Piece 12. Description 12' }));
        const dialog = screen.getByRole('dialog');
        // Position is reported against the full set, not the visible slice.
        expect(dialog).toHaveTextContent('12 of 30');

        // Paging forward reaches an item that is not rendered in the grid.
        await user.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('dialog')).toHaveTextContent('13 of 30');
    });
});

describe('ArtworkGallery accessible naming', () => {
    it('names each tile from its image, not a conflicting aria-label', () => {
        render(<ArtworkGallery items={makeItems(1)} categories={CATEGORIES} noun="piece" />);
        const tile = screen.getByRole('button', { name: 'Piece 1. Description 1' });
        // The visible caption is hidden from assistive tech because it only
        // repeats the alt text — this is what keeps label and name in sync.
        expect(tile.querySelector('.jm-tile__overlay')).toHaveAttribute(
            'aria-hidden',
            'true'
        );
        expect(tile.querySelector('img')).toHaveAttribute(
            'alt',
            'Piece 1. Description 1'
        );
    });

    it('eagerly loads only the first tile', () => {
        const { container } = render(<ArtworkGallery items={makeItems(5)} noun="piece" />);
        const images = container.querySelectorAll('img');
        expect(images[0]).toHaveAttribute('loading', 'eager');
        [...images].slice(1).forEach((image) => {
            expect(image).toHaveAttribute('loading', 'lazy');
        });
    });
});
