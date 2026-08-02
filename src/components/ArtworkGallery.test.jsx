import { readFileSync } from 'node:fs';
import { join } from 'node:path';
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

/* Vitest resolves import.meta.url to an http URL, not file://, so read
   stylesheets from the project root instead. */
const readCss = (relative) => readFileSync(join(process.cwd(), relative), 'utf8');

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

describe('hover stability', () => {
    /*
     * Regression guard. Tiles used to lift 4px on hover, which moved the
     * element out from under a stationary cursor: hover ended, the tile
     * dropped back under the cursor, hover restarted, and it flickered
     * indefinitely. Any transform that changes a hover target's own box
     * reintroduces that, so the rule is that hover feedback must not move the
     * element — only its clipped contents.
     */
    it('declares no transform on the hover target itself', () => {
        const css = readCss('src/components/Gallery.css');
        const hoverBlock = css.match(
            /\.jm-tile:hover,\s*\.jm-tile:focus-visible\s*\{([^}]*)\}/
        );
        expect(hoverBlock, 'expected a .jm-tile hover rule').not.toBeNull();
        expect(hoverBlock[1]).not.toMatch(/transform\s*:/);
    });

    it('still scales the image, which is clipped and so changes no layout', () => {
        const css = readCss('src/components/Gallery.css');
        expect(css).toMatch(/\.jm-tile:hover\s+img\s*\{[^}]*transform\s*:\s*scale/);
        expect(css).toMatch(/\.jm-tile\s*\{[^}]*overflow\s*:\s*hidden/);
    });

    it('applies the same rule to the featured and photo grids', () => {
        const featured = readCss('src/pages/Home.css');
        const photo = readCss('src/pages/Film.css');

        const featuredHover = featured.match(
            /\.jm-featured__item:hover,\s*\.jm-featured__item:focus-visible\s*\{([^}]*)\}/
        );
        const photoHover = photo.match(
            /\.jm-photo:hover,\s*\.jm-photo:focus-visible\s*\{([^}]*)\}/
        );

        expect(featuredHover, 'expected a .jm-featured__item hover rule').not.toBeNull();
        expect(photoHover, 'expected a .jm-photo hover rule').not.toBeNull();
        expect(featuredHover[1]).not.toMatch(/transform\s*:/);
        expect(photoHover[1]).not.toMatch(/transform\s*:/);
    });
});
