import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import PageShell from './components/PageShell.jsx';
import { BrochureBooklet } from './components/brochure/BrochurePageContent.jsx';
import firstImage from './assets/main page/first image.png';

function App() {
  const [splashClosing, setSplashClosing] = useState(false);
  const [splashGone,    setSplashGone]    = useState(false);
  const bookletRef = useRef(null);

  const closeSplash = () => {
    setSplashClosing(true);
    setTimeout(() => setSplashGone(true), 540);
  };

  const handleDownloadPDF = () => {
    const element = bookletRef.current;
    if (!element) return;
    element.classList.add('is-printing');
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: 'Nana_Okru-Baah_V_Memorial_Brochure.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' },
      })
      .save()
      .then(() => element.classList.remove('is-printing'));
  };

  return (
    <div className="app-root">

      {/* ── Splash modal ───────────────────────────────────────────────────── */}
      {!splashGone && (
        <div
          className={`splash-modal ${splashClosing ? 'closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to the Memorial Brochure"
        >
          <div className="splash-overlay" onClick={closeSplash} />
          <div className="splash-panel">
            <button
              className="splash-close"
              onClick={closeSplash}
              aria-label="Close welcome screen"
            >
              ×
            </button>
            <div className="splash-content">
              <img src={firstImage} alt="Nana Okru-Baah V" className="splash-image" />
              <div className="splash-copy">
                <span className="splash-label">In Loving Memory</span>
                <h2>Nana Okru-Baah V</h2>
                <p className="splash-private-name">Felix Kwame Baah Aidoo Rockson</p>
                <p className="splash-title-line">Odikro of Gomoa Achiase</p>
                <p className="splash-dates">31st March 1952 — 29th November 2020</p>
                <button className="splash-enter" onClick={closeSplash}>
                  View Memorial Brochure →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Site header ────────────────────────────────────────────────────── */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-brand">
            <h1 className="site-title">Nana Okru-Baah V</h1>
            <p className="site-subtitle">
              Odikro of Gomoa Achiase · Memorial Brochure · 28th – 29th May 2026
            </p>
          </div>
          <div className="header-controls">
            <button
              type="button"
              className="control-btn control-btn--primary"
              onClick={handleDownloadPDF}
              aria-label="Download memorial brochure as PDF"
            >
              ↓ Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="site-main">
        <div className="booklet-workspace">
          <PageShell
            title="Memorial Brochure"
            subtitle="Nana Okru-Baah V · Odikro of Gomoa Achiase"
            compact
          >
            <div className="booklet-scroll-frame" ref={bookletRef}>
              <BrochureBooklet />
            </div>
          </PageShell>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <p>28th – 29th May 2026 · Gomoa Achiase, Central Region, Ghana</p>
      </footer>
    </div>
  );
}

export default App;
