import React, { useState } from 'react';
import { animations, artworks, cleanups } from '../data/content';
import MotionClipGrid from './MotionClipGrid';
import Lightbox from './Lightbox';
import ResponsiveImage from './ResponsiveImage';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../lib/youtube';

// Strongest 2D movement tests for the application-focused preview.
const FEATURED_ANIMATION_IDS = [2];
// Strongest cartoon / character drawings.
const FEATURED_DRAWING_IDS = [66, 62, 63, 64, 65];

function scrollToSection(href) {
    const el = document.querySelector(href);
    if (!el) return;
    const navHeight = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function SubheadingBlock({ number, title, blurb }) {
    return (
        <div style={{ marginBottom: '32px' }}>
            <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.6rem',
                fontWeight: '700',
                margin: '0 0 8px 0',
                letterSpacing: '-0.02em'
            }}>
                <span style={{ color: '#999', marginRight: '12px' }}>{number}</span>
                {title}
            </h3>
            <p style={{ color: '#666', fontSize: '1rem', margin: 0, maxWidth: '720px', lineHeight: '1.6' }}>
                {blurb}
            </p>
        </div>
    );
}

function Portfolio() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const featuredAnimations = FEATURED_ANIMATION_IDS
        .map((id) => animations.find((a) => a.id === id))
        .filter(Boolean);
    const featuredDrawings = FEATURED_DRAWING_IDS
        .map((id) => artworks.find((a) => a.id === id))
        .filter(Boolean);

    return (
        <section id="portfolio" style={{
            padding: '100px 20px',
            background: '#ffffff',
            borderBottom: '1px solid rgba(26, 26, 26, 0.08)'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Title + intro */}
                <div style={{ marginBottom: '60px' }}>
                    <span style={{
                        display: 'inline-block',
                        background: '#1a1a1a',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '20px'
                    }}>
                        Application Portfolio
                    </span>
                    <h2 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                        fontWeight: '700',
                        margin: '0 0 24px 0',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.1'
                    }}>
                        Animation / Clean-Up Portfolio
                    </h2>
                    <p style={{
                        fontSize: '1.15rem',
                        color: '#444',
                        maxWidth: '820px',
                        lineHeight: '1.8',
                        margin: 0
                    }}>
                        I am an emerging visual artist and filmmaker with a strong interest in 2D animation,
                        clean-up work, movement and character-based storytelling. This page brings together selected
                        animation tests and cartoon-style drawings that show my interest in timing, line quality,
                        character consistency and visual storytelling.
                    </p>
                </div>

                {/* 1. 2D Movement Animation */}
                <SubheadingBlock
                    number="1"
                    title="2D Movement Animation"
                    blurb="Selected frame-by-frame tests exploring timing, pose changes, spacing and gesture."
                />
                <div style={{ marginBottom: '24px' }}>
                    <MotionClipGrid />
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    marginBottom: '70px'
                }}>
                    {featuredAnimations.map((anim) => (
                        <button
                            key={anim.id}
                            onClick={() => setSelectedVideo(anim)}
                            aria-label={`Watch ${anim.title}`}
                            style={{
                                textAlign: 'left',
                                padding: 0,
                                border: 'none',
                                background: '#fff',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                        >
                            <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#000' }}>
                                <img
                                    src={getYouTubeThumbnail(anim.url)}
                                    alt={`Thumbnail for ${anim.title}`}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '48px',
                                    height: '48px',
                                    background: 'rgba(0,0,0,0.8)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '16px'
                                }} aria-hidden="true">▶</div>
                            </div>
                            <div style={{ padding: '16px 18px' }}>
                                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: '600', letterSpacing: '-0.01em' }}>
                                    {anim.title}
                                </h4>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {anim.description.split('\n\n')[0]}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 2. Character Drawings / Line Work */}
                <SubheadingBlock
                    number="2"
                    title="Character Drawings / Line Work"
                    blurb="Cartoon-style and character drawings exploring expression, shape, pose and personality."
                />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: cleanups.length > 0 ? '70px' : '50px'
                }}>
                    {featuredDrawings.map((art) => (
                        <button
                            key={art.id}
                            onClick={() => setSelectedImage(art)}
                            aria-label={`View ${art.title}`}
                            style={{
                                padding: 0,
                                border: 'none',
                                background: '#e0e0e0',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                            }}
                        >
                            <ResponsiveImage
                                src={art.src}
                                alt={`${art.title}. ${art.description}`}
                                sizes="(max-width: 700px) 45vw, 200px"
                                style={{ width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'contain', display: 'block' }}
                            />
                        </button>
                    ))}
                </div>

                {/* 3. Clean-Up / Before-and-After (only when an example exists) */}
                {cleanups.length > 0 && (
                    <>
                        <SubheadingBlock
                            number="3"
                            title="Clean-Up / Before-and-After"
                            blurb="A rough original drawing refined into clean, consistent line work — showing line consistency, readability and a preserved pose."
                        />
                        <div style={{ marginBottom: '50px' }}>
                            {cleanups.map((ex) => (
                                <figure key={ex.id} style={{ margin: '0 0 40px 0' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                        gap: '20px'
                                    }}>
                                        {ex.images.map((img) => (
                                            <div key={img.label} style={{
                                                position: 'relative',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                background: '#f0f0f0',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    zIndex: 1,
                                                    background: 'rgba(0,0,0,0.8)',
                                                    color: '#fff',
                                                    padding: '4px 10px',
                                                    borderRadius: '14px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>{img.label}</span>
                                                {img.src ? (
                                                    <ResponsiveImage
                                                        src={img.src}
                                                        alt={`${img.label} drawing`}
                                                        sizes="(max-width: 700px) 92vw, 400px"
                                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        aspectRatio: '3 / 4',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        border: '2px dashed #ccc',
                                                        borderRadius: '10px',
                                                        color: '#aaa',
                                                        textAlign: 'center',
                                                        padding: '20px'
                                                    }}>
                                                        <span style={{ fontSize: '1.8rem', lineHeight: 1 }} aria-hidden="true">+</span>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Photo coming soon</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <figcaption style={{ color: '#666', fontSize: '0.95rem', marginTop: '14px', lineHeight: '1.6', maxWidth: '820px' }}>
                                        {ex.caption}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </>
                )}

                {/* Link buttons to full sections */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    paddingTop: '20px'
                }}>
                    <button
                        onClick={() => scrollToSection('#animation')}
                        style={primaryButtonStyle}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        View full Animation section →
                    </button>
                    <button
                        onClick={() => scrollToSection('#artwork')}
                        style={secondaryButtonStyle}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a'; }}
                    >
                        View full Drawing Portfolio →
                    </button>
                </div>
            </div>

            {selectedVideo && (
                <Lightbox
                    label={`${selectedVideo.title}, video player`}
                    onClose={() => setSelectedVideo(null)}
                    caption={<h3 className="jm-lightbox__title">{selectedVideo.title}</h3>}
                >
                    <div style={{ width: 'min(960px, 90vw)', aspectRatio: '16 / 9', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                        <iframe
                            src={getYouTubeEmbedUrl(selectedVideo.url)}
                            title={selectedVideo.title}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Lightbox>
            )}

            {selectedImage && (
                <Lightbox
                    label={`${selectedImage.title}, artwork viewer`}
                    onClose={() => setSelectedImage(null)}
                    caption={
                        <>
                            <h3 className="jm-lightbox__title">{selectedImage.title}</h3>
                            <p className="jm-lightbox__description">{selectedImage.description}</p>
                        </>
                    }
                >
                    <ResponsiveImage
                        full
                        priority
                        src={selectedImage.src}
                        alt={`${selectedImage.title}. ${selectedImage.description}`}
                    />
                </Lightbox>
            )}
        </section>
    );
}

const primaryButtonStyle = {
    padding: '14px 28px',
    background: '#1a1a1a',
    color: '#fff',
    border: '2px solid #1a1a1a',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
};

const secondaryButtonStyle = {
    padding: '14px 28px',
    background: 'transparent',
    color: '#1a1a1a',
    border: '2px solid #1a1a1a',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease, color 0.2s ease'
};

export default Portfolio;
