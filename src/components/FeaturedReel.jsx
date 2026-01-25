import React, { useState } from 'react';

function FeaturedReel() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="featured-reel" style={{
            maxWidth: '1400px',
            margin: '-60px auto 0',
            padding: '0 20px 60px',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Featured Demo Reel Card - Elevated Design */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                borderRadius: '20px',
                padding: '60px 40px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle grain texture overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    opacity: 0.03,
                    pointerEvents: 'none'
                }}></div>

                {/* Content Container */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            marginBottom: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <span style={{
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                opacity: 0.9
                            }}>
                                ⭐ Featured Showreel
                            </span>
                        </div>

                        <h2 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: '700',
                            margin: '0 0 16px 0',
                            letterSpacing: '-0.03em',
                            color: '#ffffff',
                            lineHeight: '1.1'
                        }}>
                            Demo Reel 2025
                        </h2>

                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6',
                            letterSpacing: '-0.01em'
                        }}>
                            A curated compilation of underground moments from Dublin's music scene—raw performances,
                            intimate DJ sets, and the authentic energy of DV tape cinematography
                        </p>
                    </div>

                    {/* Video Player */}
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        position: 'relative'
                    }}>
                        {/* Video Container with 16:9 Aspect Ratio */}
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%', // 16:9 aspect ratio
                            height: 0,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5)',
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <iframe
                                src={`https://www.youtube.com/embed/IUF6f7UPeaQ${isPlaying ? '?autoplay=1' : ''}`}
                                title="Josh Moriarty Films - Demo Reel 2025"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                onLoad={() => setIsPlaying(true)}
                            ></iframe>
                        </div>

                        {/* Technical Details Below Video */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '40px',
                            marginTop: '30px',
                            flexWrap: 'wrap',
                            padding: '0 20px'
                        }}>
                            {[
                                { label: 'Format', value: 'DV Tape' },
                                { label: 'Camera', value: 'Sony PD170' },
                                { label: 'Duration', value: '3:42' },
                                { label: 'Year', value: '2025' }
                            ].map((item, index) => (
                                <div key={index} style={{
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        marginBottom: '6px',
                                        fontWeight: '600'
                                    }}>
                                        {item.label}
                                    </div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        fontWeight: '600'
                                    }}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '40px'
                        }}>
                            <a
                                href="#work"
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 32px',
                                    background: '#ffffff',
                                    color: '#1a1a1a',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    letterSpacing: '0.3px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 25px rgba(255, 255, 255, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                View Full Portfolio →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedReel;
