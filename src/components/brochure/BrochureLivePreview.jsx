import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrochurePageByIndex } from './BrochurePageContent.jsx';
import { buildBrochurePages } from '../../utils/buildBrochurePages.js';
import '../../styles/brochure-book.css';

const FLIP_MS = 720;
const DRAG_THRESHOLD = 48;

function BrochureLivePreview({ data }) {
  const pages = useMemo(() => buildBrochurePages(data), [data]);
  const pageCount = pages.length;

  const [currentPage, setCurrentPage] = useState(0);
  const [flipAnim, setFlipAnim] = useState(null);
  const [flipActive, setFlipActive] = useState(false);
  const flippingRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0 });
  const flipTimerRef = useRef(null);

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  const clearFlipTimer = () => {
    if (flipTimerRef.current) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
  };

  useEffect(() => () => clearFlipTimer(), []);

  const isFlipping = Boolean(flipAnim);
  const canPrev = currentPage > 0;
  const canNext = currentPage < pageCount - 1;
  const currentMeta = pages[currentPage];

  const runFlip = useCallback((direction, animConfig, onComplete) => {
    if (flippingRef.current) return;
    flippingRef.current = true;
    setFlipActive(false);
    setFlipAnim({ direction, ...animConfig });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlipActive(true));
    });

    clearFlipTimer();
    flipTimerRef.current = window.setTimeout(() => {
      onComplete();
      setFlipActive(false);
      setFlipAnim(null);
      flippingRef.current = false;
      flipTimerRef.current = null;
    }, FLIP_MS);
  }, []);

  const goNext = useCallback(() => {
    if (!canNext || flippingRef.current) return;
    runFlip(
      'next',
      {
        mode: 'page',
        origin: 'left',
        front: currentPage,
        back: currentPage + 1,
        static: currentPage + 1,
      },
      () => setCurrentPage((p) => p + 1)
    );
  }, [canNext, currentPage, runFlip]);

  const goPrev = useCallback(() => {
    if (!canPrev || flippingRef.current) return;
    runFlip(
      'prev',
      {
        mode: 'page',
        origin: 'right',
        front: currentPage,
        back: currentPage - 1,
        static: currentPage - 1,
      },
      () => setCurrentPage((p) => p - 1)
    );
  }, [canPrev, currentPage, runFlip]);

  const onCornerPointerDown = (corner, e) => {
    dragRef.current = { active: true, startX: e.clientX, corner };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onCornerPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (dragRef.current.corner === 'next' && dx < -DRAG_THRESHOLD) {
      dragRef.current.active = false;
      goNext();
    } else if (dragRef.current.corner === 'prev' && dx > DRAG_THRESHOLD) {
      dragRef.current.active = false;
      goPrev();
    }
  };

  const onCornerPointerUp = (corner, e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.active = false;
    if (Math.abs(dx) < DRAG_THRESHOLD) {
      if (corner === 'next') goNext();
      else goPrev();
    }
  };

  const renderFlipper = () => {
    if (!flipAnim) return null;
    const { direction, front, back, origin } = flipAnim;
    const isRightOrigin = origin === 'right';

    const baseClass = [
      'book-flipper',
      isRightOrigin ? 'from-right' : '',
      flipActive ? 'is-animating' : '',
      flipActive ? (direction === 'next' ? 'is-flipping-next' : 'is-flipping-prev') : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={baseClass} style={{ left: 0, right: 0, width: '100%' }}>
        <div className="book-face book-face--front">
          <BrochurePageByIndex data={data} index={front} />
        </div>
        <div className="book-face book-face--back">
          <BrochurePageByIndex data={data} index={back} />
        </div>
      </div>
    );
  };

  const staticPage =
    isFlipping && flipAnim?.mode === 'page' ? flipAnim.static : currentPage;

  return (
    <div className="book-stage">
      <div className="book-toolbar">
        <span className="book-toolbar-status">
          {currentMeta?.title ?? 'Page'} · {currentPage + 1} of {pageCount}
        </span>
      </div>

      <div className="book-wrapper-outer">
        <button
          type="button"
          className="book-edge-nav book-edge-nav--prev"
          onClick={goPrev}
          disabled={!canPrev || isFlipping}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div className="book-viewport">
          <div className="book-scene">
            <div className="book-page-slot">
              <BrochurePageByIndex data={data} index={staticPage} />
            </div>
            {isFlipping && flipAnim?.mode === 'page' && renderFlipper()}

            {canPrev && (
              <div
                className="book-corner book-corner--prev"
                role="button"
                tabIndex={0}
                aria-label="Previous page"
                onPointerDown={(e) => onCornerPointerDown('prev', e)}
                onPointerMove={onCornerPointerMove}
                onPointerUp={(e) => onCornerPointerUp('prev', e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goPrev();
                  }
                }}
              />
            )}
            {canNext && (
              <div
                className="book-corner book-corner--next"
                role="button"
                tabIndex={0}
                aria-label="Next page"
                onPointerDown={(e) => onCornerPointerDown('next', e)}
                onPointerMove={onCornerPointerMove}
                onPointerUp={(e) => onCornerPointerUp('next', e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goNext();
                  }
                }}
              />
            )}
          </div>
          <p className="book-corner-hint">{pageCount} pages · drag corners or use arrows</p>
        </div>

        <button
          type="button"
          className="book-edge-nav book-edge-nav--next"
          onClick={goNext}
          disabled={!canNext || isFlipping}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default BrochureLivePreview;
