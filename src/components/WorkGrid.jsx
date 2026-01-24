import React, { useState } from 'react';
import { works } from '../data/content';

function WorkGrid() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    const filteredWorks = activeFilter === 'all' ? works : works.filter(work => work.type === activeFilter);

    function getYouTubeId(url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        if (match && match[1]) return match[1];
        const altMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
        return altMatch ? altMatch[1] : null;
    }

    function getYouTubeThumbnail(url) {
        const ytId = getYouTubeId(url);
        return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
    }

    return (
        <section id="work" style={{
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
                    Selected Work
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    maxWidth: '600px',
                    margin: '0 auto',
                    letterSpacing: '-0.01em'
                }}>
                    A collection of live band performances, late-night sessions, and raw moments captured on DV tape
                </p>
            </div>

            {/* Filter Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '60px',
                flexWrap: 'wrap'
            }}>
                {['all', 'bands', 'djs'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        aria-label={`Filter by ${filter === 'all' ? 'all work' : filter}`}
                        aria-pressed={activeFilter === filter}
                        style={{
                            padding: '12px 24px',
                            background: activeFilter === filter ? '#1a1a1a' : 'transparent',
                            color: activeFilter === filter ? '#ffffff' : '#1a1a1a',
                            border: '1px solid #1a1a1a',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {filter === 'all' ? 'All Work' : filter === 'bands' ? 'Live Bands' : 'DJ Sets'}
                    </button>
                ))}
            </div>

            {/* Work Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '80px'
            }}>
                {filteredWorks.map((work, index) => (
                    <div key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`Watch ${work.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedVideo(work);
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
                        onClick={() => setSelectedVideo(work)}
                    >
                        {/* Thumbnail */}
                        <div style={{
                            height: '240px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={getYouTubeThumbnail(work.url)}
                                alt={`Thumbnail for ${work.title}`}
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
                                {work.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{
                            padding: '24px'
                        }}>
                            <h3 style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                margin: '0 0 8px 0',
                                letterSpacing: '-0.02em'
                            }}>
                                {work.title}
                            </h3>
                            <p style={{
                                color: '#666',
                                fontSize: '0.95rem',
                                margin: '0 0 16px 0',
                                lineHeight: '1.5'
                            }}>
                                {work.description}
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
                                <span>{work.venue}</span>
                                <span>{work.year}</span>
                            </div>

                            {/* Contextual Details */}
                            <div style={{
                                borderTop: '1px solid #eee',
                                paddingTop: '16px',
                                fontSize: '0.9rem'
                            }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <span style={{
                                        fontWeight: '600',
                                        color: '#ffffff',
                                        background: '#1a1a1a',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        display: 'inline-block',
                                        marginBottom: '4px',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>Role</span>
                                    <span style={{ color: '#444', display: 'block', marginTop: '4px', fontWeight: '500' }}>{work.role}</span>
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <span style={{ fontWeight: '600', color: '#1a1a1a', display: 'block', marginBottom: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Concept</span>
                                    <span style={{ color: '#444' }}>{work.concept}</span>
                                </div>
                                <div>
                                    <span style={{ fontWeight: '600', color: '#1a1a1a', display: 'block', marginBottom: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Critical Reflection & Challenges</span>
                                    <span style={{ color: '#444', fontStyle: 'italic' }}>"{work.criticalAnalysis}"</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Reel */}
            <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                color: '#ffffff'
            }}>
                <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.03em'
                }}>
                    Demo Reel
                </h3>
                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.8,
                    margin: '0 0 40px 0'
                }}>
                    A compilation of underground moments captured on DV tape
                </p>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <iframe
                        src="https://www.youtube.com/embed/IUF6f7UPeaQ"
                        title="Josh Moriarty Demo Reel"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Video Lightbox */}
            {
                selectedVideo && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <button style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '40px',
                            cursor: 'pointer',
                            zIndex: 2001
                        }}
                            onClick={() => setSelectedVideo(null)}
                            aria-label="Close lightbox"
                        >
                            ×
                        </button>
                        <div style={{
                            width: '100%',
                            maxWidth: '1000px',
                            aspectRatio: '16/9',
                            position: 'relative',
                            background: '#000',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                            onClick={(e) => e.stopPropagation()}
                        >
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
                    </div>
                )
            }
        </section >
    );
}

export default WorkGrid;
