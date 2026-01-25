import React from 'react';

function Hero() {
    return (
        <section id="home" style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/images/photography/IMG_0226.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {/* Subtle overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1
            }}></div>

            {/* Hero Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: '#ffffff',
                maxWidth: '800px',
                padding: '0 20px'
            }}>

                <h1 style={{
                    fontSize: 'clamp(48px, 8vw, 80px)',
                    fontWeight: '700',
                    letterSpacing: '-1px',
                    marginBottom: '20px',
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
                }}>
                    Josh Moriarty
                </h1>

                <p style={{
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    marginBottom: '40px',
                    opacity: '0.95',
                    maxWidth: '600px',
                    lineHeight: '1.5'
                }}>
                    Underground DV Tape Videographer
                </p>

                {/* Watch Reel CTA */}
                <div>
                    <a
                        href="#featured-reel"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: '#ffffff',
                            color: '#1a1a1a',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Watch Demo Reel
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }}>
                Scroll to explore
                <div style={{
                    width: '24px',
                    height: '36px',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '12px',
                    position: 'relative',
                    animation: 'scrollPulse 2s infinite'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '2px',
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'scrollDot 2s infinite'
                    }}></div>
                </div>
            </div>

            {/* Animation keyframes */}
            <style>{`
                @keyframes scrollPulse {
                    0%, 100% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                @keyframes scrollDot {
                    0% {
                        transform: translateX(-50%) translateY(0);
                        opacity: 0;
                    }
                    40% {
                        opacity: 1;
                    }
                    80% {
                        transform: translateX(-50%) translateY(16px);
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default Hero;
