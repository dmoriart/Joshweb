import React from 'react';

function Hero() {
    const panels = [
        {
            label: 'Animation',
            title: 'Drawn Motion',
            image: '/images/artwork/25b9fafb-b8ed-463e-b5f2-46c2ae4c2366.png',
            href: '#animation',
            description: 'Hand-drawn movement, character, timing, and visual design.'
        },
        {
            label: 'Cinematography',
            title: 'Analogue Film',
            image: '/images/process/IMG_0226.jpeg',
            href: '#work',
            description: 'DV tape texture, live energy, fashion, music, and documentary moments.'
        }
    ];

    return (
        <section id="home" style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'stretch',
            background: '#0f0f0f',
            color: '#ffffff'
        }}>
            <div className="hero-split" style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                {panels.map((panel) => (
                    <a
                        key={panel.label}
                        href={panel.href}
                        className="hero-panel"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'flex-end',
                            minHeight: '100vh',
                            padding: '96px 40px 64px',
                            color: '#ffffff',
                            textDecoration: 'none',
                            overflow: 'hidden',
                            isolation: 'isolate'
                        }}
                    >
                        <img
                            src={panel.image}
                            alt={`${panel.label} work preview`}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'saturate(0.9) contrast(1.08)',
                                transform: 'scale(1.01)',
                                transition: 'transform 0.6s ease, filter 0.6s ease',
                                zIndex: -2
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: panel.label === 'Animation'
                                ? 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.72)), linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.12))'
                                : 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.72)), linear-gradient(270deg, rgba(0,0,0,0.45), rgba(0,0,0,0.12))',
                            zIndex: -1
                        }}></div>
                        <div className="hero-panel-caption" style={{
                            maxWidth: '420px'
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                opacity: 0.78,
                                marginBottom: '12px'
                            }}>
                                {panel.label}
                            </span>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                                fontWeight: '700',
                                lineHeight: 1,
                                margin: '0 0 16px',
                                textShadow: '0 2px 20px rgba(0, 0, 0, 0.35)'
                            }}>
                                {panel.title}
                            </h2>
                            <p style={{
                                fontSize: '1rem',
                                lineHeight: 1.55,
                                color: 'rgba(255,255,255,0.82)',
                                maxWidth: '360px'
                            }}>
                                {panel.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Hero Content */}
            <div className="hero-content" style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: '#ffffff',
                maxWidth: '900px',
                justifySelf: 'center',
                alignSelf: 'center',
                padding: '140px 20px 120px',
                pointerEvents: 'none'
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
                    letterSpacing: '0',
                    marginBottom: '40px',
                    opacity: '0.95',
                    maxWidth: '680px',
                    lineHeight: '1.5'
                }}>
                    Visual Artist specialising in Animation and Cinematography
                </p>

                {/* CTA Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    pointerEvents: 'auto'
                }}>
                    <a
                        href="#featured-reel"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: '#ffffff',
                            color: '#1a1a1a',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '15px',
                            fontWeight: '600',
                            letterSpacing: '0.3px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Watch Creative Reel
                    </a>
                    <a
                        href="#about"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: '#ffffff',
                            textDecoration: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '6px',
                            fontSize: '15px',
                            fontWeight: '600',
                            letterSpacing: '0.3px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        About the Work
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
