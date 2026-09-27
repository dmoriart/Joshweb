import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SiteNav from './SiteNav';
import { CV_PATH, EMAIL, SOCIAL_LINKS } from '../routes';
import './Layout.css';

/**
 * Client-side navigation does not reset scroll on its own. A link with a hash
 * (e.g. /film#photography) lands on that section instead of the top.
 */
function useScrollToTopOnRouteChange() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        const target = hash && document.getElementById(hash.slice(1));
        if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);
}

function Layout() {
    useScrollToTopOnRouteChange();

    return (
        <>
            <a className="jm-skip-link" href="#main">
                Skip to content
            </a>
            <SiteNav />
            <main id="main" tabIndex={-1}>
                <Outlet />
            </main>
            <footer className="jm-footer">
                <div className="jm-container jm-footer__inner">
                    <div>
                        <p className="jm-footer__name">Josh Moriarty</p>
                        <p className="jm-footer__role">
                            Animation student · Artist · Filmmaker
                        </p>
                    </div>
                    <div className="jm-footer__links">
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a href={CV_PATH} download>
                            Download CV
                        </a>
                    </div>
                </div>
                <div className="jm-container jm-footer__legal">
                    <span>© {new Date().getFullYear()} Josh Moriarty</span>
                    <Link to="/contact">Get in touch</Link>
                </div>
            </footer>
        </>
    );
}

export default Layout;
