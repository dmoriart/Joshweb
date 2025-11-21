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
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: '700',
                    margin: '0 0 24px 0',
                    letterSpacing: '-0.04em',
                    lineHeight: '0.9'
                }}>
                    Josh Moriarty<br />Films
                </h1>
                <p style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                    fontWeight: '400',
                    margin: '0 0 40px 0',
                    opacity: 0.9,
                    letterSpacing: '-0.01em'
                }}>
                    Capturing raw, authentic moments through analog grain
                </p>
                <div style={{
                    display: 'inline-block',
                    padding: '12px 32px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                }}>
                    DV Tape • Sony PD170
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
                opacity: 0.7
            }}>
                Scroll to explore
            </div>
        </section>
    );
}

export default Hero;
