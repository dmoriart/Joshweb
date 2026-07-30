import { useState } from 'react';
import { photography } from '../data/content';
import Lightbox from './Lightbox';
import ResponsiveImage from './ResponsiveImage';
import './Photography.css';

function Photography() {
    // { collectionId, index } — navigation wraps within a single collection.
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
        <section id="photography" className="jm-photography">
            <div className="jm-container">
                <header className="jm-photography__header">
                    <h2>Photography</h2>
                    <p>
                        Composition, colour and shape — stills shot alongside the film work.
                    </p>
                </header>

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
                                    onClick={() => setOpen({ collectionId: item.id, index })}
                                    aria-label={`View ${image.title} from ${item.title}`}
                                >
                                    <ResponsiveImage
                                        src={image.src}
                                        alt={`${image.title}. ${image.description}`}
                                        sizes="(max-width: 700px) 92vw, 300px"
                                    />
                                    <span className="jm-photo__overlay">
                                        <span className="jm-photo__title">{image.title}</span>
                                        <span className="jm-photo__description">
                                            {image.description}
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
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
                                {collection.title} · {open.index + 1} of {collection.images.length}
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
        </section>
    );
}

export default Photography;
