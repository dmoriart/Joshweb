import React, { useState } from 'react';
import { photography } from '../data/content';

function Photography() {
    const [lightboxImage, setLightboxImage] = useState(null);

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

                {/* Collections Grid */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '100px'
                }}>
                    {photography.map((collection) => (
                        <div key={collection.id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}>
                            {/* Collection Header */}
                            <div style={{
                                borderBottom: '1px solid #eee',
                                paddingBottom: '20px'
                            }}>
                                <h3 style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1.8rem',
                                    fontWeight: '600',
                                    margin: '0 0 10px 0',
                                    color: '#1a1a1a'
                                }}>{collection.title}</h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#666',
                                    margin: 0,
                                    maxWidth: '600px'
                                }}>{collection.description}</p>
                            </div>

                            {/* Collection Images */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '20px'
                            }}>
                                {collection.images.map((photo) => (
                                    <div
                                        key={photo.id}
                                        style={{
                                            position: 'relative',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            aspectRatio: '3/4',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
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
                                                padding: '20px',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                color: '#ffffff',
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            className="photo-overlay"
                                        >
                                            <h4 style={{
                                                margin: '0 0 4px 0',
                                                fontSize: '1.1rem',
                                                fontWeight: '500'
                                            }}>{photo.title}</h4>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '0.85rem',
                                                opacity: 0.9
                                            }}>{photo.description}</p>
                                        </div>
                                    </div>
                                ))}
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
