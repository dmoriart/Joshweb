import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import ArtworkGallery from '../components/ArtworkGallery';
import { artworks } from '../data/content';
import { routes } from '../routes';

const meta = routes.find((route) => route.path === '/sketchbook');

const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'sketchbook', label: 'Studies' },
    { key: 'self-portraits', label: 'Self Portraits' },
    { key: 'viewpoint', label: 'View & Viewpoint' },
    { key: 'street', label: 'Street' },
    { key: 'photoshoot', label: 'From Reference' },
];

const items = artworks.filter((artwork) =>
    CATEGORIES.some((category) => category.key === artwork.category)
);

function Sketchbook() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/sketchbook" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Process" title="Sketchbook & Studies">
                    Where the foundations get built: figure work, perspective, tonal
                    rendering and observational drawing from life.
                </PageHeader>

                <ArtworkGallery items={items} categories={CATEGORIES} noun="drawing" />
            </div>
        </>
    );
}

export default Sketchbook;
