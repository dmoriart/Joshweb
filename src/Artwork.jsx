import React from 'react';
import './App.css';

const artworkImages = [
  '/assets/IMG_2041.jpeg',
  '/assets/react.svg',
  // Add more image paths here as needed
];

function Artwork() {
  return (
    <div className="eb-main">
      <header className="eb-header">
        <img src="/assets/IMG_2041.jpeg" alt="Josh Moriarty Logo" className="eb-logo" />
        <h1>Artwork</h1>
        <nav className="eb-nav">
          <a href="/">Home</a>
        </nav>
      </header>
      <main>
        <section className="eb-artwork">
          <h2>Artwork</h2>
          <div className="eb-artwork-gallery">
            {artworkImages.length === 0 && <p>No artwork yet. Check back soon!</p>}
            {artworkImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Artwork ${idx + 1}`}
                className="eb-artwork-img"
                style={{ width: 320, height: 220, objectFit: 'cover', borderRadius: 8, margin: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Artwork;
