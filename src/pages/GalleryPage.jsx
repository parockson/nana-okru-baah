import React, { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell.jsx';

const importImageModules = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, as: 'url' });
const galleryImages = Object.entries(importImageModules)
  .map(([path, url]) => ({ path, url }))
  .sort((a, b) => a.path.localeCompare(b.path));

const captionize = (path) => {
  const fileName = path.split('/').pop().replace(/\.[^.]+$/, '');
  return fileName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

function GalleryPage() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const updateScrollButtons = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 16);
    setCanScrollRight(slider.scrollWidth > slider.clientWidth + slider.scrollLeft + 16);
  };

  const scrollGallery = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const offset = Math.round(slider.clientWidth * 0.85);
    const nextPosition = direction === 'next' ? slider.scrollLeft + offset : slider.scrollLeft - offset;
    slider.scrollTo({ left: nextPosition, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <PageShell
      title="Photo Gallery"
      subtitle="Moments from the celebration — scroll or tap an image to enlarge."
    >
      <div className="gallery-controls">
        <button
          type="button"
          className="gallery-nav-btn"
          onClick={() => scrollGallery('prev')}
          disabled={!canScrollLeft}
          aria-label="Scroll gallery back"
        >
          ‹
        </button>
        <span className="gallery-count">{galleryImages.length} photos</span>
        <button
          type="button"
          className="gallery-nav-btn"
          onClick={() => scrollGallery('next')}
          disabled={!canScrollRight}
          aria-label="Scroll gallery forward"
        >
          ›
        </button>
      </div>

      <div
        ref={sliderRef}
        className="gallery-track no-scrollbar"
        onScroll={updateScrollButtons}
        onWheel={(event) => {
          const slider = sliderRef.current;
          if (!slider) return;
          if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
            event.preventDefault();
            slider.scrollBy({ left: event.deltaY, behavior: 'smooth' });
          }
        }}
      >
        {galleryImages.map(({ path, url }) => (
          <figure key={path} className="gallery-card">
            <button
              type="button"
              className="gallery-card-btn"
              onClick={() => setLightbox({ url, caption: captionize(path) })}
              aria-label={`View full size: ${captionize(path)}`}
            >
              <img src={url} alt={captionize(path)} loading="lazy" />
            </button>
            <figcaption className="gallery-caption">{captionize(path)}</figcaption>
          </figure>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.caption}>
          <button type="button" className="lightbox-backdrop" onClick={() => setLightbox(null)} aria-label="Close" />
          <div className="lightbox-panel">
            <button type="button" className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              ×
            </button>
            <img src={lightbox.url} alt={lightbox.caption} />
            <p className="lightbox-caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default GalleryPage;
