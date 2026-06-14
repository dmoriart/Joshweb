import React from 'react';
import { motionClips } from '../data/content';

// Inline, self-hosted 2D movement loops. Videos autoplay muted and loop so
// the movement is visible immediately, without a click or YouTube chrome.
function MotionClipGrid() {
    return (
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
                    <div style={{ background: '#000', lineHeight: 0 }}>
                        {clip.type === 'video' ? (
                            <video
                                src={clip.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                aria-label={clip.title}
                                style={{ width: '100%', display: 'block' }}
                            />
                        ) : (
                            <img
                                src={clip.src}
                                alt={clip.title}
                                loading="lazy"
                                style={{ width: '100%', display: 'block' }}
                            />
                        )}
                    </div>
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
    );
}

export default MotionClipGrid;
