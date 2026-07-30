/**
 * YouTube URL helpers.
 *
 * Previously copy-pasted into Portfolio.jsx, Animation.jsx and WorkGrid.jsx.
 * Handles the four link shapes used across the content data: youtu.be/ID,
 * youtube.com/watch?v=ID, youtube.com/shorts/ID and youtube.com/embed/ID.
 */

const ID_PATTERN =
  /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

/** @returns {string|null} the 11-character video id, or null if unparseable. */
export function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(ID_PATTERN);
  if (match) return match[1];
  const queryMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  return queryMatch ? queryMatch[1] : null;
}

/**
 * Poster image for a video.
 *
 * `maxresdefault` is only present for videos uploaded at 720p or above, so
 * `hqdefault` is the safe default — it always exists.
 */
export function getYouTubeThumbnail(url, quality = 'hqdefault') {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : null;
}

/**
 * Embed URL for click-to-play.
 *
 * `autoplay=1` is intentional here: the iframe is only ever created after a
 * deliberate click, so nothing plays on page load. `rel=0` keeps YouTube from
 * suggesting unrelated channels at the end of a portfolio piece.
 */
export function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : null;
}
