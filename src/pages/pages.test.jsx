import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from '../components/Layout';
import Home from './Home';
import ComicArt from './ComicArt';
import AnimationPage from './AnimationPage';
import Film from './Film';
import Sketchbook from './Sketchbook';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';
import { navRoutes } from '../routes';

const pages = [
    ['Home', '/', Home],
    ['Comic Art', '/comic-art', ComicArt],
    ['Animation', '/animation', AnimationPage],
    ['Film', '/film', Film],
    ['Sketchbook', '/sketchbook', Sketchbook],
    ['About', '/about', About],
    ['Contact', '/contact', Contact],
    ['Not Found', '/nope', NotFound],
];

const renderPage = (path, Page) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={path} element={<Page />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

describe.each(pages)('%s page', (_name, path, Page) => {
    it('renders without throwing', () => {
        expect(() => renderPage(path, Page)).not.toThrow();
    });

    it('has exactly one h1', () => {
        renderPage(path, Page);
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });

    it('sets a document title', () => {
        renderPage(path, Page);
        expect(document.title).toMatch(/Josh Moriarty/);
    });
});

describe('layout', () => {
    it('offers a skip link before anything else', () => {
        renderPage('/', Home);
        const skip = screen.getByRole('link', { name: /skip to content/i });
        expect(skip).toHaveAttribute('href', '#main');
    });

    it('links every navigable route from the main navigation', () => {
        renderPage('/', Home);
        const nav = screen.getByRole('navigation', { name: 'Main' });
        navRoutes.forEach((route) => {
            expect(within(nav).getByRole('link', { name: route.label })).toHaveAttribute(
                'href',
                route.path
            );
        });
    });

    it('does not advertise Sequential Art while no sequences exist', () => {
        renderPage('/', Home);
        const nav = screen.getByRole('navigation', { name: 'Main' });
        expect(
            within(nav).queryByRole('link', { name: 'Sequential Art' })
        ).not.toBeInTheDocument();
    });
});

describe('home page', () => {
    it('states who Josh is and what he makes above everything else', () => {
        renderPage('/', Home);
        expect(
            screen.getByRole('heading', { level: 1, name: 'Josh Moriarty' })
        ).toBeInTheDocument();
        // The role line appears in the hero and again in the footer.
        ['Animation student', 'Artist', 'Filmmaker'].forEach((role) => {
            expect(screen.getAllByText(new RegExp(role)).length).toBeGreaterThan(0);
        });
        expect(
            screen.getByText(
                /I explore character, movement and storytelling through 2D animation, drawing and film/
            )
        ).toBeInTheDocument();
    });

    it('leads with animation, then drawing and film', () => {
        renderPage('/', Home);
        const primary = screen.getByRole('link', { name: 'View animation' });
        expect(primary).toHaveAttribute('href', '/animation');
        expect(primary).toHaveClass('jm-button--primary');
        expect(screen.getByRole('link', { name: 'Explore drawings' })).toHaveAttribute(
            'href',
            '/comic-art'
        );
        expect(screen.getByRole('link', { name: 'Watch film' })).toHaveAttribute(
            'href',
            '/film'
        );

        // Animation is the first section after the hero.
        const sections = screen.getAllByRole('heading', { level: 2 });
        expect(sections[0]).toHaveTextContent('Animation');
    });
});

describe('video embeds', () => {
    it('never auto-loads a player: nothing plays until a click', () => {
        renderPage('/animation', AnimationPage);
        expect(document.querySelectorAll('iframe')).toHaveLength(0);
        expect(
            screen.getAllByRole('button', { name: /^Play / }).length
        ).toBeGreaterThan(0);
    });
});
