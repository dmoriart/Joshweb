import React from 'react';
import './App.css';
import Artwork from './Artwork';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import FeaturedReel from './components/FeaturedReel';
import WorkGrid from './components/WorkGrid';
import Photography from './components/Photography';
// import Process from './components/Process';
import Equipment from './components/Equipment';
import Animation from './components/Animation';
import Credits from './components/Credits';
import ContactForm from './components/ContactForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMetaTags, useCurrentSection } from './useMetaTags';

function App() {
  // Dynamic meta tags based on current section
  const currentSection = useCurrentSection();
  useMetaTags(currentSection);

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
            <Navigation />
            <Hero />

            {/* Animation / Clean-Up Portfolio - application-focused gateway */}
            <Portfolio />

            {/* About Section - Artist Statement */}
            <section id="about" style={{
              padding: '100px 20px',
              background: '#f5f5f5'
            }}>
              <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '60px',
                alignItems: 'center'
              }}>
                <div style={{
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '100%',
                    height: '100%',
                    border: '2px solid #1a1a1a',
                    borderRadius: '12px',
                    zIndex: 0
                  }}></div>
                  <img
                    src="/images/photography/about.jpeg"
                    alt="Josh Moriarty"
                    loading="lazy"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    margin: '0 0 30px 0',
                    letterSpacing: '-0.03em'
                  }}>
                    About Me
                  </h2>

                  {/* Artist Profile Text */}
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    I'm a visual artist working across animation and cinematography. My work moves between drawn worlds and filmed reality, using movement, rhythm, framing and texture to create images that feel immediate and atmospheric.
                  </p>

                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    In cinematography, I'm drawn to raw, unrepeatable environments: Dublin's underground music scene, live bands, DJ sets, streetwear shoots and urban locations. Shooting on a Sony PD170 gives the footage a tactile DV texture, where grain, motion and imperfection become part of the storytelling.
                  </p>

                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    In animation and drawing, I approach the image from the opposite direction: building scenes from the ground up, where every gesture, expression, line and environment is intentionally designed. Animation lets me shape timing and emotion with the same sensitivity I bring to live footage.
                  </p>

                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    The bridge between the two is visual storytelling. Whether I'm filming a crowded venue or animating a character study, I focus on how light, colour, movement and composition shape the way a story is felt.
                  </p>

                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    Right now my work brings together the documentary energy of analogue filmmaking and the imaginative control of hand-drawn animation — a portfolio that sits between observation, design and cinematic atmosphere.
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '40px'
                  }}>
                    <div>
                      <h4 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: '0 0 8px 0'
                      }}>20+</h4>
                      <span style={{ color: '#666' }}>Events Covered</span>
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: '0 0 8px 0'
                      }}>2</h4>
                      <span style={{ color: '#666' }}>Visual Disciplines</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FeaturedReel />

            <section id="artwork" style={{
              background: '#ffffff',
              padding: '80px 20px'
            }}>
              <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
              }}>
                {/* Section Title */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '50px'
                }}>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '700',
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1',
                    color: '#1a1a1a'
                  }}>
                    Drawing Portfolio
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    maxWidth: '800px',
                    margin: '0 auto',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.6'
                  }}>
                    I bring the same observational eye from my filmmaking into my sketchbook — studying form, light and movement. These pages move between observational drawing, character design and visual storytelling, and they're where I work on the foundations: figure work, perspective, tonal rendering and finding my own voice.
                  </p>
                </div>
                <Artwork />
              </div>
            </section>

            <Animation />

            <WorkGrid />
            {/* <Process /> */}
            <Equipment />
            <Photography />


            <Credits />

            {/* Contact Section */}
            <section id="contact" style={{
              padding: '100px 20px',
              background: '#1a1a1a',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              <div style={{
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '700',
                  margin: '0 0 30px 0',
                  letterSpacing: '-0.03em'
                }}>
                  Let's Create
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  opacity: 0.8,
                  marginBottom: '40px'
                }}>
                  Available for bookings, collaborations, and events.
                </p>

                <ContactForm />

                <p style={{ marginTop: '24px', fontSize: '0.95rem', opacity: 0.6 }}>
                  Or email me directly at{' '}
                  <a href="mailto:joshmoriartyfilms@gmail.com" style={{ color: '#ffffff' }}>
                    joshmoriartyfilms@gmail.com
                  </a>
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '30px',
                  marginTop: '40px'
                }}>
                  <a href="https://www.instagram.com/joshmoriartyfilms" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>Instagram</a>
                  <a href="https://www.youtube.com/@joshmoriartyfilms" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>YouTube</a>
                </div>
                <div style={{
                  marginTop: '60px',
                  paddingTop: '40px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.9rem',
                  opacity: 0.5
                }}>
                  © 2026 Josh Moriarty Films. All rights reserved.
                </div>
              </div>
            </section>
          </div>
        } />
      </Routes>
    </Router >
  );
}

export default App;
