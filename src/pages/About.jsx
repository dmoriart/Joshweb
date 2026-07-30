import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import ResponsiveImage from '../components/ResponsiveImage';
import { equipment, software } from '../data/content';
import { CV_PATH, routes } from '../routes';
import './About.css';

const meta = routes.find((route) => route.path === '/about');

const INTERESTS = [
    'Comic illustration',
    'Sequential storytelling',
    '2D animation',
    'Animation clean-up',
    'Storyboarding',
    'Character design',
    'Visual development',
    'Filmmaking',
];

/*
 * TODO: Add Josh's current study status — course and institution, or the
 * courses he is applying to and for which intake. It is deliberately absent
 * rather than guessed; see docs/content-gaps.md §2.3.
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
                            Josh Moriarty is an emerging Irish artist, animator and
                            filmmaker interested in comic art, character-driven animation
                            and cinematic storytelling.
                        </p>
                        <p>
                            His work combines bold composition, expressive movement and
                            influences from comics, film and games. He is developing his
                            skills in sequential art, 2D animation and production workflow
                            as he prepares for further study and early industry
                            opportunities.
                        </p>
                        <p>
                            Alongside drawing and animation, he shoots and edits live music
                            and fashion work on a Sony PD170, which feeds back into how he
                            frames, times and paces a drawn sequence.
                        </p>

                        <dl className="jm-about__facts">
                            <dt>Based in</dt>
                            <dd>Ireland</dd>
                            <dt>Working in</dt>
                            <dd>Comic art, 2D animation, film</dd>
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
                        <h2 id="software-heading">Software & Tools</h2>
                    </div>
                    <ul className="jm-tags">
                        {software.map((tool) => (
                            <li key={tool}>{tool}</li>
                        ))}
                    </ul>
                </section>

                <section className="jm-section" aria-labelledby="kit-heading">
                    <div className="jm-section__header">
                        <h2 id="kit-heading">Kit</h2>
                        <p>Hardware used across the drawing and film work.</p>
                    </div>
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
                                    <p className="jm-kit__description">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
}

export default About;
