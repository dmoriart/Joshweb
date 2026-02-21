import React, { useState, useRef, useEffect } from 'react';
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
    const [reelVisible, setReelVisible] = useState(false);
    const reelRef = useRef(null);

    // The first animation is the featured demo reel
    const featuredReel = animations[0];
    const featuredId = featuredReel ? getYouTubeId(featuredReel.url) : null;

    // Lazy-load the hero iframe only when the section scrolls into view
    useEffect(() => {
        if (!reelRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setReelVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px', threshold: 0.1 }
        );
        observer.observe(reelRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="animation" style={{
            padding: '80px 20px',
            background: '#111111',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Section Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '48px'
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
                        Animation Demo Reel
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.6'
                    }}>
                        Bringing drawings to life — exploring movement, timing, and visual storytelling through hand-drawn animation
                    </p>
                </div>

                {/* ═══════════════════════════════════════════════
                    DEMO REEL HERO — auto-playing featured video
                ═══════════════════════════════════════════════ */}
                {featuredReel && (
                    <div
                        ref={reelRef}
                        style={{
                            marginBottom: '64px',
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 0 80px rgba(255, 255, 255, 0.04), 0 20px 60px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            background: '#000',
                        }}>
                            {/* 16:9 aspect ratio container */}
                            <div style={{
                                position: 'relative',
                                paddingBottom: '56.25%',
                                height: 0,
                            }}>
                                {reelVisible && featuredId ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${featuredId}?autoplay=1&mute=1&loop=1&playlist=${featuredId}&rel=0&modestbranding=1&showinfo=0&controls=1`}
                                        title={featuredReel.title}
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
                                ) : (
                                    /* Thumbnail placeholder before iframe loads */
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: featuredId
                                            ? `url(https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg)`
                                            : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <div style={{
                                            width: '72px',
                                            height: '72px',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backdropFilter: 'blur(4px)',
                                        }}>
                                            <div style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: '24px solid #fff',
                                                borderTop: '14px solid transparent',
                                                borderBottom: '14px solid transparent',
                                                marginLeft: '6px',
                                            }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reel caption */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '20px',
                        }}>
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'rgba(255, 255, 255, 0.45)',
                                margin: 0,
                                fontStyle: 'italic',
                                letterSpacing: '-0.01em',
                            }}>
                                {featuredReel.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════
                    INDIVIDUAL PIECES — listed below the reel
                ═══════════════════════════════════════════════ */}
                <div style={{
                    marginBottom: '16px',
                }}>
                    <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: '0 0 24px 0',
                        letterSpacing: '-0.02em',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        Individual Pieces
                    </h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}>
                        {animations.map((anim) => {
                            const ytId = getYouTubeId(anim.url);
                            const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
                            const isHovered = hoveredId === anim.id;

                            return (
                                <div
                                    key={anim.id}
                                    onClick={() => setSelectedVideo(anim)}
                                    onMouseEnter={() => setHoveredId(anim.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                        background: isHovered
                                            ? 'rgba(255, 255, 255, 0.08)'
                                            : 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div style={{
                                        position: 'relative',
                                        width: '180px',
                                        minWidth: '180px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        aspectRatio: '16 / 9',
                                    }}>
                                        {thumbnail && (
                                            <img
                                                src={thumbnail}
                                                alt={anim.title}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    transition: 'transform 0.4s ease',
                                                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                                                }}
                                            />
                                        )}
                                        {/* Play icon */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '36px',
                                            height: '36px',
                                            background: 'rgba(0, 0, 0, 0.6)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: isHovered ? 1 : 0.6,
                                            transition: 'opacity 0.25s ease',
                                            backdropFilter: 'blur(4px)',
                                        }}>
                                            <div style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: '12px solid #fff',
                                                borderTop: '7px solid transparent',
                                                borderBottom: '7px solid transparent',
                                                marginLeft: '2px',
                                            }}></div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            color: '#fff',
                                            margin: '0 0 6px 0',
                                            letterSpacing: '-0.02em',
                                        }}>
                                            {anim.title}
                                        </h4>
                                        <p style={{
                                            fontSize: '0.85rem',
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            margin: '0 0 8px 0',
                                            lineHeight: '1.5',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {anim.description}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            gap: '12px',
                                            fontSize: '0.7rem',
                                            color: 'rgba(255, 255, 255, 0.3)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            fontWeight: '600',
                                        }}>
                                            <span>{anim.year}</span>
                                            {anim.technicalDetails && <span>• {anim.technicalDetails}</span>}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div style={{
                                        fontSize: '1.2rem',
                                        color: 'rgba(255, 255, 255, 0.25)',
                                        transition: 'all 0.25s ease',
                                        opacity: isHovered ? 1 : 0.4,
                                        transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                                    }}>
                                        →
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                VIDEO LIGHTBOX — click a piece to watch
            ═══════════════════════════════════════════════ */}
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
