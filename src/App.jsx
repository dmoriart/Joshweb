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
