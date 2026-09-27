import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import ResponsiveImage from '../components/ResponsiveImage';
import { equipment, software } from '../data/content';
import { CV_PATH, routes } from '../routes';
import './About.css';

const meta = routes.find((route) => route.path === '/about');

const INTERESTS = [
    '2D animation',
    'Animation clean-up',
    'Character design',
    'Storyboarding',
    'Comic illustration',
    'Sequential storytelling',
    'Visual development',
    'Filmmaking',
];

/*
 * Confirmed 27 September 2026: studying animation at Stillorgan College.
 * TODO: Add the exact course name and year only once Josh confirms them.
 */

function About() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/about" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="About" title="Josh Moriarty" />

                <div className="jm-about">
                    <div className="jm-about__body">
                        <p className="jm-about__lead">
                            Josh Moriarty is an Irish animation student at Stillorgan
                            College who also draws and makes films. He explores character, movement and storytelling
                            through 2D animation, drawing and film.
                        </p>
                        <p>
                            His work combines bold composition, expressive movement and
                            influences from comics, film and games.
                        </p>
                        <p>
                            Alongside drawing and animation, he shoots and edits live music
                            and fashion work on a Sony PD170, which feeds back into how he
                            frames, times and paces a drawn sequence.
                        </p>

                        <dl className="jm-about__facts">
                            <dt>Based in</dt>
                            <dd>Ireland</dd>
                            <dt>Studying</dt>
                            <dd>Animation, Stillorgan College</dd>
                            <dt>Working in</dt>
                            <dd>2D animation, drawing and comic art, film</dd>
                            <dt>Available for</dt>
                            <dd>
                                Internships, junior projects and collaborative work
                            </dd>
                        </dl>

                        <div className="jm-about__actions">
                            <a className="jm-button jm-button--primary" href={CV_PATH} download>
                                Download CV
                            </a>
                            <Link className="jm-button jm-button--secondary" to="/contact">
                                Get in touch
                            </Link>
                        </div>
                    </div>

                    <ResponsiveImage
                        src="/images/photography/about.jpeg"
                        alt="Josh Moriarty"
                        sizes="(max-width: 900px) 92vw, 400px"
                        className="jm-about__portrait"
                    />
                </div>

                <section className="jm-section" aria-labelledby="interests-heading">
                    <div className="jm-section__header">
                        <h2 id="interests-heading">Areas of Focus</h2>
                    </div>
                    <ul className="jm-tags">
                        {INTERESTS.map((interest) => (
                            <li key={interest}>{interest}</li>
                        ))}
                    </ul>
                </section>

                <section className="jm-section" aria-labelledby="software-heading">
                    <div className="jm-section__header">
                        <h2 id="software-heading">Tools</h2>
                    </div>
                    <ul className="jm-tags">
                        {software.map((tool) => (
                            <li key={tool}>{tool}</li>
                        ))}
                    </ul>
                </section>

                {/* The camera collection is detail, not the headline: it sits
                    last and closed so the work and tools summary come first. */}
                <section className="jm-section" aria-labelledby="kit-heading">
                    <details className="jm-kit-disclosure">
                        <summary>
                            <h2 id="kit-heading">Equipment</h2>
                            <span className="jm-kit-disclosure__hint">
                                Cameras and hardware used across the drawing and film
                                work
                            </span>
                        </summary>
                        <ul className="jm-kit">
                            {equipment.map((item) => (
                                <li key={item.name} className="jm-kit__item">
                                    <ResponsiveImage
                                        src={item.image}
                                        alt={item.name}
                                        sizes="(max-width: 700px) 45vw, 200px"
                                    />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p className="jm-kit__type">{item.type}</p>
                                        <p className="jm-kit__description">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </details>
                </section>
            </div>
        </>
    );
}

export default About;
