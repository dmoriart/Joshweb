import React from 'react';
import './App.css';

const artworkImages = [
  '/images/photography/IMG_2041.jpeg',
  '/images/photography/IMG_2042.jpeg',
  '/images/photography/IMG_2043.jpeg',
  '/images/photography/IMG_2044.jpeg',
  '/images/photography/IMG_2045.jpeg',
  '/images/photography/IMG_2046.jpeg',
  '/images/photography/IMG_2242.jpeg',
  '/images/photography/IMG_2243.jpeg',
  '/images/photography/IMG_2244.jpeg',
  '/images/photography/IMG_2245.jpeg',
  '/images/photography/IMG_2246.jpeg',
  '/images/photography/IMG_2247.jpeg',
  '/images/artwork/195f3920-7b0c-4d7b-8023-dd6ec17c01ff.jpeg',
  '/images/artwork/3317fa68-5b21-45f1-95a4-9f0e9fa3c12f.jpeg',
  '/images/artwork/6dfb7c87-a1f1-4e6f-bee2-3bef1474e03c.jpeg',
  '/images/artwork/885611da-0311-4b9e-916c-6e9cccac3236.jpeg',
  '/images/artwork/89eaeab3-e22e-47b1-8752-ab7b1a1a883a.jpeg',
  '/images/artwork/9ae208f5-c832-4b57-9a24-1e4c05dc25af.jpeg',
  '/images/artwork/a158a0ac-89b7-4e57-b25f-1359fbf70080.jpeg',
  '/images/artwork/ae53c6f0-243c-4129-9bc8-a36da2e42321.jpeg',
  '/images/artwork/cabdec1b-489e-4770-9936-4191926ff0b8.jpeg',
  '/images/artwork/d150822e-7a10-4c7b-9a9a-bdfdba9fc729.jpeg',
];

function Artwork() {
  return (
    <div className="eb-main">
      <header className="eb-header">
        <img src="/images/photography/IMG_2041.jpeg" alt="Josh Moriarty Logo" className="eb-logo" style={{ width: '120px', height: 'auto', borderRadius: '50%', marginBottom: '1rem' }} />
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
            {artworkImages.map((src, idx) => (
              <div key={idx} className="eb-artwork-img-container" style={{
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
                  src={src}
                  alt={`Artwork ${idx + 1}`}
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
