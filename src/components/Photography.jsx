import React, { useState } from 'react';
import { photography } from '../data/content';

function Photography() {
    const [photoFilter, setPhotoFilter] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);

    const filteredPhotos = photoFilter === 'all' ? photography : photography.filter(photo => photo.category === photoFilter);

    return (
        <section id="photography" style={{
            background: '#ffffff',
            padding: '80px 20px'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
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
                        lineHeight: '1.1',
                        color: '#1a1a1a'
                    }}>
                        Photography
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto 40px auto',
                        letterSpacing: '-0.01em'
                    }}>
                        Composition, colour, shape. High-resolution moments complementing the analog grain.
                    </p>
                </div>

                {/* Photo Filter Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '60px',
                    flexWrap: 'wrap'
                }}>
                    {['all', 'street', 'portrait', 'architecture', 'texture'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setPhotoFilter(filter)}
                            aria-label={`Filter by ${filter === 'all' ? 'all photos' : filter}`}
                            aria-pressed={photoFilter === filter}
                            style={{
                                padding: '12px 24px',
                                background: photoFilter === filter ? '#1a1a1a' : 'transparent',
                                color: photoFilter === filter ? '#ffffff' : '#1a1a1a',
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
                            {filter === 'all' ? 'All Photos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Photography Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    {filteredPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            style={{
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                aspectRatio: '3/4',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                transition: 'transform 0.3s ease'
                            }}
                            onClick={() => setLightboxImage(photo)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={photo.src}
                                alt={photo.title}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: '30px 20px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    color: '#ffffff',
                                    transition: 'opacity 0.3s ease'
                                }}
                                className="photo-overlay"
                            >
                                <h3 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '1.2rem',
                                    fontWeight: '600'
                                }}>{photo.title}</h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '0.9rem',
                                    opacity: 0.9
                                }}>{photo.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Responsive CSS for photo overlays */}
                <style>{`
                    .photo-overlay {
                        opacity: 0;
                    }
                    
                    .photo-overlay:hover {
                        opacity: 1 !important;
                    }
                    
                    @media (max-width: 768px) {
                        .photo-overlay {
                            opacity: 1 !important;
                        }
                    }
                `}</style>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    style={{
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
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        style={{
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
                        onClick={() => setLightboxImage(null)}
                    >
                        ×
                    </button>
                    <div
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90vh',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={lightboxImage.src}
                            alt={lightboxImage.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                borderRadius: '4px',
                                boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                            }}
                        />
                        <div style={{
                            color: '#ffffff',
                            marginTop: '20px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ margin: '0 0 8px 0' }}>{lightboxImage.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8 }}>{lightboxImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Photography;
