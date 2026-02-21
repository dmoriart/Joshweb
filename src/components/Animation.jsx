import React, { useState } from 'react';
import { animations } from '../data/content';

function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match && match[1]) return match[1];
    const altMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    return altMatch ? altMatch[1] : null;
}

function Animation() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section id="animation" style={{
            padding: '80px 20px',
            background: '#111111',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Section Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '50px'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(255, 255, 255, 0.08)',
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
                            🎬 Animation
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '700',
                        margin: '0 0 20px 0',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.1',
                        color: '#ffffff'
                    }}>
                        Animation Tests
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.6'
                    }}>
                        Exploring movement, timing, and storytelling through animation — building foundational skills in bringing drawings to life
                    </p>
                </div>

                {/* Video Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '24px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}>
                    {animations.map((anim) => {
                        const ytId = getYouTubeId(anim.url);
                        const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

                        return (
                            <div
                                key={anim.id}
                                onClick={() => setSelectedVideo(anim)}
                                onMouseEnter={() => setHoveredId(anim.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredId === anim.id ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: hoveredId === anim.id
                                        ? '0 16px 40px rgba(0,0,0,0.4)'
                                        : '0 4px 20px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                            >
                                {/* Thumbnail */}
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%',
                                    overflow: 'hidden',
                                }}>
                                    {thumbnail && (
                                        <img
                                            src={thumbnail}
                                            alt={anim.title}
                                            loading="lazy"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                transform: hoveredId === anim.id ? 'scale(1.05)' : 'scale(1)',
                                            }}
                                        />
                                    )}
                                    {/* Play button overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '60px',
                                        height: '60px',
                                        background: 'rgba(0, 0, 0, 0.6)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        opacity: hoveredId === anim.id ? 1 : 0.7,
                                        backdropFilter: 'blur(4px)',
                                    }}>
                                        <div style={{
                                            width: 0,
                                            height: 0,
                                            borderLeft: '20px solid #fff',
                                            borderTop: '12px solid transparent',
                                            borderBottom: '12px solid transparent',
                                            marginLeft: '4px',
                                        }}></div>
                                    </div>

                                    {/* Category badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        background: 'rgba(0, 0, 0, 0.6)',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        color: '#fff',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        backdropFilter: 'blur(4px)',
                                    }}>
                                        {anim.category}
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#fff',
                                        margin: '0 0 8px 0',
                                        letterSpacing: '-0.02em'
                                    }}>
                                        {anim.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        margin: '0 0 12px 0',
                                        lineHeight: '1.5'
                                    }}>
                                        {anim.description}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        fontSize: '0.75rem',
                                        color: 'rgba(255, 255, 255, 0.35)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        fontWeight: '600',
                                    }}>
                                        <span>{anim.year}</span>
                                        {anim.technicalDetails && <span>{anim.technicalDetails}</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Video Lightbox */}
            {selectedVideo && (
                <div
                    onClick={() => setSelectedVideo(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        cursor: 'zoom-out',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setSelectedVideo(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            opacity: 0.7,
                            transition: 'opacity 0.2s',
                            zIndex: 10001,
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = 1}
                        onMouseLeave={(e) => e.target.style.opacity = 0.7}
                    >
                        ✕
                    </button>

                    {/* Video embed */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '85vw',
                            maxWidth: '960px',
                            cursor: 'default',
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.url)}?autoplay=1`}
                                title={selectedVideo.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Caption */}
                        <div style={{
                            marginTop: '20px',
                            textAlign: 'center',
                            color: '#fff',
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                margin: '0 0 8px 0',
                            }}>
                                {selectedVideo.title}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                opacity: 0.6,
                                margin: 0,
                            }}>
                                {selectedVideo.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Animation;
