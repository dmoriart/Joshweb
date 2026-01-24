import React, { useState } from 'react';

function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '#', label: 'Home' },
        { href: '#work', label: 'Work' },
        { href: '#photography', label: 'Photography' },
        { href: '#artwork', label: 'Artwork' },
        { href: '#process', label: 'Process' },
        { href: '#about', label: 'About' },
        { href: '#credits', label: 'Credits' },
        { href: '#contact', label: 'Contact' }
    ];

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
                    Josh Moriarty Films
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
                            style={{
                                color: '#1a1a1a',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                                transition: 'opacity 0.2s ease',
                                opacity: 0.8
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
                overflow: 'hidden',
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
                            onClick={handleLinkClick}
                            style={{
                                color: '#1a1a1a',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '18px',
                                padding: '20px 40px',
                                borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
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
