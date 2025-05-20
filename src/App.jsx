import React from 'react';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <header className="hero">
        <h1>Josh Moriarty</h1>
        <p className="subtitle">Cinematographer</p>
      </header>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
      </nav>
      <section id="about" className="section about">
        <h2>About Josh Moriarty</h2>
        <p>
          Josh Moriarty is a passionate cinematographer with a keen eye for storytelling through visuals. With years of experience in film, commercial, and creative projects, Josh brings a unique perspective to every frame.
        </p>
      </section>
      <section id="gallery" className="section gallery">
        <h2>Gallery / Work</h2>
        <div className="gallery-grid">
          {/* Replace these placeholders with real images or video thumbnails */}
          <div className="gallery-item placeholder">Work 1</div>
          <div className="gallery-item placeholder">Work 2</div>
          <div className="gallery-item placeholder">Work 3</div>
        </div>
      </section>
      <section id="contact" className="section contact">
        <h2>Contact</h2>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Josh Moriarty
      </footer>
    </div>
  );
}

export default App;
