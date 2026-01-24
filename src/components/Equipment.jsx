import React from 'react';

function Equipment() {
    const equipment = [
        {
            name: 'Sony PD170',
            type: 'Professional DV Camcorder',
            image: '/images/equipment/sony-pd170.png',
            description: 'Primary camera for all video work. 3-CCD professional DV tape camcorder.'
        },
        {
            name: 'Sony CCD-TR810E',
            type: 'Hi8 & Video8 Handycam',
            image: '/images/equipment/sony-tr810e.png',
            description: 'Compact Hi8/Video8 camcorder for alternative perspectives and analog experimentation.'
        },
        {
            name: 'FED-3 Olympic',
            type: 'Soviet Rangefinder Camera',
            image: '/images/equipment/fed3-olympic.png',
            description: '35mm film rangefinder camera for still photography and visual inspiration.'
        },
        {
            name: 'Petri 1.9 Super',
            type: 'Japanese Rangefinder',
            image: '/images/equipment/petri-super.png',
            description: 'Fast f/1.9 lens rangefinder for low-light photography experiments.'
        },
        {
            name: 'Cosina',
            type: '35mm SLR Camera',
            image: '/images/equipment/cosina.png',
            description: 'Vintage SLR for film photography and understanding classic cinematography techniques.'
        }
    ];

    return (
        <section id="equipment" style={{
            padding: '100px 20px',
            background: '#ffffff'
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
                        Equipment & Tools
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto',
                        letterSpacing: '-0.01em'
                    }}>
                        Cameras and equipment I work with — from professional DV tape to vintage film
                    </p>
                </div>

                {/* Equipment Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {equipment.map((item, index) => (
                        <div key={index} style={{
                            background: '#f8f8f8',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            {/* Camera Image */}
                            <div style={{
                                height: '240px',
                                background: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>

                            {/* Camera Info */}
                            <div style={{
                                padding: '24px'
                            }}>
                                <h3 style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    margin: '0 0 8px 0',
                                    color: '#1a1a1a'
                                }}>
                                    {item.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#888',
                                    margin: '0 0 12px 0',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {item.type}
                                </p>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#555',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Equipment;
