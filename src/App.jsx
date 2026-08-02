import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { activeRoutes } from './routes';

/**
 * Only the home page is bundled up front.
 *
 * Everything else is fetched when someone navigates to it, which keeps around
 * 36 KB of gallery, film and form code out of the first load. The chunks are
 * small and Netlify serves them from cache, so the swap is not perceptible.
 */
const ComicArt = lazy(() => import('./pages/ComicArt'));
const AnimationPage = lazy(() => import('./pages/AnimationPage'));
const Film = lazy(() => import('./pages/Film'));
const Sketchbook = lazy(() => import('./pages/Sketchbook'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Pages gated on content existing are only routed when they have some. */
const isRouted = (path) => activeRoutes.some((route) => route.path === path);

/**
 * Reserves vertical space during a chunk fetch so the header does not jump.
 * Deliberately silent — a spinner for a sub-100ms load is more distracting
 * than nothing.
 */
function RouteFallback() {
    return <div style={{ minHeight: '70vh' }} aria-busy="true" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<RouteFallback />}>
                                <Routes>
                                    <Route path="comic-art" element={<ComicArt />} />
                                    <Route path="animation" element={<AnimationPage />} />
                                    <Route path="film" element={<Film />} />
                                    <Route path="sketchbook" element={<Sketchbook />} />
                                    <Route path="about" element={<About />} />
                                    <Route path="contact" element={<Contact />} />
                                    {isRouted('/sequential-art') && (
                                        // TODO: Add the SequentialArt page when comic
                                        // sequences land in content.js — see
                                        // docs/content-gaps.md §1.1.
                                        <Route path="sequential-art" element={<NotFound />} />
                                    )}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
