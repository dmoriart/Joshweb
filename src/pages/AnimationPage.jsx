import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import VideoEmbed from '../components/VideoEmbed';
import MotionClipGrid from '../components/MotionClipGrid';
import ResponsiveImage from '../components/ResponsiveImage';
import { animations, cleanups } from '../data/content';
import { routes } from '../routes';
import './AnimationPage.css';

const meta = routes.find((route) => route.path === '/animation');

// Clean-up is a skill claim, so a pair is only shown once Josh has confirmed
// he redrew the lines himself. See `cleanups` in content.js.
const confirmedCleanups = cleanups.filter((example) => example.processConfirmed);

function AnimationPage() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/animation" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Portfolio" title="2D Animation">
                    Hand-drawn movement loops and longer animated pieces, drawn frame by
                    frame on a tablet.
                </PageHeader>

                {/* Drawn work first. The Creative Reel used to open this page,
                    but it leads with live-action footage, so a reviewer saw
                    cinematography before any animation. It now sits under Film.
                    These clips loop inline with no click and no sound. */}
                <section aria-labelledby="clips-heading">
                    <div className="jm-section__header">
                        <h2 id="clips-heading">Movement Tests</h2>
                        <p>
                            Short frame-by-frame loops. They play silently — nothing plays
                            with sound.
                        </p>
                    </div>
                    <MotionClipGrid />
                </section>

                <section className="jm-section" aria-labelledby="pieces-heading">
                    <div className="jm-section__header">
                        <h2 id="pieces-heading">Animated Pieces</h2>
                        <p>Longer pieces, including an animated comic panel, hosted on YouTube.</p>
                    </div>

                    <div className="jm-anim-grid">
                        {animations.map((animation) => (
                            <article key={animation.id} className="jm-anim-card">
                                <VideoEmbed url={animation.url} title={animation.title} />
                                <h3>{animation.title}</h3>
                                <p className="jm-anim-card__description">
                                    {animation.description}
                                </p>
                                <dl className="jm-anim-card__meta">
                                    {animation.tools && (
                                        <>
                                            <dt>Tools</dt>
                                            <dd>{animation.tools}</dd>
                                        </>
                                    )}
                                    {animation.year && (
                                        <>
                                            <dt>Year</dt>
                                            <dd>{animation.year}</dd>
                                        </>
                                    )}
                                    {animation.origin && (
                                        <>
                                            <dt>Type</dt>
                                            <dd>{animation.origin}</dd>
                                        </>
                                    )}
                                </dl>
                            </article>
                        ))}
                    </div>
                </section>

                {confirmedCleanups.length > 0 && (
                    <section className="jm-section" aria-labelledby="cleanup-heading">
                        <div className="jm-section__header">
                            <h2 id="cleanup-heading">Clean-Up</h2>
                            <p>
                                A rough drawing refined into clean, consistent line work,
                                keeping the pose and readability intact.
                            </p>
                        </div>

                        {confirmedCleanups.map((example) => (
                            <figure key={example.id} className="jm-cleanup">
                                <div className="jm-cleanup__pair">
                                    {example.images.map((image) => (
                                        <div key={image.label} className="jm-cleanup__panel">
                                            <span className="jm-cleanup__label">
                                                {image.label}
                                            </span>
                                            <ResponsiveImage
                                                src={image.src}
                                                alt={`${image.label}: ${example.caption}`}
                                                sizes="(max-width: 700px) 92vw, 480px"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <figcaption>{example.caption}</figcaption>
                            </figure>
                        ))}
                    </section>
                )}
            </div>
        </>
    );
}

export default AnimationPage;
