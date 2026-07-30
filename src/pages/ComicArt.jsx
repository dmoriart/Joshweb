import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import ArtworkGallery from '../components/ArtworkGallery';
import { artworks } from '../data/content';
import { routes } from '../routes';

const meta = routes.find((route) => route.path === '/comic-art');

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'fan-art', label: 'Character & Fan Art' },
    { key: 'digital', label: 'Digital Illustration' },
];

const items = artworks.filter((artwork) =>
    CATEGORIES.some((category) => category.key === artwork.category)
);

function ComicArt() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/comic-art" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Portfolio" title="Comic Art">
                    Character illustration and comic-style line work — figures, costume,
                    pose and expression, drawn digitally and in the sketchbook.
                </PageHeader>

                <ArtworkGallery items={items} categories={CATEGORIES} noun="piece" />
            </div>
        </>
    );
}

export default ComicArt;
