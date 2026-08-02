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

/**
 * A filter that would return nothing is worse than no filter at all — it
 * invites a click that lands on an empty grid. Categories are derived from
 * what is actually present, so removing artwork removes its filter too.
 */
const availableCategories = CATEGORIES.filter(
    (category) =>
        category.key === 'all' ||
        items.some((item) => item.category === category.key)
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

                {/* 34 drawings is a lot to render up front on a phone, and a
                    reviewer skimming that many studies takes away less than
                    one seeing a tighter selection. The rest are one click
                    away. Trimming the set properly is a curation call for
                    Josh — see docs/content-gaps.md §3.4. */}
                <ArtworkGallery
                    items={items}
                    categories={availableCategories}
                    noun="drawing"
                    initialCount={12}
                />
            </div>
        </>
    );
}

export default Sketchbook;
