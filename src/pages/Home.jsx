import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import ResponsiveImage from '../components/ResponsiveImage';
import MotionClipGrid from '../components/MotionClipGrid';
import VideoEmbed from '../components/VideoEmbed';
import Lightbox from '../components/Lightbox';
import { artworks, sequences, works } from '../data/content';
import { routes } from '../routes';
import { useState } from 'react';
import './Home.css';

const meta = routes.find((route) => route.path === '/');

const featured = artworks.filter((artwork) => artwork.featured);
// The strongest single piece carries the hero.
const heroPiece = featured[0];
const featuredFilm = works.find((work) => work.featured);

function Home() {
    const [openIndex, setOpenIndex] = useState(null);
    const open = openIndex === null ? null : featured[openIndex];

    const step = (offset) =>
        setOpenIndex((current) =>
            current === null ? null : (current + offset + featured.length) % featured.length
        );

    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/" />

            <section className="jm-hero">
                <div className="jm-hero__art" aria-hidden="true">
                    <ResponsiveImage
                        priority
                        src={heroPiece.src}
                        alt=""
                        sizes="100vw"
                    />
                </div>

                <div className="jm-container jm-hero__content">
                    <h1 className="jm-hero__name">Josh Moriarty</h1>
                    <p className="jm-hero__roles">
                        Animation student <span aria-hidden="true">·</span> Artist{' '}
                        <span aria-hidden="true">·</span> Filmmaker
                    </p>
                    <p className="jm-hero__line">
                        I explore character, movement and storytelling through 2D
                        animation, drawing and film.
                    </p>

                    {/* Animation leads; drawing and film follow. Not "Watch
                        animation reel": there is no animation-only reel yet. */}
                    <div className="jm-hero__actions">
                        <Link className="jm-button jm-button--primary" to="/animation">
                            View animation
                        </Link>
                        <Link className="jm-button jm-button--secondary" to="/comic-art">
                            Explore drawings
                        </Link>
                        <Link className="jm-button jm-button--quiet" to="/film">
                            Watch film
                        </Link>
                    </div>
                </div>
            </section>

            <div className="jm-container">
                {/* Animation comes straight after the hero: it is what Josh
                    is studying. Drawn loops, not the Creative Reel, which opens
                    on live-action and sits under Film. */}
                <section className="jm-section" aria-labelledby="animation-heading">
                    <div className="jm-section__header">
                        <h2 id="animation-heading">Animation</h2>
                        <p>Hand-drawn movement, timing and character work.</p>
                    </div>

                    <div className="jm-home-clips">
                        <MotionClipGrid featuredOnly />
                    </div>

                    <Link className="jm-button jm-button--secondary jm-section__cta" to="/animation">
                        See all animation
                    </Link>
                </section>

                <section className="jm-section" aria-labelledby="featured-heading">
                    <div className="jm-section__header">
                        <h2 id="featured-heading">Drawing</h2>
                        <p>
                            Finished character illustration alongside observational
                            studies from the sketchbook.
                        </p>
                    </div>

                    <div className="jm-featured">
                        {featured.map((piece, index) => (
                            <button
                                key={piece.id}
                                type="button"
                                className="jm-featured__item"
                                onClick={() => setOpenIndex(index)}
                                aria-label={`View ${piece.title}`}
                            >
                                <ResponsiveImage
                                    src={piece.src}
                                    alt={`${piece.title}. ${piece.description}`}
                                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 340px"
                                />
                                <span className="jm-featured__label">{piece.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="jm-section__cta jm-home-links">
                        <Link className="jm-button jm-button--secondary" to="/comic-art">
                            See all drawings
                        </Link>
                        <Link className="jm-button jm-button--quiet" to="/sketchbook">
                            Open the sketchbook
                        </Link>
                    </div>
                </section>

                {/* Rendered only when real sequences exist — an empty section
                    would tell a reviewer less than no section at all. */}
                {sequences.length > 0 && (
                    <section className="jm-section" aria-labelledby="sequential-heading">
                        <div className="jm-section__header">
                            <h2 id="sequential-heading">Sequential Art</h2>
                            <p>
                                Sequential art, visual storytelling and comic page
                                development.
                            </p>
                        </div>
                        <Link
                            className="jm-button jm-button--secondary"
                            to="/sequential-art"
                        >
                            Read the sequences
                        </Link>
                    </section>
                )}

                {featuredFilm && (
                    <section className="jm-section" aria-labelledby="film-heading">
                        <div className="jm-section__header">
                            <h2 id="film-heading">Film</h2>
                            <p>
                                I also shoot and edit live music and fashion work on a
                                Sony PD170.
                            </p>
                        </div>

                        <div className="jm-home-reel">
                            <VideoEmbed
                                url={featuredFilm.url}
                                title={featuredFilm.title}
                                caption={featuredFilm.description}
                            />
                        </div>

                        <Link className="jm-button jm-button--secondary jm-section__cta" to="/film">
                            See all film
                        </Link>
                    </section>
                )}

                <section className="jm-section jm-home-about" aria-labelledby="about-heading">
                    <div>
                        <h2 id="about-heading">About</h2>
                        <p>
                            I'm an Irish animation student at Stillorgan College who
                            also draws and makes films. My work draws on comics, film and games, and shooting
                            and editing film feeds back into how I frame and pace a
                            drawn sequence.
                        </p>
                        <Link className="jm-button jm-button--secondary" to="/about">
                            More about Josh
                        </Link>
                    </div>
                    <ResponsiveImage
                        src="/images/photography/about.jpeg"
                        alt="Josh Moriarty"
                        sizes="(max-width: 900px) 92vw, 420px"
                        className="jm-home-about__portrait"
                    />
                </section>

                <section className="jm-section jm-home-contact" aria-labelledby="contact-heading">
                    <h2 id="contact-heading">Available for work</h2>
                    <p>
                        Open to internships, junior projects and collaborative work in
                        animation, drawing and film.
                    </p>
                    <Link className="jm-button jm-button--primary" to="/contact">
                        Get in touch
                    </Link>
                </section>
            </div>

            {open && (
                <Lightbox
                    label={`${open.title}, artwork viewer`}
                    onClose={() => setOpenIndex(null)}
                    onPrev={() => step(-1)}
                    onNext={() => step(1)}
                    caption={
                        <>
                            <h3 className="jm-lightbox__title">{open.title}</h3>
                            <p className="jm-lightbox__description">{open.description}</p>
                            <span className="jm-lightbox__meta">
                                {openIndex + 1} of {featured.length}
                            </span>
                        </>
                    }
                >
                    <ResponsiveImage full priority src={open.src} alt={open.description} />
                </Lightbox>
            )}
        </>
    );
}

export default Home;
