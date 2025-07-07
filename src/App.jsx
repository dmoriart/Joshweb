import React from 'react';
import './App.css';
import Artwork from './Artwork';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const works = [
  { 
    title: 'STICK N POKE LIVE', 
    url: 'https://www.youtube.com/watch?v=SEMPZSw37t4',
    type: 'bands',
    venue: 'Sound House',
    description: 'Raw underground energy captured through analog grain. The chaos, the sweat, the real moments.',
    testimonial: '"Josh got shots nobody else could - right in the pit with that old-school camera"'
  },
  { 
    title: 'DJ SHOUTOUT', 
    url: 'https://www.youtube.com/watch?v=AidsPG4xpMk',
    type: 'djs',
    venue: 'Club Night',
    description: 'Late night basement vibes. DV tape texture that digital just can\'t replicate.',
    testimonial: '"The grain adds so much character - looks like actual film"'
  },
  { 
    title: 'BEHIND THE SOUND', 
    url: 'https://www.youtube.com/watch?v=1aF9i1MaCsE',
    type: 'bands',
    venue: 'Rehearsal Space',
    description: 'The real moments between tracks. Raw, unfiltered creative process.',
    testimonial: '"Captured the vibe perfectly - feels like you\'re actually there"'
  },
  { 
    title: 'UNDERGROUND SESSIONS', 
    url: 'https://www.youtube.com/watch?v=dsr27porhDA',
    type: 'djs',
    venue: 'Warehouse',
    description: 'Illegal raves and basement scenes. Gritty reality that phones can\'t touch.',
    testimonial: '"This is how underground music should be filmed"'
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
          <div className="jm-site" style={{ 
            background: '#0d0d0d', 
            color: '#f0f0f0', 
            fontFamily: "'Courier New', 'Consolas', monospace",
            minHeight: '100vh',
            position: 'relative'
          }}>
            {/* Grain overlay */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(circle, transparent 1px, rgba(255,255,255,0.02) 1px),
                linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.01) 50%)
              `,
              backgroundSize: '2px 2px, 4px 4px',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.3
            }}></div>

            {/* VHS Scan Lines */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,255,0,0.02) 2px,
                rgba(0,255,0,0.02) 4px
              )`,
              pointerEvents: 'none',
              zIndex: 2
            }}></div>

            {/* Glitch Border */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: '3px solid #ff3300',
              borderImage: 'linear-gradient(45deg, #ff3300, transparent, #00ff88, transparent) 1',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0.6
            }}></div>

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              
              {/* Hero Banner */}
              <section style={{
                width: '100%',
                height: '60vh',
                backgroundImage: 'url(/IMG_0226.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* Dark overlay for text readability */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(255,51,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
                  zIndex: 1
                }}></div>

                {/* VHS/DV Tape overlay effects */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,255,0,0.03) 2px,
                    rgba(0,255,0,0.03) 4px
                  )`,
                  zIndex: 2,
                  pointerEvents: 'none'
                }}></div>

                {/* Banner Content */}
                <div style={{
                  position: 'relative',
                  zIndex: 3,
                  textAlign: 'center',
                  color: '#f0f0f0'
                }}>
                  <h1 style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                    margin: '0 0 20px 0',
                    color: '#ff3300',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    textShadow: `
                      4px 4px 0px #000,
                      0 0 30px #ff3300,
                      0 0 60px #ff3300
                    `,
                    transform: 'skew(-2deg)',
                    lineHeight: 0.8
                  }}>
                    JOSH<br/>MORIARTY
                  </h1>
                  <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '2px solid #ff3300',
                    padding: '15px 30px',
                    display: 'inline-block',
                    transform: 'skew(-1deg)'
                  }}>
                    <p style={{
                      fontFamily: "'Arial Black', sans-serif",
                      fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                      margin: 0,
                      color: '#ff3300',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      textShadow: `
                        2px 2px 0px #000,
                        0 0 10px #ff3300
                      `
                    }}>
                      FILMS
                    </p>
                  </div>
                </div>

                {/* DV Tape status indicator */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.9)',
                  color: '#ff3300',
                  padding: '8px 15px',
                  fontSize: '12px',
                  fontFamily: "'Courier New', monospace",
                  border: '2px solid #ff3300',
                  textShadow: '0 0 5px #ff3300',
                  zIndex: 4
                }}>
                  ●REC | SONY_PD170 | DV_MODE
                </div>
              </section>

              {/* Fixed Navigation */}
              <nav style={{ 
                position: 'sticky', 
                top: 0, 
                width: '100%', 
                background: 'rgba(13,13,13,0.95)', 
                backdropFilter: 'blur(5px)',
                zIndex: 1000,
                padding: '15px 20px',
                borderBottom: '2px solid #ff3300',
                boxShadow: '0 0 20px rgba(255,51,0,0.3)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  maxWidth: 1400, 
                  margin: '0 auto' 
                }}>
                  <div style={{ 
                    fontFamily: "'Arial Black', sans-serif", 
                    fontSize: '18px', 
                    color: '#ff3300',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '2px 2px 0px #000, 0 0 10px #ff3300'
                  }}>
                    ◉ JOSH_MORIARTY.DV
                  </div>
                  <div style={{ display: 'flex', gap: '30px' }}>
                    <a href="#reel" style={{ 
                      color: '#00ff88', 
                      textDecoration: 'none', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>REEL</a>
                    <a href="#work" style={{ 
                      color: '#00ff88', 
                      textDecoration: 'none', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>WORK</a>
                    <a href="#process" style={{ 
                      color: '#00ff88', 
                      textDecoration: 'none', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>PROCESS</a>
                    <a href="#hire" style={{ 
                      color: '#ffff00', 
                      textDecoration: 'none', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>HIRE_ME</a>
                  </div>
                </div>
              </nav>

              {/* Hero Section */}
              <section id="reel" style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px 20px',
                background: `
                  linear-gradient(135deg, 
                    rgba(13,13,13,0.9) 0%, 
                    rgba(26,26,26,0.8) 50%,
                    rgba(13,13,13,0.9) 100%
                  ),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23000"/><rect x="0" y="0" width="50" height="50" fill="%23111"/><rect x="50" y="50" width="50" height="50" fill="%23111"/></svg>')
                `,
                backgroundSize: '20px 20px'
              }}>
                
                {/* Timecode Display */}
                <div style={{
                  position: 'absolute',
                  top: '100px',
                  left: '20px',
                  background: 'rgba(0,0,0,0.8)',
                  color: '#00ff88',
                  padding: '5px 10px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px',
                  border: '1px solid #00ff88',
                  textShadow: '0 0 5px #00ff88'
                }}>
                  TC: 00:00:00:00 | REC
                </div>

                {/* Main Reel */}
                <div style={{ 
                  width: '90%', 
                  maxWidth: 900, 
                  marginBottom: '40px',
                  position: 'relative',
                  border: '3px solid #ff3300',
                  borderRadius: '0',
                  overflow: 'hidden',
                  boxShadow: `
                    0 0 30px rgba(255,51,0,0.5),
                    inset 0 0 20px rgba(0,0,0,0.8)
                  `,
                  transform: 'skew(-0.5deg)'
                }}>
                  <iframe
                    src="https://www.youtube.com/embed/SEMPZSw37t4?autoplay=1&mute=1&controls=0&loop=1&playlist=SEMPZSw37t4"
                    title="Josh Moriarty DV Reel"
                    width="100%"
                    height="500"
                    style={{ border: 0, transform: 'skew(0.5deg)' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                  
                  {/* VHS Status Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.9)',
                    color: '#ff3300',
                    padding: '3px 8px',
                    fontSize: '10px',
                    fontFamily: "'Courier New', monospace",
                    border: '1px solid #ff3300',
                    textShadow: '0 0 5px #ff3300'
                  }}>
                    SONY PD170 | DV TAPE | ●REC
                  </div>
                </div>

                {/* Hero Text */}
                <div style={{ textAlign: 'center', maxWidth: 800, marginBottom: '40px' }}>
                  <h1 style={{ 
                    fontFamily: "'Arial Black', sans-serif", 
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                    margin: '0 0 20px 0', 
                    color: '#ff3300',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: `
                      3px 3px 0px #000,
                      0 0 20px #ff3300,
                      0 0 40px #ff3300
                    `,
                    transform: 'skew(-2deg)',
                    lineHeight: 0.9
                  }}>
                    FORGET CLEAN.<br/>GET REAL.
                  </h1>
                  
                  <div style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '2px solid #00ff88',
                    padding: '20px',
                    margin: '20px 0',
                    transform: 'skew(-1deg)',
                    borderRadius: '0'
                  }}>
                    <p style={{ 
                      fontSize: '1.2rem', 
                      margin: 0,
                      color: '#f0f0f0',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 0px #000'
                    }}>
                      DV TAPE | ANALOG GRAIN | UNDERGROUND SCENES<br/>
                      <span style={{ color: '#00ff88' }}>CAPTURING IRELAND'S RAW MUSIC CULTURE</span>
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '25px', 
                  justifyContent: 'center', 
                  flexWrap: 'wrap',
                  marginTop: '20px'
                }}>
                  <a href="#work" style={{ 
                    padding: '15px 30px', 
                    background: '#ff3300', 
                    color: '#000', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    border: '2px solid #ff3300',
                    transform: 'skew(-2deg)',
                    textShadow: 'none',
                    boxShadow: '5px 5px 0px #000',
                    transition: 'all 0.2s ease'
                  }}>
                    ► SEE_THE_WORK
                  </a>
                  <a href="#hire" style={{ 
                    padding: '15px 30px', 
                    background: 'transparent', 
                    color: '#00ff88', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '16px',
                    border: '2px solid #00ff88',
                    transform: 'skew(-2deg)',
                    textShadow: '1px 1px 0px #000',
                    boxShadow: '5px 5px 0px rgba(0,255,136,0.3)',
                    transition: 'all 0.2s ease'
                  }}>
                    ◉ BOOK_NOW
                  </a>
                </div>
              </section>

              {/* Work Section */}
              <section id="work" style={{ 
                padding: '60px 20px', 
                background: `
                  linear-gradient(45deg, 
                    rgba(26,26,26,0.9) 0%, 
                    rgba(13,13,13,0.9) 50%
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 10px,
                    rgba(255,51,0,0.1) 10px,
                    rgba(255,51,0,0.1) 20px
                  )
                `
              }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                  
                  {/* Section Header */}
                  <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ 
                      fontFamily: "'Arial Black', sans-serif", 
                      fontSize: 'clamp(2rem, 6vw, 4rem)', 
                      color: '#ff3300',
                      textTransform: 'uppercase',
                      textShadow: '3px 3px 0px #000, 0 0 20px #ff3300',
                      margin: '0 0 20px 0',
                      transform: 'skew(-1deg)'
                    }}>
                      ◄◄ THE_WORK ►►
                    </h2>
                    <div style={{
                      background: 'rgba(0,0,0,0.8)',
                      display: 'inline-block',
                      padding: '10px 20px',
                      border: '2px solid #00ff88',
                      transform: 'skew(-1deg)'
                    }}>
                      <span style={{ color: '#00ff88', fontWeight: 'bold' }}>
                        FILTER: BANDS | DJS | ALL_CHAOS
                      </span>
                    </div>
                  </div>

                  {/* Filter Buttons */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '15px', 
                    marginBottom: '50px',
                    flexWrap: 'wrap'
                  }}>
                    {['all', 'bands', 'djs'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        style={{
                          padding: '12px 25px',
                          background: activeFilter === filter ? '#ff3300' : 'rgba(0,0,0,0.8)',
                          color: activeFilter === filter ? '#000' : '#00ff88',
                          border: activeFilter === filter ? '2px solid #ff3300' : '2px solid #00ff88',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          fontFamily: "'Courier New', monospace",
                          fontSize: '14px',
                          transform: 'skew(-2deg)',
                          boxShadow: '3px 3px 0px #000',
                          textShadow: activeFilter === filter ? 'none' : '1px 1px 0px #000'
                        }}
                      >
                        {filter === 'all' ? '>> ALL_FOOTAGE' : `>> ${filter.toUpperCase()}`}
                      </button>
                    ))}
                  </div>

                  {/* Work Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: '30px',
                    marginBottom: '40px'
                  }}>
                    {filteredWorks.map((work, idx) => {
                      const ytId = getYouTubeId(work.url);
                      const thumbnail = getYouTubeThumbnail(work.url);
                      return (
                        <div key={idx} style={{
                          background: 'rgba(0,0,0,0.9)',
                          border: '3px solid #333',
                          transform: `skew(${idx % 2 === 0 ? '-1deg' : '1deg'})`,
                          overflow: 'hidden',
                          boxShadow: '8px 8px 0px rgba(255,51,0,0.3)',
                          position: 'relative'
                        }}>
                          {/* CRT Monitor Effect */}
                          <div style={{
                            background: '#000',
                            padding: '15px',
                            borderBottom: '2px solid #333'
                          }}>
                            <div style={{
                              color: '#00ff88',
                              fontSize: '12px',
                              fontFamily: "'Courier New', monospace",
                              textAlign: 'center',
                              textShadow: '0 0 5px #00ff88'
                            }}>
                              ● MONITOR_01 | {work.type.toUpperCase()} | DV_CAPTURE ●
                            </div>
                          </div>
                          
                          {/* Video Thumbnail */}
                          {thumbnail && (
                            <div style={{ position: 'relative' }}>
                              <a href={work.url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={thumbnail}
                                  alt={work.title}
                                  style={{ 
                                    width: '100%', 
                                    height: '220px', 
                                    objectFit: 'cover',
                                    filter: 'contrast(1.3) saturate(0.7) brightness(0.9)'
                                  }}
                                />
                                {/* CRT Scan Lines */}
                                <div style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: `repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent 1px,
                                    rgba(0,0,0,0.2) 1px,
                                    rgba(0,0,0,0.2) 3px
                                  )`,
                                  pointerEvents: 'none'
                                }}></div>
                                
                                {/* Play Button */}
                                <div style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  width: '70px',
                                  height: '70px',
                                  background: 'rgba(255,51,0,0.9)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '30px',
                                  color: '#000',
                                  clipPath: 'polygon(20% 0%, 80% 50%, 20% 100%)',
                                  boxShadow: '0 0 20px rgba(255,51,0,0.7)'
                                }}>
                                </div>
                              </a>
                            </div>
                          )}
                          
                          {/* Content */}
                          <div style={{ padding: '20px' }}>
                            <h3 style={{ 
                              color: '#ff3300', 
                              margin: '0 0 10px 0',
                              fontFamily: "'Arial Black', sans-serif",
                              textTransform: 'uppercase',
                              fontSize: '18px',
                              textShadow: '2px 2px 0px #000'
                            }}>
                              {work.title}
                            </h3>
                            
                            <div style={{
                              color: '#00ff88',
                              fontSize: '12px',
                              fontFamily: "'Courier New', monospace",
                              marginBottom: '10px',
                              textShadow: '1px 1px 0px #000'
                            }}>
                              VENUE: {work.venue} | TYPE: {work.type.toUpperCase()}
                            </div>
                            
                            <p style={{ 
                              color: '#ccc', 
                              fontSize: '14px',
                              lineHeight: 1.4,
                              margin: '0 0 15px 0',
                              fontFamily: "'Courier New', monospace"
                            }}>
                              {work.description}
                            </p>
                            
                            {/* Testimonial */}
                            <div style={{
                              background: 'rgba(0,255,136,0.1)',
                              border: '1px solid #00ff88',
                              padding: '10px',
                              fontSize: '12px',
                              fontStyle: 'italic',
                              color: '#00ff88'
                            }}>
                              {work.testimonial}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Process/About Section */}
              <section id="process" style={{ 
                padding: '60px 20px', 
                background: `
                  linear-gradient(135deg, 
                    rgba(0,0,0,0.95) 0%, 
                    rgba(26,0,0,0.9) 50%,
                    rgba(0,0,0,0.95) 100%
                  )
                `,
                borderTop: '3px solid #ff3300',
                borderBottom: '3px solid #ff3300'
              }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                  
                  {/* Header */}
                  <h2 style={{ 
                    fontFamily: "'Arial Black', sans-serif", 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    textAlign: 'center', 
                    color: '#ff3300',
                    textTransform: 'uppercase',
                    marginBottom: '50px',
                    textShadow: '3px 3px 0px #000, 0 0 20px #ff3300',
                    transform: 'skew(-1deg)'
                  }}>
                    ◄◄ THE_PROCESS ►►
                  </h2>

                  {/* Main Bio */}
                  <div style={{ 
                    background: 'rgba(0,0,0,0.8)', 
                    border: '3px solid #00ff88',
                    padding: '30px',
                    marginBottom: '40px',
                    transform: 'skew(-0.5deg)'
                  }}>
                    <div style={{
                      background: 'rgba(0,255,136,0.1)',
                      padding: '15px',
                      marginBottom: '20px',
                      border: '1px solid #00ff88'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#00ff88',
                        margin: 0,
                        fontFamily: "'Courier New', monospace",
                        textShadow: '1px 1px 0px #000'
                      }}>
                        STATUS: ACTIVE | LOCATION: IRELAND | EQUIPMENT: SONY_PD170
                      </p>
                    </div>
                    
                    <p style={{ 
                      fontSize: '18px', 
                      lineHeight: 1.6, 
                      color: '#f0f0f0',
                      margin: '0 0 20px 0',
                      fontFamily: "'Courier New', monospace"
                    }}>
                      <span style={{ color: '#ff3300', fontWeight: 'bold' }}>I'm Josh Moriarty,</span> a young cameraman capturing live bands, DJs, and underground gigs across Ireland.
                    </p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: 1.6, 
                      color: '#f0f0f0',
                      margin: '0 0 20px 0',
                      fontFamily: "'Courier New', monospace"
                    }}>
                      I shoot on a <span style={{ color: '#ff3300', fontWeight: 'bold' }}>Sony PD170 with DV tapes</span> – not for nostalgia, but for the gritty, cinematic texture it brings. It's raw, it's real, and it stands out from the polished, flat look of phone footage.
                    </p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: 1.6, 
                      color: '#f0f0f0',
                      margin: 0,
                      fontFamily: "'Courier New', monospace"
                    }}>
                      Whether it's a sweaty club set or a wild festival night, I'm there with the gear, the eye, and the energy to film it right.
                    </p>
                  </div>

                  {/* Why DV Tape */}
                  <div style={{ 
                    background: '#ff3300', 
                    color: '#000', 
                    padding: '30px',
                    marginBottom: '40px',
                    transform: 'skew(0.5deg)',
                    boxShadow: '10px 10px 0px rgba(0,0,0,0.5)'
                  }}>
                    <h3 style={{ 
                      fontFamily: "'Arial Black', sans-serif", 
                      fontSize: '24px',
                      textTransform: 'uppercase',
                      margin: '0 0 15px 0',
                      textShadow: '2px 2px 0px rgba(255,255,255,0.3)'
                    }}>
                      ► WHY_DV_TAPE?
                    </h3>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: 'bold',
                      fontFamily: "'Courier New', monospace"
                    }}>
                      Digital is clean. Digital is predictable. The underground isn't. DV tape captures the chaos, the grain, the imperfection that makes live music REAL. Every frame is digitised and edited to preserve that authentic, analog edge that no filter can replicate.
                    </p>
                  </div>

                  {/* Services Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '20px'
                  }}>
                    {[
                      { title: 'LIVE_BANDS_&_GIGS', icon: '♫' },
                      { title: 'DJ_SETS_&_CLUB_NIGHTS', icon: '♪' },
                      { title: 'BEHIND_THE_SCENES', icon: '◄' },
                      { title: 'CREATIVE_PROMO_CLIPS', icon: '►' }
                    ].map((service, idx) => (
                      <div key={idx} style={{
                        background: 'rgba(0,0,0,0.8)',
                        padding: '25px',
                        border: '2px solid #333',
                        textAlign: 'center',
                        transform: `skew(${idx % 2 === 0 ? '-1deg' : '1deg'})`,
                        boxShadow: '5px 5px 0px rgba(255,51,0,0.3)'
                      }}>
                        <div style={{
                          fontSize: '30px',
                          color: '#ff3300',
                          marginBottom: '10px',
                          textShadow: '0 0 10px #ff3300'
                        }}>
                          {service.icon}
                        </div>
                        <h4 style={{ 
                          color: '#00ff88', 
                          margin: 0,
                          fontFamily: "'Arial Black', sans-serif",
                          textTransform: 'uppercase',
                          fontSize: '14px',
                          textShadow: '1px 1px 0px #000'
                        }}>
                          {service.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="hire" style={{ 
                padding: '60px 20px', 
                background: `
                  linear-gradient(45deg, 
                    rgba(13,13,13,0.95) 0%, 
                    rgba(26,26,26,0.9) 50%
                  ),
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    rgba(0,255,136,0.1) 20px,
                    rgba(0,255,136,0.1) 40px
                  )
                `
              }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                  
                  <h2 style={{ 
                    fontFamily: "'Arial Black', sans-serif", 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    color: '#ff3300',
                    textTransform: 'uppercase',
                    marginBottom: '30px',
                    textShadow: '3px 3px 0px #000, 0 0 20px #ff3300',
                    transform: 'skew(-1deg)'
                  }}>
                    ◄◄ HIRE_ME ►►
                  </h2>
                  
                  <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '2px solid #00ff88',
                    padding: '20px',
                    marginBottom: '40px',
                    transform: 'skew(-0.5deg)'
                  }}>
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#f0f0f0',
                      margin: 0,
                      fontFamily: "'Courier New', monospace",
                      textShadow: '1px 1px 0px #000'
                    }}>
                      Got a gig that needs to be captured with <span style={{ color: '#ff3300' }}>RAW ENERGY</span>?<br/>
                      <span style={{ color: '#00ff88' }}>Let's make some analog magic.</span>
                    </p>
                  </div>

                  <form style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px',
                    maxWidth: 600,
                    margin: '0 auto'
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
                      alert('MESSAGE_SENT! I\'ll get back to you with that analog energy.');
                      form.reset();
                    } else {
                      alert('ERROR_TRANSMISSION_FAILED. Try the socials or smoke signals.');
                    }
                  }}>
                    <input 
                      type="text" 
                      placeholder="YOUR_NAME" 
                      required 
                      style={{
                        padding: '15px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '2px solid #333',
                        color: '#f0f0f0',
                        fontSize: '16px',
                        fontFamily: "'Courier New', monospace",
                        textTransform: 'uppercase'
                      }}
                    />
                    <input 
                      type="email" 
                      placeholder="YOUR_EMAIL" 
                      required 
                      style={{
                        padding: '15px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '2px solid #333',
                        color: '#f0f0f0',
                        fontSize: '16px',
                        fontFamily: "'Courier New', monospace",
                        textTransform: 'uppercase'
                      }}
                    />
                    <select 
                      required
                      style={{
                        padding: '15px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '2px solid #333',
                        color: '#f0f0f0',
                        fontSize: '16px',
                        fontFamily: "'Courier New', monospace",
                        textTransform: 'uppercase'
                      }}
                    >
                      <option value="">PROJECT_TYPE</option>
                      <option value="live-band">LIVE_BAND/GIG</option>
                      <option value="dj-set">DJ_SET/CLUB_NIGHT</option>
                      <option value="promo">PROMO_VIDEO</option>
                      <option value="other">OTHER_CHAOS</option>
                    </select>
                    <textarea 
                      placeholder="TELL_ME_ABOUT_YOUR_PROJECT" 
                      required 
                      rows="6"
                      style={{
                        padding: '15px',
                        background: 'rgba(0,0,0,0.8)',
                        border: '2px solid #333',
                        color: '#f0f0f0',
                        fontSize: '16px',
                        resize: 'vertical',
                        fontFamily: "'Courier New', monospace",
                        textTransform: 'uppercase'
                      }}
                    ></textarea>
                    <button 
                      type="submit"
                      style={{
                        padding: '20px',
                        background: '#ff3300',
                        color: '#000',
                        border: 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '18px',
                        cursor: 'pointer',
                        fontFamily: "'Arial Black', sans-serif",
                        transform: 'skew(-2deg)',
                        boxShadow: '8px 8px 0px #000',
                        textShadow: '1px 1px 0px rgba(255,255,255,0.3)'
                      }}
                    >
                      ► SEND_TRANSMISSION
                    </button>
                  </form>
                </div>
              </section>

              {/* Footer */}
              <footer style={{ 
                background: '#000', 
                padding: '40px 20px', 
                textAlign: 'center',
                borderTop: '3px solid #ff3300'
              }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                  
                  {/* Social Links */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '30px',
                    marginBottom: '30px',
                    flexWrap: 'wrap'
                  }}>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ 
                      color: '#ff3300', 
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontFamily: "'Courier New', monospace",
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>
                      ► INSTAGRAM
                    </a>
                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" style={{ 
                      color: '#ff3300', 
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontFamily: "'Courier New', monospace",
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>
                      ► YOUTUBE
                    </a>
                    <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer" style={{ 
                      color: '#ff3300', 
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontFamily: "'Courier New', monospace",
                      fontSize: '14px',
                      textShadow: '1px 1px 0px #000'
                    }}>
                      ► VIMEO
                    </a>
                  </div>
                  
                  {/* Copyright */}
                  <div style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '1px solid #00ff88',
                    padding: '15px',
                    marginBottom: '20px'
                  }}>
                    <p style={{ 
                      color: '#00ff88', 
                      margin: 0,
                      fontSize: '12px',
                      fontFamily: "'Courier New', monospace",
                      textShadow: '1px 1px 0px #000'
                    }}>
                      © {new Date().getFullYear()} JOSH_MORIARTY | ALL_FOOTAGE_CAPTURED_ON_DV_TAPE | UNDERGROUND_CERTIFIED
                    </p>
                  </div>
                  
                  {/* Future-proofing hint */}
                  <p style={{ 
                    color: '#333', 
                    fontSize: '10px',
                    margin: 0,
                    fontFamily: "'Courier New', monospace"
                  }}>
                    Site crafted by Josh Moriarty | Web design services coming soon
                  </p>
                </div>
              </footer>
            </div>
          </div>
        } />
        <Route path="/artwork" element={<Artwork />} />
      </Routes>
    </Router>
  );
}

export default App;
