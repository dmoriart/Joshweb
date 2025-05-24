import React from 'react';
import './App.css';

const works = [
  { title: 'Stick n poke live', url: 'https://www.youtube.com/watch?v=SEMPZSw37t4' },
  { title: 'next video', url: '#' },
  { title: 'THE HOLIDAY', url: '#' },
  { title: 'skateboarding', url: '#' },
  { title: 'and another', url: '#' },
];

function App() {
  const [previewUrl, setPreviewUrl] = React.useState(null);

  function getYouTubeId(url) {
    // Match both youtube.com/watch?v= and youtu.be/ links
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match && match[1]) return match[1];
    // Also support full URLs with extra params
    const altMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    return altMatch ? altMatch[1] : null;
  }

  function getYouTubeThumbnail(url) {
    const ytId = getYouTubeId(url);
    return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
  }

  return (
    <div className="eb-main">
      <header className="eb-header">
        <img src="/vite.svg" alt="Josh Moriarty Logo" className="eb-logo" />
        <h1>Josh Moriarty</h1>
        <p className="eb-subtitle">Cinematographer</p>
        <nav className="eb-nav">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main>
        <section className="eb-about">
          <p>
            <strong>Hi, I'm Josh Moriarty.</strong><br />
            I'm a student passionate about filmmaking and camera work, seeking work experience, internships, or assistant opportunities in Dublin/Wicklow.<br />
            <br />
            I have hands-on experience filming local events, including live gigs for bands and skateboarding competitions.<br />
            My main camera is the Sony PD170.
          </p>
        </section>
        <section id="work" className="eb-work">
          <h2>My Work</h2>
          <div className="eb-work-list">
            {works.map((work, idx) => {
              const ytId = getYouTubeId(work.url);
              const thumbnail = getYouTubeThumbnail(work.url);
              return (
                <React.Fragment key={idx}>
                  <div
                    className="eb-work-item"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 320, padding: '1rem 0', cursor: 'pointer' }}
                    tabIndex={0}
                    onMouseEnter={() => ytId && setPreviewUrl(ytId)}
                    onMouseLeave={() => setPreviewUrl(null)}
                    onFocus={() => ytId && setPreviewUrl(ytId)}
                    onBlur={() => setPreviewUrl(null)}
                  >
                    {thumbnail && (
                      <>
                        <img
                          src={thumbnail}
                          alt={work.title + ' thumbnail'}
                          style={{ width: '100%', maxWidth: 320, height: 180, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                        />
                        <span style={{ marginTop: 16, fontWeight: 500, fontSize: '1.1rem', textAlign: 'center', width: '100%' }}>{work.title}</span>
                      </>
                    )}
                  </div>
                  {previewUrl && ytId && previewUrl === ytId && (
                    <div className="yt-preview">
                      <iframe
                        width="360"
                        height="203"
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1`}
                        title="YouTube video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>
        <section id="contact" className="eb-contact">
          <h2>Contact</h2>
          <form className="eb-contact-form" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <footer className="eb-footer">
        <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">Vimeo</a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <span>&copy; {new Date().getFullYear()} Josh Moriarty</span>
      </footer>
    </div>
  );
}

export default App;
