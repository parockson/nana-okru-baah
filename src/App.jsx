import React, { useRef, useState } from 'react';
import BrochurePage from './pages/BrochurePage.jsx';
import ProgramOutlinePage from './pages/ProgramOutlinePage.jsx';
import FuneralOutlinePage from './pages/FuneralOutlinePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import fortyDaysImage from './assets/forty days.jpeg';

const pageItems = [
  { id: 'brochure', label: 'Brochure', short: 'Brochure' },
  { id: 'outline', label: '40 Days Outline', short: '40 Days' },
  { id: 'funeral', label: 'Funeral Outline', short: 'Funeral' },
  { id: 'gallery', label: 'Gallery', short: 'Gallery' },
];

function App() {
  const brochureRef = useRef(null);
  const [activePage, setActivePage] = useState('brochure');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    window.setTimeout(() => setShowModal(false), 520);
  };

  const navigate = (pageId) => {
    setActivePage(pageId);
    if (pageId !== 'detail') setSelectedEvent(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'outline':
        return (
          <ProgramOutlinePage
            onRowClick={(row) => {
              setSelectedEvent(row);
              setActivePage('detail');
            }}
          />
        );
      case 'funeral':
        return (
          <FuneralOutlinePage
            onRowClick={(row) => {
              setSelectedEvent(row);
              setActivePage('detail');
            }}
          />
        );
      case 'detail':
        return (
          <EventDetailPage
            event={selectedEvent}
            onBack={() =>
              setActivePage(
                selectedEvent?.activities?.includes('Vigil') ||
                  selectedEvent?.activities?.includes('Funeral') ||
                  selectedEvent?.activities?.includes('Burial') ||
                  selectedEvent?.activities?.includes('Prayer')
                  ? 'funeral'
                  : 'outline'
              )
            }
          />
        );
      case 'gallery':
        return <GalleryPage />;
      default:
        return <BrochurePage ref={brochureRef} />;
    }
  };

  const activeNavId = activePage === 'detail'
    ? (selectedEvent?.activities?.match(/Vigil|Funeral|Burial|Prayer|Wake|Interment/i) ? 'funeral' : 'outline')
    : activePage;

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-brand">
            <span className="site-eyebrow">In Loving Memory</span>
            <h1 className="site-title">Nana Okru-Baah V</h1>
            <p className="site-subtitle">Odikro of Gomoa Achiase · 40 Days & Funeral Program</p>
          </div>

          <nav className="site-nav" aria-label="Main navigation">
            {pageItems.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => navigate(page.id)}
                className={`nav-tab ${activeNavId === page.id ? 'nav-tab--active' : ''}`}
                aria-current={activeNavId === page.id ? 'page' : undefined}
              >
                <span className="nav-tab-label">{page.label}</span>
                <span className="nav-tab-short">{page.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div key={activePage} className="page-transition">
          {renderPage()}
        </div>
      </main>

      <footer className="site-footer">
        <p>28th – 29th May 2026 · Gomoa Achiase, Central Region, Ghana</p>
      </footer>

      {showModal && (
        <div className={`splash-modal ${isClosing ? 'closing' : 'visible'}`} role="dialog" aria-modal="true" aria-labelledby="splash-title">
          <div className="splash-overlay" onClick={closeModal} />
          <div className="splash-panel">
            <button type="button" className="splash-close" onClick={closeModal} aria-label="Close welcome dialog">
              ×
            </button>
            <div className="splash-content">
              <img src={fortyDaysImage} alt="40 Days Observation" className="splash-image" />
              <div className="splash-copy">
                <span className="splash-label">40 Days Observation</span>
                <h2 id="splash-title">Welcome to the Celebration</h2>
                <p>
                  Explore the memorial brochure, event schedules, photo gallery, and activity highlights honoring the life of Nana Okru-Baah V.
                </p>
                <button type="button" className="splash-enter" onClick={closeModal}>
                  Enter Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
