import { useMemo, useState } from 'react';
import { artworks } from './data/content';
import Lightbox from './components/Lightbox';
import ResponsiveImage from './components/ResponsiveImage';
import './components/Gallery.css';

const categories = [
  { key: 'all', label: 'All Work' },
  { key: 'fan-art', label: 'Character & Fan Art' },
  { key: 'digital', label: 'Digital Artwork' },
  { key: 'self-portraits', label: 'Self Portraits' },
  { key: 'viewpoint', label: 'View & Viewpoint' },
  { key: 'street', label: 'Street' },
  { key: 'photoshoot', label: 'Photoshoot' },
  { key: 'sketchbook', label: 'Sketchbook & Studies' },
];

const categoryLabel = (key) =>
  categories.find((category) => category.key === key)?.label ?? key;

function Artwork() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? artworks
        : artworks.filter((art) => art.category === activeFilter),
    [activeFilter]
  );

  const open = openIndex === null ? null : filtered[openIndex];

  const step = (offset) =>
    setOpenIndex((current) =>
      current === null
        ? null
        : (current + offset + filtered.length) % filtered.length
    );

  const selectFilter = (key) => {
    setActiveFilter(key);
    setOpenIndex(null);
  };

  return (
    <>
      <div className="jm-filters" role="group" aria-label="Filter artwork by category">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className="jm-filter"
            aria-pressed={activeFilter === category.key}
            onClick={() => selectFilter(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Announced so screen-reader users hear the result of a filter change. */}
      <p className="jm-gallery__count" role="status">
        Showing {filtered.length} piece{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="jm-masonry">
        {filtered.map((art, index) => (
          /* The wrapper carries the column break; Safari mishandles
             break-inside on a <button> directly inside a multicol container. */
          <div key={art.id} className="jm-masonry__item">
            <button
              type="button"
              className="jm-tile"
              onClick={() => setOpenIndex(index)}
              aria-label={`View ${art.title} — ${categoryLabel(art.category)}`}
            >
              <ResponsiveImage
                src={art.src}
                /* The description is more useful to a screen reader than the
                   title alone, and it is already written for every piece. */
                alt={art.description ? `${art.title}. ${art.description}` : art.title}
                /* Three columns at 1200px, two below 900px, one below 550px. */
                sizes="(max-width: 550px) 92vw, (max-width: 900px) 45vw, 380px"
              />
              <span className="jm-tile__overlay">
                <span className="jm-tile__title">{art.title}</span>
                <span className="jm-tile__category">{categoryLabel(art.category)}</span>
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
                {categoryLabel(open.category)} · {openIndex + 1} of {filtered.length}
              </span>
            </>
          }
        >
          <ResponsiveImage full priority src={open.src} alt={open.description || open.title} />
        </Lightbox>
      )}
    </>
  );
}

export default Artwork;
