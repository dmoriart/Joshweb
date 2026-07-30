import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CV_PATH, navRoutes } from '../routes';
import './SiteNav.css';

function SiteNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // A route change should always leave the menu closed.
    useEffect(() => setMenuOpen(false), [location.pathname]);

    // Escape closes the menu, matching the lightbox and every other overlay.
    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    return (
        <header className="jm-nav">
            <div className="jm-nav__bar">
                <NavLink to="/" className="jm-nav__wordmark">
                    Josh Moriarty
                </NavLink>

                <nav className="jm-nav__links" aria-label="Main">
                    {navRoutes.map((route) => (
                        <NavLink
                            key={route.path}
                            to={route.path}
                            end={route.path === '/'}
                            className="jm-nav__link"
                        >
                            {route.label}
                        </NavLink>
                    ))}
                    <a className="jm-nav__cv" href={CV_PATH} download>
                        CV
                    </a>
                </nav>

                <button
                    type="button"
                    className="jm-nav__toggle"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls="jm-mobile-menu"
                >
                    <span className="jm-visually-hidden">
                        {menuOpen ? 'Close menu' : 'Open menu'}
                    </span>
                    <span className="jm-nav__bars" data-open={menuOpen} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                </button>
            </div>

            <div
                id="jm-mobile-menu"
                className="jm-nav__mobile"
                data-open={menuOpen}
                hidden={!menuOpen}
            >
                {navRoutes.map((route) => (
                    <NavLink
                        key={route.path}
                        to={route.path}
                        end={route.path === '/'}
                        className="jm-nav__mobile-link"
                    >
                        {route.label}
                    </NavLink>
                ))}
                <a className="jm-nav__mobile-link" href={CV_PATH} download>
                    Download CV
                </a>
            </div>
        </header>
    );
}

export default SiteNav;
