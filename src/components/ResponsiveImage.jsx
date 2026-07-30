import { resolveFullImage, resolveImage } from '../lib/images';

/**
 * An <img> that always carries a srcset and intrinsic dimensions.
 *
 * The dimensions are the point: without them every image on the page reflows
 * as it loads. They are taken from the source file, so the browser reserves the
 * right aspect ratio even though the served file is a smaller derivative.
 *
 * @param {object} props
 * @param {string} props.src   Original path from the content data.
 * @param {string} props.alt
 * @param {string} [props.sizes]  CSS `sizes` hint. Defaults to full width.
 * @param {boolean} [props.full]  Use the single large rendition (lightbox/hero).
 * @param {boolean} [props.priority] Eager-load and raise fetch priority. Use
 *        only for the hero image — everything else stays lazy.
 */
function ResponsiveImage({
    src,
    alt,
    sizes = '100vw',
    full = false,
    priority = false,
    className,
    style,
}) {
    const image = full ? resolveFullImage(src) : resolveImage(src);

    return (
        <img
            src={image.src}
            srcSet={full ? undefined : image.srcSet}
            sizes={full || !image.srcSet ? undefined : sizes}
            width={image.width}
            height={image.height}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : undefined}
            className={className}
            style={style}
        />
    );
}

export default ResponsiveImage;
