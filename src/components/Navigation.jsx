import React from 'react';

function Navigation() {
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
                    transition: 'opacity 0.2s ease'
                }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    Josh Moriarty Films
                </a>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <a href="#" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Home</a>
                    <a href="#work" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Work</a>
                    <a href="#photography" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Photography</a>
                    <a href="#artwork" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Artwork</a>
                    <a href="#process" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Process</a>
                    <a href="#credits" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Credits</a>
                    <a href="#about" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>About</a>
                    <a href="#contact" style={{
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.8
                    }}>Contact</a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
