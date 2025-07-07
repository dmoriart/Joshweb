import React from 'react';
import './App.css';
import Artwork from './Artwork';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const works = [
  { 
    title: 'LOCKOUT AT SOUND HOUSE', 
    url: 'https://youtu.be/GabbIXxuWKU',
    type: 'bands',
    venue: 'Sound House',
    description: 'Raw underground energy captured through analog grain.',
    year: '2024',
    category: 'Live Performance'
  },
  { 
    title: 'DJ SHOUTOUT', 
    url: 'https://www.youtube.com/watch?v=AidsPG4xpMk',
    type: 'djs',
    venue: 'Club Night',
    description: 'Late night basement vibes captured on DV tape.',
    year: '2024',
    category: 'Club Set'
  },
  { 
    title: 'BEHIND THE SOUND', 
    url: 'https://www.youtube.com/watch?v=1aF9i1MaCsE',
    type: 'bands',
    venue: 'Rehearsal Space',
    description: 'The real moments between tracks.',
    year: '2024',
    category: 'Documentary'
  },
  { 
    title: 'UNDERGROUND SESSIONS', 
    url: 'https://www.youtube.com/watch?v=dsr27porhDA',
    type: 'djs',
    venue: 'Warehouse',
    description: 'Illegal raves and basement scenes.',
    year: '2024',
    category: 'Underground'
  },
];

function App() {
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
          <div className="jm-site" style={{ 
            background: '#fafafa', 
            color: '#1a1a1a', 
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            minHeight: '100vh',
            lineHeight: 1.6
          }}>
            {/* Minimalist Navigation */}
            <nav style={{ 
              position: 'fixed', 
              top: 0, 
              width: '100%', 
              background: 'rgba(250, 250, 250, 0.95)', 
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              padding: '20px 0',
              borderBottom: '1px solid rgba(26, 26, 26, 0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                maxWidth: '1400px', 
                margin: '0 auto',
                padding: '0 20px'
              }}>
                <div style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#1a1a1a',
                  letterSpacing: '-0.02em'
                }}>
                  Josh Moriarty
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="#work" style={{ 
                    color: '#1a1a1a', 
                    textDecoration: 'none', 
                    fontWeight: '500',
                    fontSize: '16px',
                    transition: 'opacity 0.2s ease',
                    opacity: 0.8
                  }}>Work</a>
                  <a href="#about" style={{ 
                    color: '#1a1a1a', 
                    textDecoration: 'none', 
                    fontWeight: '500',
                    fontSize: '16px',
                    transition: 'opacity 0.2s ease',
                    opacity: 0.8
                  }}>About</a>
                  <a href="#contact" style={{ 
                    color: '#1a1a1a', 
                    textDecoration: 'none', 
                    fontWeight: '500',
                    fontSize: '16px',
                    transition: 'opacity 0.2s ease',
                    opacity: 0.8
                  }}>Contact</a>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'url(/IMG_0226.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
              {/* Subtle overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1
              }}></div>

              {/* Hero Content */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: '#ffffff',
                maxWidth: '800px',
                padding: '0 20px'
              }}>
                <h1 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: '700',
                  margin: '0 0 24px 0',
                  letterSpacing: '-0.04em',
                  lineHeight: '0.9'
                }}>
                  Josh Moriarty<br/>Films
                </h1>
                <p style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: '400',
                  margin: '0 0 40px 0',
                  opacity: 0.9,
                  letterSpacing: '-0.01em'
                }}>
                  Capturing raw, authentic moments through analog grain
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  DV Tape • Sony PD170
                </div>
              </div>

              {/* Scroll indicator */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.7
              }}>
                Scroll to explore
              </div>
            </section>

            {/* Work Section */}
            <section id="work" style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '80px 20px'
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
                  lineHeight: '1.1'
                }}>
                  Selected Work
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  maxWidth: '600px',
                  margin: '0 auto',
                  letterSpacing: '-0.01em'
                }}>
                  A collection of underground performances, late-night sessions, and raw moments captured on DV tape
                </p>
              </div>

              {/* Filter Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '60px',
                flexWrap: 'wrap'
              }}>
                {['all', 'bands', 'djs'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '12px 24px',
                      background: activeFilter === filter ? '#1a1a1a' : 'transparent',
                      color: activeFilter === filter ? '#ffffff' : '#1a1a1a',
                      border: '1px solid #1a1a1a',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {filter === 'all' ? 'All Work' : filter === 'bands' ? 'Live Bands' : 'DJ Sets'}
                  </button>
                ))}
              </div>

              {/* Work Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '80px'
              }}>
                {filteredWorks.map((work, index) => (
                  <div key={index} style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  }}
                  onClick={() => window.open(work.url, '_blank')}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      height: '240px',
                      backgroundImage: `url(${getYouTubeThumbnail(work.url)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}>
                      {/* Play button overlay */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60px',
                        height: '60px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '20px'
                      }}>
                        ▶
                      </div>
                      
                      {/* Category badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {work.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: '24px'
                    }}>
                      <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.02em'
                      }}>
                        {work.title}
                      </h3>
                      <p style={{
                        color: '#666',
                        fontSize: '0.95rem',
                        margin: '0 0 16px 0',
                        lineHeight: '1.5'
                      }}>
                        {work.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#999',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        <span>{work.venue}</span>
                        <span>{work.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Reel */}
              <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                color: '#ffffff'
              }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 0 16px 0',
                  letterSpacing: '-0.03em'
                }}>
                  Demo Reel
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: 0.8,
                  margin: '0 0 40px 0'
                }}>
                  A compilation of underground moments captured on DV tape
                </p>
                <div style={{
                  maxWidth: '800px',
                  margin: '0 auto',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <iframe
                    src="https://www.youtube.com/embed/SEMPZSw37t4"
                    title="Josh Moriarty Demo Reel"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" style={{
              background: '#f5f5f5',
              padding: '80px 20px'
            }}>
              <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '80px',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '700',
                    margin: '0 0 24px 0',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1'
                  }}>
                    About the Process
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    marginBottom: '24px',
                    lineHeight: '1.6'
                  }}>
                    I capture underground music scenes through the authentic grain of DV tape. Using a Sony PD170, I document the raw energy that digital perfection often sanitizes away.
                  </p>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    marginBottom: '32px',
                    lineHeight: '1.6'
                  }}>
                    Every frame tells a story of late-night basement shows, illegal warehouse raves, and the moments between songs that define a scene.
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '32px',
                    marginBottom: '32px'
                  }}>
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        margin: '0 0 8px 0',
                        color: '#1a1a1a'
                      }}>
                        Equipment
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: '0.95rem',
                        margin: 0
                      }}>
                        Sony PD170<br/>
                        DV Tape Format<br/>
                        Analog Audio
                      </p>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        margin: '0 0 8px 0',
                        color: '#1a1a1a'
                      }}>
                        Specialties
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: '0.95rem',
                        margin: 0
                      }}>
                        Live Performances<br/>
                        DJ Sets<br/>
                        Documentary Style
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  padding: '40px',
                  color: '#ffffff'
                }}>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.02em'
                  }}>
                    Why DV Tape?
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    lineHeight: '1.6',
                    margin: '0 0 20px 0'
                  }}>
                    Digital is clean, but underground music isn't. DV tape captures the imperfections, the grain, the authentic texture that makes these moments feel real.
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    It's about preserving the essence of a scene, not creating a polished product.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '80px 20px'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '60px'
              }}>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '700',
                  margin: '0 0 20px 0',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1'
                }}>
                  Let's Work Together
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  letterSpacing: '-0.01em'
                }}>
                  Have a project that needs authentic documentation? Let's capture some analog magic.
                </p>
              </div>

              <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  style={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  style={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                />
                <select
                  required
                  style={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  <option value="">Project Type</option>
                  <option value="live-band">Live Band/Performance</option>
                  <option value="dj-set">DJ Set/Club Night</option>
                  <option value="promo">Promo Video</option>
                  <option value="documentary">Documentary</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows="6"
                  style={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '16px',
                    resize: 'vertical',
                    fontFamily: "'Inter', sans-serif"
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    padding: '16px 24px',
                    background: '#1a1a1a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#333'}
                  onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
                >
                  Send Message
                </button>
              </form>
            </section>

            {/* Footer */}
            <footer style={{
              background: '#1a1a1a',
              color: '#ffffff',
              padding: '40px 20px 20px',
              textAlign: 'center'
            }}>
              <div style={{
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginBottom: '40px',
                  flexWrap: 'wrap'
                }}>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease'
                  }}>
                    Instagram
                  </a>
                  <a href="https://www.youtube.com/@joshmoriartyfilms/featured" target="_blank" rel="noopener noreferrer" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease'
                  }}>
                    YouTube
                  </a>
                  <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer" style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease'
                  }}>
                    Vimeo
                  </a>
                </div>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  margin: 0,
                  opacity: 0.8
                }}>
                  © {new Date().getFullYear()} Josh Moriarty. All footage captured on DV tape.
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
