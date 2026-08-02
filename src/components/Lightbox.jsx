import React, { useCallback, useEffect, useRef } from 'react';
import './Lightbox.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function ChevronIcon({ direction }) {
    // Single path, mirrored — avoids shipping an icon dependency for two arrows.
    const d = direction === 'left' ? 'M15 4 L7 12 L15 20' : 'M9 4 L17 12 L9 20';
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={d} />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
    );
}

/**
 * Accessible modal viewer for artwork, comic pages and video.
 *
 * Replaces the four separate overlay implementations that previously existed
 * in Artwork, Portfolio, MotionClipGrid and Photography — none of which were
 * announced as dialogs, trapped focus, or restored focus on close.
 *
 * Behaviour: Escape closes; Tab cycles within the dialog; focus returns to the
 * element that opened it; background scrolling is locked; arrow keys page
 * through when `onPrev`/`onNext` are supplied.
 *
 * @param {object} props
 * @param {string} props.label            Accessible name for the dialog.
 * @param {() => void} props.onClose
 * @param {() => void} [props.onPrev]     Omit to hide the previous control.
 * @param {() => void} [props.onNext]     Omit to hide the next control.
 * @param {React.ReactNode} [props.caption] Rendered beneath the media.
 * @param {React.ReactNode} props.children The media itself.
 */
function Lightbox({ label, onClose, onPrev, onNext, caption, children }) {
    const dialogRef = useRef(null);
    const openerRef = useRef(null);

    // Capture the trigger before the dialog steals focus, and hand focus back
    // to it on unmount so keyboard users resume where they left off.
    useEffect(() => {
        openerRef.current = document.activeElement;
        dialogRef.current?.focus();
        return () => {
            if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            onClose();
            return;
        }
        if (event.key === 'ArrowLeft' && onPrev) {
            event.preventDefault();
            onPrev();
            return;
        }
        if (event.key === 'ArrowRight' && onNext) {
            event.preventDefault();
            onNext();
            return;
        }
        if (event.key !== 'Tab') return;

        // Focus trap: wrap from last element to first and vice versa.
        const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE);
        if (!focusable?.length) {
            event.preventDefault();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || active === dialogRef.current)) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    }, [onClose, onPrev, onNext]);

    return (
        <div
            ref={dialogRef}
            className="jm-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={(event) => {
                // Only a click on the backdrop itself dismisses the dialog.
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <button
                type="button"
                className="jm-lightbox__button jm-lightbox__button--close"
                onClick={onClose}
                aria-label="Close viewer"
            >
                <CloseIcon />
            </button>

            <div className="jm-lightbox__stage">{children}</div>

            {caption && <div className="jm-lightbox__caption">{caption}</div>}

            <div className="jm-lightbox__nav">
                {onPrev && (
                    <button
                        type="button"
                        className="jm-lightbox__button jm-lightbox__button--prev"
                        onClick={onPrev}
                        aria-label="Previous"
                    >
                        <ChevronIcon direction="left" />
                    </button>
                )}
                {onNext && (
                    <button
                        type="button"
                        className="jm-lightbox__button jm-lightbox__button--next"
                        onClick={onNext}
                        aria-label="Next"
                    >
                        <ChevronIcon direction="right" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Lightbox;
