import React, { useState } from 'react';
import { processItems } from '../data/content';

function Process() {
    const [selectedItem, setSelectedItem] = useState(null);

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
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                            }}
                            onClick={() => setSelectedItem(item)}
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
                                <div style={{
                                    marginTop: '16px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    View Details <span>→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Process Lightbox */}
            {
                selectedItem && (
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
                        onClick={() => setSelectedItem(null)}
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
                            onClick={() => setSelectedItem(null)}
                        >
                            ×
                        </button>
                        <div style={{
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            background: '#ffffff',
                            borderRadius: '12px',
                            padding: '40px'
                        }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '2rem',
                                fontWeight: '700',
                                marginBottom: '20px',
                                color: '#1a1a1a'
                            }}>
                                {selectedItem.title}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {selectedItem.details && selectedItem.details.map((detail, idx) => (
                                    <div key={idx}>
                                        {detail.type === 'image' && (
                                            <div style={{ marginBottom: '10px' }}>
                                                <img src={detail.src} alt={detail.caption} style={{ width: '100%', borderRadius: '8px' }} />
                                                {detail.caption && <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>{detail.caption}</p>}
                                            </div>
                                        )}
                                        {detail.type === 'text' && (
                                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
                                                {detail.content}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
}

export default Process;
