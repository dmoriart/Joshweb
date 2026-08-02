import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import VideoEmbed from '../components/VideoEmbed';
import MotionClipGrid from '../components/MotionClipGrid';
import ResponsiveImage from '../components/ResponsiveImage';
import { animationReel, animations, cleanups } from '../data/content';
import { routes } from '../routes';
import './AnimationPage.css';

const meta = routes.find((route) => route.path === '/animation');

function AnimationPage() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/animation" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Portfolio" title="2D Animation">
                    Hand-drawn movement: timing, spacing, weight and gesture, plus clean-up
                    work showing how a rough drawing becomes a consistent line.
                </PageHeader>

                {/* Reel first — the fastest way for a reviewer to see the range. */}
                <section aria-labelledby="reel-heading" className="jm-anim-reel">
                    <h2 id="reel-heading" className="jm-visually-hidden">
                        Showreel
                    </h2>
                    <VideoEmbed
                        url={animationReel.url}
                        title={animationReel.title}
                        caption="Showreel — animation and film work."
                    />
                </section>

                {/* Short clips before long ones: these play inline with no click. */}
                <section className="jm-section" aria-labelledby="clips-heading">
                    <div className="jm-section__header">
                        <h2 id="clips-heading">Movement Tests</h2>
                        <p>
                            Frame-by-frame tests exploring timing, pose change, spacing and
                            gesture. These loop silently — nothing plays with sound.
                        </p>
                    </div>
                    <MotionClipGrid />
                </section>

                <section className="jm-section" aria-labelledby="pieces-heading">
                    <div className="jm-section__header">
                        <h2 id="pieces-heading">Animated Pieces</h2>
                        <p>Longer hand-drawn pieces, hosted on YouTube.</p>
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

                {cleanups.length > 0 && (
                    <section className="jm-section" aria-labelledby="cleanup-heading">
                        <div className="jm-section__header">
                            <h2 id="cleanup-heading">Clean-Up</h2>
                            <p>
                                A rough drawing refined into clean, consistent line work,
                                keeping the pose and readability intact.
                            </p>
                        </div>

                        {cleanups.map((example) => (
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
