import React, { useState, useEffect } from 'react';
import { motionClips } from '../data/content';

// Inline, self-hosted 2D movement loops. Videos autoplay muted and loop so
// the movement is visible immediately, without a click or YouTube chrome.
// Clicking any clip opens an enlarged lightbox view.
function MotionClipGrid() {
    const [selected, setSelected] = useState(null);

    // Close lightbox on Escape and lock body scroll while open.
    useEffect(() => {
        if (!selected) return;
        const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [selected]);

    const renderMedia = (clip, enlarged) => (
        clip.type === 'video' ? (
            <video
                src={clip.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={enlarged}
                aria-label={clip.title}
                style={enlarged
                    ? { maxWidth: '90vw', maxHeight: '82vh', display: 'block', borderRadius: '8px' }
                    : { width: '100%', display: 'block' }}
            />
        ) : (
            <img
                src={clip.src}
                alt={clip.title}
                loading="lazy"
                style={enlarged
                    ? { maxWidth: '90vw', maxHeight: '82vh', display: 'block', borderRadius: '8px' }
                    : { width: '100%', display: 'block' }}
            />
        )
    );

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px'
            }}>
                {motionClips.map((clip) => (
                    <figure key={clip.id} style={{
                        margin: 0,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#fff',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <button
                            type="button"
                            onClick={() => setSelected(clip)}
                            aria-label={`Enlarge ${clip.title}`}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: 0,
                                border: 'none',
                                background: '#000',
                                lineHeight: 0,
                                cursor: 'zoom-in',
                                position: 'relative'
                            }}
                        >
                            {renderMedia(clip, false)}
                            {/* Expand hint */}
                            <span style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'rgba(0,0,0,0.65)',
                                color: '#fff',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px'
                            }} aria-hidden="true">⛶</span>
                        </button>
                        <figcaption style={{ padding: '14px 16px' }}>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: '600', letterSpacing: '-0.01em' }}>
                                {clip.title}
                            </h4>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.88rem', lineHeight: '1.5' }}>
                                {clip.caption}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Enlarged lightbox */}
            {selected && (
                <div
                    onClick={() => setSelected(null)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 2000,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '20px', backdropFilter: 'blur(10px)', cursor: 'zoom-out'
                    }}
                >
                    <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', textAlign: 'center' }}>
                        {renderMedia(selected, true)}
                        <p style={{ color: '#fff', marginTop: '16px', fontSize: '1rem' }}>{selected.title}</p>
                    </div>
                    <button
                        onClick={() => setSelected(null)}
                        aria-label="Close"
                        style={{
                            position: 'fixed', top: '20px', right: '24px',
                            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', width: '44px', height: '44px', borderRadius: '50%',
                            fontSize: '24px', cursor: 'pointer', zIndex: 2002
                        }}
                    >×</button>
                </div>
            )}
        </>
    );
}

export default MotionClipGrid;
