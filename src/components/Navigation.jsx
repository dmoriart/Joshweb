import React, { useState, useEffect } from 'react';

const navLinks = [
    { href: '#', id: 'home', label: 'Home' },
    { href: '#portfolio', id: 'portfolio', label: 'Portfolio' },
    { href: '#artwork', id: 'artwork', label: 'Drawing' },
    { href: '#animation', id: 'animation', label: 'Animation' },
    { href: '#work', id: 'work', label: 'Film' },
    { href: '#contact', id: 'contact', label: 'Contact' }
];

function Navigation() {
    const handleNavClick = (e, href) => {
        e.preventDefault();
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const el = document.querySelector(href);
        if (el) {
            const navHeight = 80;
            const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState('home');

    // Scroll-spy: highlight whichever section is crossing the viewport middle.
    useEffect(() => {
        const sections = navLinks
            .map((link) => document.getElementById(link.id))
            .filter(Boolean);
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            background: 'rgba(250, 250, 250, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            padding: '20px 0',
            borderBottom: '1px solid rgba(26, 26, 26, 0.1)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <a href="#" style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    letterSpacing: '-0.02em',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                    zIndex: 1001
                }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    Josh Moriarty
                </a>

                {/* Desktop Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap',
                }}>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            aria-current={activeId === link.id ? 'true' : undefined}
                            style={{
                                color: '#1a1a1a',
                                textDecoration: 'none',
                                fontWeight: activeId === link.id ? '700' : '500',
                                fontSize: '16px',
                                transition: 'opacity 0.2s ease',
                                opacity: activeId === link.id ? 1 : 0.7,
                                paddingBottom: '2px',
                                borderBottom: activeId === link.id ? '2px solid #1a1a1a' : '2px solid transparent'
                            }}
                            className="desktop-nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Hamburger Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px',
                        zIndex: 1001,
                        display: 'none'
                    }}
                    className="hamburger-button"
                    aria-label="Toggle menu"
                >
                    <div style={{ width: '24px', height: '20px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: '#1a1a1a',
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: mobileMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none'
                        }}></span>
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: '#1a1a1a',
                            transition: 'opacity 0.3s ease',
                            opacity: mobileMenuOpen ? 0 : 1
                        }}></span>
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: '#1a1a1a',
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'
                        }}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: '71px',
                left: 0,
                width: '100%',
                height: mobileMenuOpen ? 'calc(100vh - 71px)' : '0',
                background: 'rgba(250, 250, 250, 0.98)',
                backdropFilter: 'blur(20px)',
                overflowY: 'auto',
                transition: 'height 0.3s ease',
                display: 'none'
            }}
                className="mobile-menu"
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    padding: '20px 0'
                }}>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={(e) => { handleNavClick(e, link.href); handleLinkClick(); }}
                            aria-current={activeId === link.id ? 'true' : undefined}
                            style={{
                                color: '#1a1a1a',
                                textDecoration: 'none',
                                fontWeight: activeId === link.id ? '700' : '500',
                                fontSize: '18px',
                                padding: '20px 40px',
                                borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
                                borderLeft: activeId === link.id ? '4px solid #1a1a1a' : '4px solid transparent',
                                transition: 'background 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(26, 26, 26, 0.05)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* CSS for responsive behavior */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav-link {
                        display: none !important;
                    }
                    .hamburger-button {
                        display: block !important;
                    }
                    .mobile-menu {
                        display: block !important;
                    }
                }
            `}</style>
        </nav>
    );
}

export default Navigation;
