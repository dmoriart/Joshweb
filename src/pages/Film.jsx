import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import VideoEmbed from '../components/VideoEmbed';
import Lightbox from '../components/Lightbox';
import ResponsiveImage from '../components/ResponsiveImage';
import { credits, filmGroups, photography, works } from '../data/content';
import { routes } from '../routes';
import './Film.css';

const meta = routes.find((route) => route.path === '/film');

/** Only groups that actually contain work get a heading. */
const populatedGroups = filmGroups
    .filter((group) => group.key !== 'all')
    .map((group) => ({
        ...group,
        items: works.filter((work) => work.group === group.key),
    }))
    .filter((group) => group.items.length > 0);

function FilmCard({ work }) {
    return (
        <article className="jm-film-card">
            <VideoEmbed url={work.url} title={work.title} />
            <h3>{work.title}</h3>
            <p className="jm-film-card__description">{work.description}</p>
            <dl className="jm-film-card__meta">
                {/* Role first, and always the exact contribution. */}
                <dt>Role</dt>
                <dd>{work.role}</dd>
                <dt>Location</dt>
                <dd>{work.venue}</dd>
                <dt>Year</dt>
                <dd>{work.year}</dd>
                {work.technicalDetails && (
                    <>
                        <dt>Setup</dt>
                        <dd>{work.technicalDetails}</dd>
                    </>
                )}
            </dl>
        </article>
    );
}

function Film() {
    const [open, setOpen] = useState(null);
    const collection = open
        ? photography.find((item) => item.id === open.collectionId)
        : null;
    const photo = collection?.images[open.index];

    const step = (offset) =>
        setOpen((current) => {
            if (!current) return current;
            const images = photography.find((c) => c.id === current.collectionId)?.images;
            if (!images) return current;
            return {
                ...current,
                index: (current.index + offset + images.length) % images.length,
            };
        });

    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/film" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Portfolio" title="Film & Cinematography">
                    Live music, fashion and brand work shot on a Sony PD170 and cut on
                    Premiere. Josh's exact role is stated on every piece.
                </PageHeader>

                {populatedGroups.map((group) => (
                    <section
                        key={group.key}
                        className="jm-section"
                        aria-labelledby={`film-${group.key}`}
                    >
                        <div className="jm-section__header">
                            <h2 id={`film-${group.key}`}>{group.label}</h2>
                        </div>
                        <div className="jm-film-grid">
                            {group.items.map((work) => (
                                <FilmCard key={work.url} work={work} />
                            ))}
                        </div>
                    </section>
                ))}

                <section className="jm-section" aria-labelledby="photography-heading">
                    <div className="jm-section__header">
                        <h2 id="photography-heading">Photography</h2>
                        <p>Stills shot alongside the film work.</p>
                    </div>

                    {photography.map((item) => (
                        <div key={item.id} className="jm-photo-collection">
                            <div className="jm-photo-collection__header">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="jm-photo-grid">
                                {item.images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        className="jm-photo"
                                        data-orientation={item.orientation}
                                        onClick={() =>
                                            setOpen({ collectionId: item.id, index })
                                        }
                                        aria-label={`View ${image.title} from ${item.title}`}
                                    >
                                        <ResponsiveImage
                                            src={image.src}
                                            alt={`${image.title}. ${image.description}`}
                                            sizes="(max-width: 700px) 92vw, 300px"
                                        />
                                        <span className="jm-photo__overlay">
                                            <span className="jm-photo__title">
                                                {image.title}
                                            </span>
                                            <span className="jm-photo__description">
                                                {image.description}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section className="jm-section" aria-labelledby="credits-heading">
                    <div className="jm-section__header">
                        <h2 id="credits-heading">Selected Credits</h2>
                    </div>
                    <ul className="jm-credits">
                        {credits.map((credit, index) => (
                            <li key={`${credit.production}-${index}`}>
                                <span className="jm-credits__production">
                                    {credit.production}
                                </span>
                                <span className="jm-credits__role">{credit.role}</span>
                                <span className="jm-credits__year">{credit.year}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {photo && (
                <Lightbox
                    label={`${photo.title}, photograph viewer`}
                    onClose={() => setOpen(null)}
                    onPrev={collection.images.length > 1 ? () => step(-1) : undefined}
                    onNext={collection.images.length > 1 ? () => step(1) : undefined}
                    caption={
                        <>
                            <h3 className="jm-lightbox__title">{photo.title}</h3>
                            <p className="jm-lightbox__description">{photo.description}</p>
                            <span className="jm-lightbox__meta">
                                {collection.title} · {open.index + 1} of{' '}
                                {collection.images.length}
                            </span>
                        </>
                    }
                >
                    <ResponsiveImage
                        full
                        priority
                        src={photo.src}
                        alt={`${photo.title}. ${photo.description}`}
                    />
                </Lightbox>
            )}
        </>
    );
}

export default Film;
