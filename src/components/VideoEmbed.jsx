import { useState } from 'react';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../lib/youtube';
import './VideoEmbed.css';

/**
 * Click-to-play YouTube façade.
 *
 * The site previously embedded the reel with `autoplay=1&mute=1&loop=1`, which
 * pulled in roughly a megabyte of YouTube player JavaScript and started
 * streaming on page load whether or not anyone wanted to watch. Showing the
 * poster frame until a deliberate click costs one image instead, and means
 * nothing ever plays with sound unprompted.
 */
function VideoEmbed({ url, title, caption, poster }) {
    const [playing, setPlaying] = useState(false);
    const posterSrc = poster ?? getYouTubeThumbnail(url, 'maxresdefault');

    return (
        <figure className="jm-video">
            <div className="jm-video__frame">
                {playing ? (
                    <iframe
                        src={getYouTubeEmbedUrl(url)}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        className="jm-video__poster"
                        onClick={() => setPlaying(true)}
                    >
                        <img
                            src={posterSrc}
                            alt=""
                            /* Decorative: the accessible name comes from the
                               button label below, so the poster is not
                               announced twice. */
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            /* maxresdefault only exists for videos uploaded at
                               720p+. When it is missing YouTube may answer with
                               a 404, or with a 120×90 grey placeholder that
                               loads "successfully" — fall back on either. */
                            onError={(event) => {
                                event.currentTarget.src = getYouTubeThumbnail(url);
                            }}
                            onLoad={(event) => {
                                const img = event.currentTarget;
                                const fallback = getYouTubeThumbnail(url);
                                if (img.naturalWidth <= 120 && img.src !== fallback) {
                                    img.src = fallback;
                                }
                            }}
                        />
                        <span className="jm-video__play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                        <span className="jm-visually-hidden">Play {title}</span>
                    </button>
                )}
            </div>
            {caption && <figcaption className="jm-video__caption">{caption}</figcaption>}
        </figure>
    );
}

export default VideoEmbed;
