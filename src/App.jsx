import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ComicArt from './pages/ComicArt';
import AnimationPage from './pages/AnimationPage';
import Film from './pages/Film';
import Sketchbook from './pages/Sketchbook';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { activeRoutes } from './routes';

/*
 * Routes are deliberately NOT lazily imported.
 *
 * Splitting them was tried and measured worse: the page components are only
 * 0.5-4 KB each, so the main bundle shrank by 3 KB while every sub-page gained
 * four serial round trips before its images were discovered. Mobile LCP on
 * /sketchbook went from 4.0 s to 6.2 s and Lighthouse performance from 86 to
 * 75. The bundle is dominated by React and the router, which cannot be split
 * out this way. Do not reintroduce without measuring.
 */

/** Pages gated on content existing are only routed when they have some. */
const isRouted = (path) => activeRoutes.some((route) => route.path === path);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="comic-art" element={<ComicArt />} />
                    <Route path="animation" element={<AnimationPage />} />
                    <Route path="film" element={<Film />} />
                    <Route path="sketchbook" element={<Sketchbook />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    {isRouted('/sequential-art') && (
                        // TODO: Add the SequentialArt page when comic sequences
                        // land in content.js — see docs/content-gaps.md §1.1.
                        <Route path="sequential-art" element={<NotFound />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
