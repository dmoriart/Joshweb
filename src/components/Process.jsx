import React from 'react';

function Process() {
    const processItems = [
        {
            title: 'Storyboarding',
            description: 'Visualizing the narrative flow before the camera rolls. Every shot is planned to ensure the story beats land.',
            src: '/images/process/storyboard.png',
            alt: 'Hand-drawn storyboard sketches'
        },
        {
            title: 'Lighting Design',
            description: 'Technical planning for atmospheric depth. Mapping out light sources to create the signature gritty aesthetic.',
            src: '/images/process/lighting.png',
            alt: 'Technical lighting plan diagram'
        },
        {
            title: 'On Set',
            description: 'The Sony PD170 in action. Capturing the raw energy of the moment with authentic DV tape hardware.',
            src: '/images/process/bts.png',
            alt: 'Behind the scenes camera setup'
        },
        {
            title: 'Post-Production',
            description: 'Where the story comes together. A complex timeline of cuts, color grading, and sound design.',
            src: '/images/process/timeline.png',
            alt: 'Video editing timeline'
        }
    ];

    return (
        <section id="process" style={{
            padding: '100px 20px',
            background: '#f0f0f0'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '80px'
                }}>
                    <h2 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '700',
                        margin: '0 0 20px 0',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.1',
                        color: '#1a1a1a'
                    }}>
                        Process & Development
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto',
                        letterSpacing: '-0.01em'
                    }}>
                        From the first sketch to the final cut. The messy, technical, and creative journey behind the lens.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px'
                }}>
                    {processItems.map((item, index) => (
                        <div key={index} style={{
                            background: '#ffffff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            transition: 'transform 0.3s ease',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                height: '250px',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{
                                padding: '24px'
                            }}>
                                <h3 style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    margin: '0 0 12px 0',
                                    color: '#1a1a1a'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Process;
