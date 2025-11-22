import React from 'react';
import { credits } from '../data/content';

const Credits = () => {
    return (
        <section id="credits" style={{
            padding: '100px 20px',
            background: '#0a0a0a',
            color: '#ffffff',
            borderTop: '1px solid #333'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '60px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <h2 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        margin: 0,
                        letterSpacing: '-0.03em'
                    }}>
                        Selected Credits
                    </h2>

                    <a
                        href="/Josh_Moriarty_CV.pdf"
                        download
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            textDecoration: 'none',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            borderRadius: '4px',
                            transition: 'transform 0.2s ease, background-color 0.2s ease',
                            border: '1px solid #ffffff'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.backgroundColor = '#e0e0e0';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.backgroundColor = '#ffffff';
                        }}
                    >
                        Download Formal CV
                    </a>
                </div>

                <div style={{
                    display: 'grid',
                    gap: '1px',
                    background: '#333', // Border color for grid items
                    border: '1px solid #333'
                }}>
                    {/* Header Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 2fr 1fr',
                        background: '#1a1a1a',
                        padding: '15px 20px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        color: '#888',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        <div>Role</div>
                        <div>Production</div>
                        <div style={{ textAlign: 'right' }}>Year</div>
                    </div>

                    {/* Credit Rows */}
                    {credits.map((credit, index) => (
                        <div key={index} style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 2fr 1fr',
                            background: '#0a0a0a',
                            padding: '20px',
                            alignItems: 'center',
                            transition: 'background-color 0.2s ease'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#111'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0a0a0a'}
                        >
                            <div style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '500',
                                fontSize: '1.1rem'
                            }}>
                                {credit.role}
                            </div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif",
                                color: '#ccc'
                            }}>
                                {credit.production}
                            </div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif",
                                color: '#666',
                                textAlign: 'right',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {credit.year}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Credits;
