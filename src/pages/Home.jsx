import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import ResponsiveImage from '../components/ResponsiveImage';
import MotionClipGrid from '../components/MotionClipGrid';
import Lightbox from '../components/Lightbox';
import { artworks, sequences } from '../data/content';
import { routes } from '../routes';
import { useState } from 'react';
import './Home.css';

const meta = routes.find((route) => route.path === '/');

const featured = artworks.filter((artwork) => artwork.featured);
// The strongest single piece carries the hero.
const heroPiece = featured[0];

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
                        Comic Artist <span aria-hidden="true">·</span> 2D Animator{' '}
                        <span aria-hidden="true">·</span> Filmmaker
                    </p>
                    <p className="jm-hero__line">
                        I create dynamic comic art, 2D animation and cinematic visual
                        storytelling.
                    </p>

                    <div className="jm-hero__actions">
                        <Link className="jm-button jm-button--primary" to="/comic-art">
                            View Portfolio
                        </Link>
                        {/* Not "Watch Animation Reel": the Creative Reel moved
                            to Film, so there is no animation-only reel to
                            promise. Restore the wording once one exists. */}
                        <Link className="jm-button jm-button--secondary" to="/animation">
                            Watch Animation
                        </Link>
                    </div>
                    <Link className="jm-button jm-button--quiet jm-hero__about" to="/about">
                        About Josh
                    </Link>
                </div>
            </section>

            <div className="jm-container">
                <section className="jm-section" aria-labelledby="featured-heading">
                    <div className="jm-section__header">
                        <h2 id="featured-heading">Featured Work</h2>
                        <p>Recent character illustration and line work.</p>
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

                    <Link className="jm-button jm-button--secondary jm-section__cta" to="/comic-art">
                        See all comic art
                    </Link>
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

                {/* Leads on drawn movement rather than the Creative Reel, which
                    opens on live-action and now sits under Film. */}
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

                <section className="jm-section jm-home-about" aria-labelledby="about-heading">
                    <div>
                        <h2 id="about-heading">About</h2>
                        <p>
                            I'm an emerging Irish artist, animator and filmmaker working
                            across comic art, character-driven animation and cinematic
                            storytelling. My work combines bold composition, expressive
                            movement and influences from comics, film and games.
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
                        comics, animation and film.
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
