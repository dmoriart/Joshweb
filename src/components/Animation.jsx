import React, { useState } from 'react';
import { animations } from '../data/content';

function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match && match[1]) return match[1];
    const altMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    return altMatch ? altMatch[1] : null;
}

function getYouTubeThumbnail(url) {
    const ytId = getYouTubeId(url);
    return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
}

function Animation() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section id="animation" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '80px 20px'
        }}>
            {/* Section Title */}
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
                    lineHeight: '1.1'
                }}>
                    Animation
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    maxWidth: '600px',
                    margin: '0 auto',
                    letterSpacing: '-0.01em'
                }}>
                    Bringing drawings to life — exploring movement, timing, and visual storytelling through hand-drawn animation
                </p>
            </div>

            {/* Animation Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '80px'
            }}>
                {animations.map((anim) => (
                    <div
                        key={anim.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Watch ${anim.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedVideo(anim);
                            }
                        }}
                        style={{
                            background: '#ffffff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }}
                        onClick={() => setSelectedVideo(anim)}
                    >
                        {/* Thumbnail */}
                        <div style={{
                            height: '240px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={getYouTubeThumbnail(anim.url)}
                                alt={`Thumbnail for ${anim.title}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            {/* Play button overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '60px',
                                height: '60px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontSize: '20px'
                            }} aria-hidden="true">
                                ▶
                            </div>

                            {/* Category badge */}
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                color: '#ffffff',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500',
                                textTransform: 'uppercase'
                            }}>
                                {anim.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px' }}>
                            <h3 style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                margin: '0 0 8px 0',
                                letterSpacing: '-0.02em'
                            }}>
                                {anim.title}
                            </h3>
                            <p style={{
                                color: '#666',
                                fontSize: '0.95rem',
                                margin: '0 0 16px 0',
                                lineHeight: '1.5'
                            }}>
                                {anim.description}
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#999',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                marginBottom: '20px'
                            }}>
                                <span>Hand-drawn digital</span>
                                <span>{anim.year}</span>
                            </div>

                            {/* Technical Details */}
                            <div style={{
                                borderTop: '1px solid #eee',
                                paddingTop: '16px',
                                fontSize: '0.9rem'
                            }}>
                                <div>
                                    <span style={{
                                        fontWeight: '600',
                                        color: '#1a1a1a',
                                        display: 'block',
                                        marginBottom: '4px',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>Tools</span>
                                    <span style={{ color: '#444' }}>{anim.technicalDetails}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Modal */}
            {selectedVideo && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.98)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
                    onClick={() => setSelectedVideo(null)}
                >
                    <div style={{
                        width: '100%',
                        maxWidth: '1200px',
                        height: '90vh',
                        background: '#1a1a1a',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            fontSize: '24px',
                            cursor: 'pointer',
                            zIndex: 2002,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                            onClick={() => setSelectedVideo(null)}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 0, 0, 0.5)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        {/* Scrollable content */}
                        <div style={{ overflowY: 'auto', height: '100%' }}>
                            {/* Video */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                background: '#000'
                            }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.url)}?autoplay=1`}
                                    title={selectedVideo.title}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Details */}
                            <div style={{ padding: '40px', color: '#ffffff' }}>
                                {/* Header */}
                                <div style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    paddingBottom: '30px',
                                    marginBottom: '30px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    gap: '20px'
                                }}>
                                    <div>
                                        <span style={{
                                            background: '#ffffff',
                                            color: '#000000',
                                            padding: '4px 12px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            display: 'inline-block',
                                            marginBottom: '12px'
                                        }}>
                                            {selectedVideo.category}
                                        </span>
                                        <h2 style={{
                                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                                            fontWeight: '700',
                                            margin: 0,
                                            lineHeight: 1.1
                                        }}>{selectedVideo.title}</h2>
                                        <div style={{
                                            display: 'flex',
                                            gap: '20px',
                                            marginTop: '12px',
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            fontSize: '1rem'
                                        }}>
                                            <span>Hand-drawn digital</span>
                                            <span>•</span>
                                            <span>{selectedVideo.year}</span>
                                        </div>
                                    </div>

                                    {/* Technical Specs */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        minWidth: '300px'
                                    }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Specifications</h4>
                                        <div style={{ fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'monospace' }}>
                                            {selectedVideo.technicalDetails || 'Autodesk Sketchbook | XP-Pen Artist 15.6'}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div style={{ maxWidth: '800px' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#ffffff' }}>About this piece</h3>
                                    {selectedVideo.description.split('\n\n').map((para, i) => (
                                        <p key={i} style={{ lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem', marginBottom: '16px' }}>
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Animation;
