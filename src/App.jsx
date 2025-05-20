import React from 'react';
import './App.css';

const works = [
  { title: 'VARDY VS ROONEY: A COURT ROOM DRAMA', url: '#' },
  { title: 'MAXINE', url: '#' },
  { title: 'THE HOLIDAY', url: '#' },
  { title: 'HOLY ISLAND', url: '#' },
  { title: 'YOUR NOT HOME', url: '#' },
  { title: '4X4', url: '#' },
  { title: 'DON’T GO WHERE I CANT FIND YOU', url: '#' },
  { title: 'NORTH CIRCULAR', url: '#' },
  { title: 'FASHION FILM || COLIN HORGAN || LONDON FASHION WEEK', url: '#' },
  { title: 'JUNIOR BROTHER || LIFE’S NEW HAIRCUT', url: '#' },
  { title: 'KP RING || NOT A HOPELESS PLACE', url: '#' },
  { title: 'IRISH WOMEN IN HARMONY || ONLY A WOMAN', url: '#' },
  { title: 'BELONG TO || COME IN', url: '#' },
  { title: 'MIDDLETON VERY RARE', url: '#' },
  { title: 'SKODA HALLOWEEN “INNER CHILD”', url: '#' },
  { title: 'FYFFES DUNDALK FC | THE NEXT CHAPTER', url: '#' },
  { title: 'CALL IT OUT CAMPAIN | HAVE YOU EVER FELT', url: '#' },
  { title: 'MALDRON | SAVE A TENOR', url: '#' },
  { title: 'JAMESON BLACK BARREL | ANOTHER LEVEL OF SMOOTHNESS', url: '#' },
  { title: 'APPLEGREEN | HERO’S', url: '#' },
  { title: 'PILLOW QUEENS | BROTHERS', url: '#' },
  { title: 'GIRL BAND | GOING NORWAY', url: '#' },
  { title: 'THE TRAP', url: '#' },
  { title: 'GIRL BAND | SHOULDER BLADES', url: '#' },
  { title: 'MACE | RIGHT OPTIONS', url: '#' },
  { title: 'JUST EAT | TOM YUM SOUP', url: '#' },
  { title: 'ABHAILE | A ROOF OVER YOU', url: '#' },
  { title: 'AWAY WITH THE FAIRES', url: '#' },
  { title: 'LITTLE GREEN CARS “MY LOVE TOOK ME DOWN TO THE RIVER”', url: '#' },
  { title: 'PBR STREET GANG | EVERYTHING CHANGES PBR', url: '#' },
  { title: 'ENTER SHIKARI “LIVE OUTSIDE”', url: '#' },
  { title: 'CICADA', url: '#' },
  { title: 'TACKLE YOUR FEELINGS “JACK MCGRATH”', url: '#' },
  { title: 'TACKLE YOUR FEELINGS | 2018', url: '#' },
  { title: 'FIGHT LIKE APES “CROUCHING BEES”', url: '#' },
  { title: 'PIQI MIQI “THE GIRLS LIKE THE GIRLS”', url: '#' },
  { title: 'TACKLE YOUR FEELINGS CAMPAIGN', url: '#' },
  { title: 'COME ON LIVE LONG “ TROUGH”', url: '#' },
  { title: 'AN CAT', url: '#' },
  { title: 'DIRTY EPICS “MIDNIGHT MISSING”', url: '#' },
  { title: 'LOVE IS A STING', url: '#' },
  { title: 'HUNT & GATHER “ WE OWN THE NIGHT”', url: '#' },
  { title: 'HUNT & GATHER “MAJESTIC CREATURES”', url: '#' },
];

function App() {
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
            Josh Moriarty is a passionate cinematographer with a keen eye for storytelling through visuals. With years of experience in film, commercial, and creative projects, Josh brings a unique perspective to every frame.
          </p>
        </section>
        <section id="work" className="eb-work">
          <h2>My Work</h2>
          <div className="eb-work-list">
            {works.map((work, idx) => (
              <a key={idx} href={work.url} className="eb-work-item" target="_blank" rel="noopener noreferrer">
                {work.title}
              </a>
            ))}
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
