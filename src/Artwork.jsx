import React from 'react';
import './App.css';
import { artworks } from './data/content';

function Artwork() {
  return (
    <div className="eb-main">
      <header className="eb-header">
        <img src="/images/photography/IMG_2041.jpeg" alt="Josh Moriarty Logo" className="eb-logo" loading="lazy" style={{ width: '120px', height: 'auto', borderRadius: '50%', marginBottom: '1rem' }} />
        <h1>Artwork</h1>
        <nav className="eb-nav">
          <a href="/">Home</a>
        </nav>
      </header>
      <main>
        <section className="eb-artwork">
          <h2>Artwork</h2>
          <div className="eb-artwork-gallery" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            justifyItems: 'center',
            padding: '2rem 0'
          }}>
            {artworks.map((artwork) => (
              <div key={artwork.id} className="eb-artwork-img-container" style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                width: 340,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}>
                <img
                  src={artwork.src}
                  alt={artwork.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s',
                  }}
                  className="eb-artwork-img"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Artwork;
