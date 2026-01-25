import React from 'react';
import './App.css';
import Artwork from './Artwork';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedReel from './components/FeaturedReel';
import WorkGrid from './components/WorkGrid';
import Photography from './components/Photography';
import Process from './components/Process';
import Equipment from './components/Equipment';
import Credits from './components/Credits';
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
            <FeaturedReel />
            <WorkGrid />
            <Photography />

            {/* Artwork Section */}
            <section id="artwork" style={{
              background: '#f8f8f8',
              padding: '80px 20px'
            }}>
              <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
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
                    lineHeight: '1.1',
                    color: '#1a1a1a'
                  }}>
                    Visual Artwork
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    maxWidth: '600px',
                    margin: '0 auto',
                    letterSpacing: '-0.01em'
                  }}>
                    Digital and mixed media explorations
                  </p>
                </div>
                <Artwork />
              </div>
            </section>

            <Process />
            <Equipment />

            {/* About Section - Artist Statement */}
            <section id="about" style={{
              padding: '100px 20px',
              background: '#ffffff'
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
                    src="/images/photography/D92998F4-80BC-4043-89B8-A5927E373E72 (1).jpeg"
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
                    Artist Statement
                  </h2>

                  {/* Why I Make Films */}
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    As a student filmmaker, I'm drawn to documenting Dublin's underground music scene—live bands and DJ sets—because these moments are raw, unrepeatable, and full of energy. I shoot on a Sony PD170 rather than an iPhone because I believe the medium shapes the message. The PD170's nostalgic DV tape aesthetic creates a texture and warmth that modern digital cameras simply can't replicate.
                  </p>

                  {/* Film Influences */}
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    I'm inspired by films that combine strong visual style with character and atmosphere. <em>An American Werewolf in London</em> showed me how practical effects and visual design create visceral emotional impact. <em>Star Wars: The Clone Wars</em> demonstrated how animation can achieve cinematic depth and storytelling sophistication. <em>The Gentlemen</em> taught me how editing and camera movement support tone and narrative flow. <em>Rango</em> opened my eyes to distinctive visual style and character design as storytelling tools.
                  </p>

                  {/* Christopher Nolan & Structure */}
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '24px',
                    lineHeight: '1.8'
                  }}>
                    <em>Tenet</em> particularly fascinates me for how Christopher Nolan uses structure, sound, and editing to shape the audience's experience. He uses sound in innovative ways that redefine how we engage with film. What I love most is discovering something new with every rewatch—details that completely change the movie's meaning. This idea of layered storytelling drives my own approach to filmmaking.
                  </p>

                  {/* Educational Goals */}
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#444',
                    marginBottom: '30px',
                    lineHeight: '1.8'
                  }}>
                    While I love the DV tape aesthetic, I'm eager to develop my technical skills in lighting, sound design, and narrative direction. Film school will give me the foundation to tell more compelling stories and push beyond documentation into crafted visual narratives. I want to learn how visual choices affect mood and storytelling at a deeper level, combining the raw energy I capture now with sophisticated cinematic technique.
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
                      }}>100%</h4>
                      <span style={{ color: '#666' }}>Analog Format</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
                <a href="mailto:joshmoriartyfilms@gmail.com" style={{
                  display: 'inline-block',
                  padding: '16px 40px',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'transform 0.2s ease'
                }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Get in Touch
                </a>

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
                  © 2025 Josh Moriarty Films. All rights reserved.
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
