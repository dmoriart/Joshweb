import React from 'react';
import './App.css';
import Artwork from './Artwork';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const works = [
  { 
    title: 'Stick n poke live in the Sound House', 
    url: 'https://www.youtube.com/watch?v=iCS1T7Vsx5k',
    type: 'bands',
    description: 'Raw energy captured in analog grain - this underground gig had the perfect chaos for DV tape.'
  },
  { 
    title: 'DJ Shoutout - Club Night', 
    url: 'https://www.youtube.com/watch?v=AidsPG4xpMk',
    type: 'djs',
    description: 'Late night club vibes with that authentic analog texture only DV can deliver.'
  },
  { 
    title: 'SoundCloud Session', 
    url: 'https://www.youtube.com/watch?v=1aF9i1MaCsE',
    type: 'bands',
    description: 'Behind the scenes footage showing the real moments between the music.'
  },
  { 
    title: 'Underground DJ Set', 
    url: 'https://www.youtube.com/watch?v=dsr27porhDA',
    type: 'djs',
    description: 'Basement vibes captured with cinematic grain that digital can\'t touch.'
  },
];

function App() {
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState('all');

  function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match && match[1]) return match[1];
    const altMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    return altMatch ? altMatch[1] : null;
  }

  function getYouTubeThumbnail(url) {
    const ytId = getYouTubeId(url);
    return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
  }

  const filteredWorks = activeFilter === 'all' ? works : works.filter(work => work.type === activeFilter);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="jm-main" style={{ background: '#0a0a0a', color: '#e8e8e8', fontFamily: "'Courier New', monospace" }}>
            {/* Navigation */}
            <nav className="jm-nav" style={{ 
              position: 'fixed', 
              top: 0, 
              width: '100%', 
              background: 'rgba(10,10,10,0.95)', 
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              padding: '1rem 2rem',
              borderBottom: '2px solid #ff6b35'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ fontFamily: "'Impact', sans-serif", fontSize: '1.5rem', color: '#ff6b35', letterSpacing: '2px' }}>
                  JOSH MORIARTY
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <a href="#work" style={{ color: '#e8e8e8', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>WORK</a>
                  <a href="#ethos" style={{ color: '#e8e8e8', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>ETHOS</a>
                  <a href="#contact" style={{ color: '#e8e8e8', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>HIRE ME</a>
                  <a href="/artwork" style={{ color: '#e8e8e8', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>ART</a>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="jm-hero" style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              paddingTop: '80px',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              overflow: 'hidden'
            }}>
              {/* Background texture overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255,107,53,0.03) 2px,
                    rgba(255,107,53,0.03) 4px
                  )
                `,
                pointerEvents: 'none'
              }}></div>

              <div className="jm-hero-video" style={{ 
                width: '80%', 
                maxWidth: 800, 
                marginBottom: '3rem',
                position: 'relative',
                border: '3px solid #ff6b35',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 30px rgba(255,107,53,0.3)'
              }}>
                <iframe
                  src="https://www.youtube.com/embed/SEMPZSw37t4?autoplay=1&mute=1&controls=0&loop=1&playlist=SEMPZSw37t4"
                  title="Josh Moriarty Showreel"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
                {/* DV Tape overlay */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0,0,0,0.8)',
                  color: '#ff6b35',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontFamily: "'Courier New', monospace",
                  border: '1px solid #ff6b35'
                }}>
                  REC ●
                </div>
              </div>

              <div className="jm-hero-content" style={{ textAlign: 'center', maxWidth: 800 }}>
                <h1 style={{ 
                  fontFamily: "'Impact', sans-serif", 
                  fontSize: 'clamp(3rem, 8vw, 6rem)', 
                  margin: 0, 
                  color: '#ff6b35',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  textShadow: '2px 2px 0px #000'
                }}>
                  FRAMES WITH FEELING
                </h1>
                <p style={{ 
                  fontSize: '1.3rem', 
                  margin: '1rem 0 2rem', 
                  color: '#e8e8e8',
                  fontWeight: 'bold'
                }}>
                  Raw. Real. Analog. Capturing Ireland's underground scene with DV tape grit.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="#work" style={{ 
                    padding: '1rem 2rem', 
                    background: '#ff6b35', 
                    color: '#000', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    border: '2px solid #ff6b35',
                    transition: 'all 0.3s ease'
                  }}>
                    SEE THE WORK
                  </a>
                  <a href="#contact" style={{ 
                    padding: '1rem 2rem', 
                    background: 'transparent', 
                    color: '#ff6b35', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    border: '2px solid #ff6b35',
                    transition: 'all 0.3s ease'
                  }}>
                    HIRE ME
                  </a>
                </div>
              </div>
            </section>

            {/* Work Section */}
            <section id="work" style={{ 
              padding: '4rem 2rem', 
              maxWidth: 1200, 
              margin: '0 auto',
              background: '#111'
            }}>
              <h2 style={{ 
                fontFamily: "'Impact', sans-serif", 
                fontSize: '3rem', 
                textAlign: 'center', 
                color: '#ff6b35',
                textTransform: 'uppercase',
                marginBottom: '2rem'
              }}>
                THE WORK
              </h2>

              {/* Filter Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1rem', 
                marginBottom: '3rem',
                flexWrap: 'wrap'
              }}>
                {['all', 'bands', 'djs'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: activeFilter === filter ? '#ff6b35' : 'transparent',
                      color: activeFilter === filter ? '#000' : '#ff6b35',
                      border: '2px solid #ff6b35',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {filter === 'all' ? 'ALL' : filter.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Work Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2rem' 
              }}>
                {filteredWorks.map((work, idx) => {
                  const ytId = getYouTubeId(work.url);
                  const thumbnail = getYouTubeThumbnail(work.url);
                  return (
                    <div key={idx} className="jm-work-item" style={{
                      background: '#1a1a1a',
                      border: '2px solid #333',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}>
                      {thumbnail && (
                        <div style={{ position: 'relative' }}>
                          <a href={work.url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={thumbnail}
                              alt={work.title}
                              style={{ 
                                width: '100%', 
                                height: '200px', 
                                objectFit: 'cover',
                                filter: 'contrast(1.2) saturate(0.8)'
                              }}
                            />
                            {/* CRT overlay effect */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `
                                repeating-linear-gradient(
                                  0deg,
                                  transparent,
                                  transparent 2px,
                                  rgba(0,0,0,0.1) 2px,
                                  rgba(0,0,0,0.1) 4px
                                )
                              `,
                              pointerEvents: 'none'
                            }}></div>
                            {/* Play button */}
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '60px',
                              height: '60px',
                              background: 'rgba(255,107,53,0.9)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px',
                              color: '#000'
                            }}>
                              ▶
                            </div>
                          </a>
                        </div>
                      )}
                      <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ 
                          color: '#ff6b35', 
                          margin: '0 0 0.5rem 0',
                          fontFamily: "'Impact', sans-serif",
                          textTransform: 'uppercase'
                        }}>
                          {work.title}
                        </h3>
                        <p style={{ 
                          color: '#ccc', 
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                          margin: 0
                        }}>
                          {work.description}
                        </p>
                        <div style={{
                          marginTop: '1rem',
                          padding: '0.3rem 0.8rem',
                          background: work.type === 'bands' ? '#ff6b35' : '#35b4ff',
                          color: '#000',
                          display: 'inline-block',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          {work.type}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Ethos Section */}
            <section id="ethos" style={{ 
              padding: '4rem 2rem', 
              background: '#0a0a0a',
              borderTop: '2px solid #ff6b35'
            }}>
              <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <h2 style={{ 
                  fontFamily: "'Impact', sans-serif", 
                  fontSize: '3rem', 
                  textAlign: 'center', 
                  color: '#ff6b35',
                  textTransform: 'uppercase',
                  marginBottom: '3rem'
                }}>
                  THE ETHOS
                </h2>

                <div style={{ 
                  background: '#1a1a1a', 
                  padding: '3rem', 
                  border: '2px solid #333',
                  borderRadius: '8px',
                  marginBottom: '3rem'
                }}>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    lineHeight: 1.8, 
                    color: '#e8e8e8',
                    margin: '0 0 2rem 0'
                  }}>
                    <strong style={{ color: '#ff6b35' }}>I'm Josh Moriarty,</strong> a young cameraman capturing live bands, DJs, and underground gigs across Ireland.
                  </p>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8, 
                    color: '#e8e8e8',
                    margin: '0 0 2rem 0'
                  }}>
                    I shoot on a <strong style={{ color: '#ff6b35' }}>Sony PD170 with DV tapes</strong> – not for nostalgia, but for the gritty, cinematic texture it brings. It's raw, it's real, and it stands out from the polished, flat look of phone footage.
                  </p>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8, 
                    color: '#e8e8e8',
                    margin: 0
                  }}>
                    Whether it's a sweaty club set or a wild festival night, I'm there with the gear, the eye, and the energy to film it right.
                  </p>
                </div>

                {/* Why DV Tape Section */}
                <div style={{ 
                  background: '#ff6b35', 
                  color: '#000', 
                  padding: '2rem', 
                  borderRadius: '8px',
                  marginBottom: '3rem'
                }}>
                  <h3 style={{ 
                    fontFamily: "'Impact', sans-serif", 
                    fontSize: '1.8rem',
                    textTransform: 'uppercase',
                    margin: '0 0 1rem 0'
                  }}>
                    WHY DV TAPE?
                  </h3>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 'bold'
                  }}>
                    Digital is clean. Digital is predictable. The underground isn't. DV tape captures the chaos, the grain, the imperfection that makes live music real. Every frame is digitized and edited to preserve that authentic, analog edge that no filter can replicate.
                  </p>
                </div>

                {/* What I Film */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem'
                }}>
                  {['Live Bands & Gigs', 'DJ Sets & Club Nights', 'Behind the Scenes', 'Creative Promo Clips'].map((service, idx) => (
                    <div key={idx} style={{
                      background: '#1a1a1a',
                      padding: '1.5rem',
                      border: '2px solid #333',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ 
                        color: '#ff6b35', 
                        margin: 0,
                        fontFamily: "'Impact', sans-serif",
                        textTransform: 'uppercase'
                      }}>
                        {service}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ 
              padding: '4rem 2rem', 
              background: '#111',
              borderTop: '2px solid #ff6b35'
            }}>
              <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ 
                  fontFamily: "'Impact', sans-serif", 
                  fontSize: '3rem', 
                  color: '#ff6b35',
                  textTransform: 'uppercase',
                  marginBottom: '2rem'
                }}>
                  HIRE ME
                </h2>
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: '#e8e8e8',
                  marginBottom: '3rem'
                }}>
                  Got a gig that needs to be captured with raw energy? Let's talk.
                </p>

                <form style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem'
                }} onSubmit={async e => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form[0].value,
                    email: form[1].value,
                    projectType: form[2].value,
                    message: form[3].value
                  };
                  
                  const res = await fetch('https://formspree.io/f/xpwdgzej', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                  
                  if (res.ok) {
                    alert('Message sent! I\'ll get back to you soon.');
                    form.reset();
                  } else {
                    alert('Error sending message. Try again or hit me up on social.');
                  }
                }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    style={{
                      padding: '1rem',
                      background: '#1a1a1a',
                      border: '2px solid #333',
                      color: '#e8e8e8',
                      fontSize: '1rem'
                    }}
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    style={{
                      padding: '1rem',
                      background: '#1a1a1a',
                      border: '2px solid #333',
                      color: '#e8e8e8',
                      fontSize: '1rem'
                    }}
                  />
                  <select 
                    required
                    style={{
                      padding: '1rem',
                      background: '#1a1a1a',
                      border: '2px solid #333',
                      color: '#e8e8e8',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Project Type</option>
                    <option value="live-band">Live Band/Gig</option>
                    <option value="dj-set">DJ Set/Club Night</option>
                    <option value="promo">Promo Video</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea 
                    placeholder="Tell me about your project" 
                    required 
                    rows="5"
                    style={{
                      padding: '1rem',
                      background: '#1a1a1a',
                      border: '2px solid #333',
                      color: '#e8e8e8',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  ></textarea>
                  <button 
                    type="submit"
                    style={{
                      padding: '1.2rem',
                      background: '#ff6b35',
                      color: '#000',
                      border: 'none',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '1.1rem',
                      cursor: 'pointer'
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </section>

            {/* Footer */}
            <footer style={{ 
              background: '#0a0a0a', 
              padding: '3rem 2rem', 
              textAlign: 'center',
              borderTop: '2px solid #ff6b35'
            }}>
              <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '2rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    Instagram
                  </a>
                  <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    YouTube
                  </a>
                  <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    Vimeo
                  </a>
                </div>
                <p style={{ color: '#666', margin: '1rem 0' }}>
                  &copy; {new Date().getFullYear()} Josh Moriarty
                </p>
                <p style={{ color: '#333', fontSize: '0.9rem' }}>
                  Site crafted by Josh Moriarty
                </p>
              </div>
            </footer>
          </div>
        } />
        <Route path="/artwork" element={<Artwork />} />
      </Routes>
    </Router>
  );
}

export default App;
