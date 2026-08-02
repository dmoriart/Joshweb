import { useMemo, useState } from 'react';
import Lightbox from './Lightbox';
import ResponsiveImage from './ResponsiveImage';
import './Gallery.css';

/**
 * Filterable masonry gallery with an accessible viewer.
 *
 * Shared by the Comic Art and Sketchbook pages — the only difference between
 * them is which pieces and categories get passed in.
 *
 * @param {object} props
 * @param {import('../data/types.js').ArtworkItem[]} props.items
 * @param {Array<{key: string, label: string}>} [props.categories]
 *        Omit to render the gallery without a filter bar.
 * @param {string} props.noun Singular label used in the result count.
 */
function ArtworkGallery({ items, categories, noun = 'piece' }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);

    const filtered = useMemo(
        () =>
            activeFilter === 'all'
                ? items
                : items.filter((item) => item.category === activeFilter),
        [items, activeFilter]
    );

    const open = openIndex === null ? null : filtered[openIndex];

    const categoryLabel = (key) =>
        categories?.find((category) => category.key === key)?.label ?? key;

    const step = (offset) =>
        setOpenIndex((current) =>
            current === null
                ? null
                : (current + offset + filtered.length) % filtered.length
        );

    return (
        <>
            {categories && categories.length > 1 && (
                <div className="jm-filters" role="group" aria-label="Filter by category">
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            type="button"
                            className="jm-filter"
                            aria-pressed={activeFilter === category.key}
                            onClick={() => {
                                setActiveFilter(category.key);
                                setOpenIndex(null);
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            )}

            {/* role="status" so a filter change is announced, not just seen. */}
            <p className="jm-gallery__count" role="status">
                Showing {filtered.length} {noun}
                {filtered.length === 1 ? '' : 's'}
            </p>

            <div className="jm-masonry">
                {filtered.map((item, index) => (
                    <div key={item.id} className="jm-masonry__item">
                        <button
                            type="button"
                            className="jm-tile"
                            onClick={() => setOpenIndex(index)}
                            /* No aria-label: the image alt names the button.
                               The old "View {title}" label left out the
                               category shown on the tile, so the accessible
                               name contradicted the visible label (WCAG 2.5.3).
                               The caption below is aria-hidden because it only
                               repeats what the alt text already says. */
                        >
                            <ResponsiveImage
                                src={item.src}
                                alt={
                                    item.description
                                        ? `${item.title}. ${item.description}`
                                        : item.title
                                }
                                sizes="(max-width: 550px) 92vw, (max-width: 900px) 45vw, 380px"
                                /* The first row is in view on load, so eager
                                   loading it removes a round trip from LCP. */
                                priority={index < 3}
                            />
                            <span className="jm-tile__overlay" aria-hidden="true">
                                <span className="jm-tile__title">{item.title}</span>
                                {categories && (
                                    <span className="jm-tile__category">
                                        {categoryLabel(item.category)}
                                    </span>
                                )}
                            </span>
                        </button>
                    </div>
                ))}
            </div>

            {open && (
                <Lightbox
                    label={`${open.title}, artwork viewer`}
                    onClose={() => setOpenIndex(null)}
                    onPrev={filtered.length > 1 ? () => step(-1) : undefined}
                    onNext={filtered.length > 1 ? () => step(1) : undefined}
                    caption={
                        <>
                            <h3 className="jm-lightbox__title">{open.title}</h3>
                            <p className="jm-lightbox__description">{open.description}</p>
                            <span className="jm-lightbox__meta">
                                {[
                                    categories && categoryLabel(open.category),
                                    open.tools,
                                    open.year,
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                                {' · '}
                                {openIndex + 1} of {filtered.length}
                            </span>
                        </>
                    }
                >
                    <ResponsiveImage
                        full
                        priority
                        src={open.src}
                        alt={open.description || open.title}
                    />
                </Lightbox>
            )}
        </>
    );
}

export default ArtworkGallery;
