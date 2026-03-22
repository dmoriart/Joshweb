import React, { useState, useEffect, useCallback } from 'react';
import { artworks } from './data/content';

const categories = [
  { key: 'all', label: 'All Work' },
  { key: 'self-portraits', label: 'Self Portraits' },
  { key: 'fan-art', label: 'Character & Fan Art' },
  { key: 'viewpoint', label: 'View & Viewpoint' },
  { key: 'street', label: 'Street' },
  { key: 'digital', label: 'Digital Artwork' },
  { key: 'photoshoot', label: 'Photoshoot' },
  { key: 'sketchbook', label: 'Sketchbook & Studies' },
];

function Artwork() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeFilter === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeFilter);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!selectedImage) return;
    if (e.key === 'Escape') setSelectedImage(null);
    if (e.key === 'ArrowRight') {
      const idx = filtered.findIndex(a => a.id === selectedImage.id);
      if (idx < filtered.length - 1) setSelectedImage(filtered[idx + 1]);
    }
    if (e.key === 'ArrowLeft') {
      const idx = filtered.findIndex(a => a.id === selectedImage.id);
      if (idx > 0) setSelectedImage(filtered[idx - 1]);
    }
  }, [selectedImage, filtered]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedImage]);

  const getCategoryLabel = (key) => {
    const cat = categories.find(c => c.key === key);
    return cat ? cat.label : key;
  };

  return (
    <>
      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '50px'
      }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveFilter(cat.key)}
            aria-label={`Filter by ${cat.label}`}
            aria-pressed={activeFilter === cat.key}
            style={{
              padding: '10px 22px',
              border: activeFilter === cat.key ? '2px solid #1a1a1a' : '2px solid #ddd',
              borderRadius: '30px',
              background: activeFilter === cat.key ? '#1a1a1a' : 'transparent',
              color: activeFilter === cat.key ? '#fff' : '#555',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.3px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== cat.key) {
                e.target.style.borderColor = '#1a1a1a';
                e.target.style.color = '#1a1a1a';
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== cat.key) {
                e.target.style.borderColor = '#ddd';
                e.target.style.color = '#555';
              }
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Piece count */}
      <p style={{
        textAlign: 'center',
        color: '#999',
        fontSize: '0.9rem',
        marginBottom: '30px',
        fontWeight: '500'
      }}>
        Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Masonry Grid */}
      <div style={{
        columnCount: 3,
        columnGap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
        className="artwork-masonry"
      >
        {filtered.map((artwork) => (
          <div
            key={artwork.id}
            onClick={() => setSelectedImage(artwork)}
            onMouseEnter={() => setHoveredId(artwork.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              breakInside: 'avoid',
              marginBottom: '20px',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: hoveredId === artwork.id ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoveredId === artwork.id
                ? '0 16px 40px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <img
              src={artwork.src}
              alt={artwork.title}
              loading="lazy"
              style={{
                width: '100%',
                display: 'block',
                aspectRatio: '3 / 4',
                objectFit: 'cover',
                backgroundColor: '#e0e0e0',
                transition: 'transform 0.5s ease',
                transform: hoveredId === artwork.id ? 'scale(1.03)' : 'scale(1)',
              }}
            />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '40px 16px 16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              opacity: hoveredId === artwork.id ? 1 : 0,
              transition: 'opacity 0.3s ease',
              color: '#fff',
            }}>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                marginBottom: '4px',
                letterSpacing: '-0.01em'
              }}>
                {artwork.title}
              </div>
              <div style={{
                fontSize: '0.75rem',
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {getCategoryLabel(artwork.category)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.92)',
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
            onClick={() => setSelectedImage(null)}
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

          {/* Prev / Next arrows */}
          {filtered.findIndex(a => a.id === selectedImage.id) > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = filtered.findIndex(a => a.id === selectedImage.id);
                setSelectedImage(filtered[idx - 1]);
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: '#fff',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                zIndex: 10001,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ‹
            </button>
          )}

          {filtered.findIndex(a => a.id === selectedImage.id) < filtered.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = filtered.findIndex(a => a.id === selectedImage.id);
                setSelectedImage(filtered[idx + 1]);
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: '#fff',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                zIndex: 10001,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ›
            </button>
          )}

          {/* Image */}
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '85vw',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: '4px',
              cursor: 'default',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          />

          {/* Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: '24px',
              textAlign: 'center',
              color: '#fff',
              cursor: 'default',
              maxWidth: '600px',
            }}
          >
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em'
            }}>
              {selectedImage.title}
            </h3>
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              margin: '0 0 6px 0',
              lineHeight: '1.5'
            }}>
              {selectedImage.description}
            </p>
            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.5,
            }}>
              {getCategoryLabel(selectedImage.category)}
            </span>

            {/* Image counter */}
            <div style={{
              marginTop: '16px',
              fontSize: '0.8rem',
              opacity: 0.4,
            }}>
              {filtered.findIndex(a => a.id === selectedImage.id) + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
                @media (max-width: 900px) {
                    .artwork-masonry {
                        column-count: 2 !important;
                    }
                }
                @media (max-width: 550px) {
                    .artwork-masonry {
                        column-count: 1 !important;
                        column-gap: 16px !important;
                    }
                }
            `}</style>
    </>
  );
}

export default Artwork;
