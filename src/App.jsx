import React from 'react';
import './App.css';
import Artwork from './Artwork';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const works = [
  { title: 'Stick n poke live in the Sound House', url: 'https://www.youtube.com/watch?v=iCS1T7Vsx5k' },
  { title: 'Shoutout', url: 'https://www.youtube.com/watch?v=AidsPG4xpMk' },
  { title: 'SoundCloud', url: 'https://www.youtube.com/watch?v=1aF9i1MaCsE' },
  { title: 'Soundcloud 2', url: 'https://www.youtube.com/watch?v=dsr27porhDA' },
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
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="eb-main">
            <header className="eb-header" style={{ background: '#fff', borderBottom: '1px solid #ececec', paddingBottom: 16 }}>
              <img src="/IMG_2041.jpeg" alt="Josh Moriarty Logo" className="eb-logo" style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '50%', margin: '32px auto 12px', display: 'block', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} onError={(e) => { e.target.onerror = null; e.target.src = "/assets/IMG_2041.jpeg"; }} />
              <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: '2.2rem', margin: 0, color: '#181818', letterSpacing: 0.5 }}>Josh Moriarty</h1>
              <p className="eb-subtitle" style={{ textAlign: 'center', color: '#444', fontSize: '1.2rem', margin: '8px 0 0 0' }}>Camera Operator & Visual Artist</p>
              <nav className="eb-nav" style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 18 }}>
                <a href="#work" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Work</a>
                <a href="#contact" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
                <a href="/artwork" style={{ fontWeight: 600, color: '#222', textDecoration: 'none' }} onClick={e => { e.preventDefault(); window.history.pushState({}, '', '/artwork'); window.dispatchEvent(new PopStateEvent('popstate')); }}>Artwork</a>
              </nav>
            </header>
            <main>
              <section className="eb-about" style={{ maxWidth: 700, margin: '48px auto 32px', background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '2.5rem 2rem' }}>
                <p style={{ fontSize: '1.18rem', color: '#222', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ fontSize: '1.25rem', color: '#181818' }}>Hi, I'm Josh Moriarty.</strong><br />
                  I'm a student passionate about filmmaking and camera work, seeking work experience, internships, or assistant opportunities in Dublin/Wicklow.<br />
                  <br />
                  I have hands-on experience filming local events, including live gigs for bands and skateboarding competitions.<br />
                  My main camera is the Sony PD170.
                </p>
              </section>
              <section className="eb-hero" style={{ background: '#f5f6fa', padding: '32px 0 48px', borderRadius: 16, margin: '0 auto 32px', maxWidth: 1100, boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
                <div className="eb-hero-video-container" style={{ width: '100%', maxWidth: 900, margin: '0 auto', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
                  <iframe
                    src="https://www.youtube.com/embed/SEMPZSw37t4?autoplay=1&mute=1&controls=0&loop=1&playlist=SEMPZSw37t4"
                    title="Josh Moriarty Reel"
                    width="100%"
                    height="480"
                    style={{ border: 0, width: '100%', minHeight: 320 }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="eb-hero-content" style={{ textAlign: 'center', marginTop: 32 }}>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 12, color: '#181818' }}>Meet Josh Moriarty: Camera Operator & Visual Artist</h1>
                  <p style={{ fontSize: '1.18rem', color: '#444', marginBottom: 24 }}>
                    Capturing stories and moments with a creative eye and technical precision.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                    <a href="#work" className="eb-btn eb-btn-primary" style={{ padding: '0.9em 2.2em', fontSize: '1.1rem', borderRadius: 8, background: '#222', color: '#fff', textDecoration: 'none', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
                      View Portfolio
                    </a>
                    <a href="#contact" className="eb-btn eb-btn-secondary" style={{ padding: '0.9em 2.2em', fontSize: '1.1rem', borderRadius: 8, background: '#fff', color: '#222', textDecoration: 'none', fontWeight: 600, border: '2px solid #222' }}>
                      Get in Touch
                    </a>
                  </div>
                </div>
              </section>
              <section id="work" className="eb-work" style={{ maxWidth: 1100, margin: '0 auto 48px', padding: '0 1rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#181818', marginBottom: 24, textAlign: 'center', letterSpacing: 0.2 }}>My Work</h2>
                <div className="eb-work-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                  {works.map((work, idx) => {
                    const ytId = getYouTubeId(work.url);
                    const thumbnail = getYouTubeThumbnail(work.url);
                    return (
                      <React.Fragment key={idx}>
                        <div
                          className="eb-work-item"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 320, padding: '1rem 0', cursor: ytId ? 'pointer' : 'default' }}
                          tabIndex={0}
                          onMouseEnter={() => ytId && setPreviewUrl(ytId)}
                          onMouseLeave={() => setPreviewUrl(null)}
                          onFocus={() => ytId && setPreviewUrl(ytId)}
                          onBlur={() => setPreviewUrl(null)}
                        >
                          {thumbnail && ytId ? (
                            <a
                              href={work.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                              tabIndex={-1}
                            >
                              <img
                                src={thumbnail}
                                alt={work.title + ' thumbnail'}
                                style={{ width: '100%', maxWidth: 320, height: 180, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                              />
                              <span style={{ marginTop: 16, fontWeight: 500, fontSize: '1.1rem', textAlign: 'center', width: '100%' }}>{work.title}</span>
                            </a>
                          ) : (
                            <>
                              {thumbnail && (
                                <img
                                  src={thumbnail}
                                  alt={work.title + ' thumbnail'}
                                  style={{ width: '100%', maxWidth: 320, height: 180, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                                />
                              )}
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
              <section id="contact" className="eb-contact" style={{ maxWidth: 600, margin: '0 auto 48px', background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '2.5rem 2rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '2rem', color: '#181818', marginBottom: 24, textAlign: 'center', letterSpacing: 0.2 }}>Contact</h2>
                <form className="eb-contact-form" onSubmit={async e => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form[0].value,
                    email: form[1].value,
                    message: form[2].value
                  };
                  // Use Formspree for email forwarding
                  const res = await fetch('https://formspree.io/f/xpwdgzej', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: data.name,
                      email: data.email,
                      message: data.message
                    })
                  });
                  if (res.ok) {
                    alert('Message sent!');
                    form.reset();
                  } else {
                    alert('There was an error sending your message.');
                  }
                }}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Your Message" required></textarea>
                  <button type="submit">Send</button>
                </form>
              </section>
            </main>
            <footer className="eb-footer" style={{ background: '#181818', color: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 48 }}>
              <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 18px', fontWeight: 500, textDecoration: 'underline' }}>Vimeo</a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 18px', fontWeight: 500, textDecoration: 'underline' }}>Instagram</a>
              <span style={{ display: 'block', marginTop: 18, fontSize: '1.1rem', color: '#bbb' }}>&copy; {new Date().getFullYear()} Josh Moriarty</span>
            </footer>
          </div>
        } />
        <Route path="/artwork" element={<Artwork />} />
      </Routes>
    </Router>
  );
}

export default App;
