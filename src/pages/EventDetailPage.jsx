import React from 'react';
import PageShell from '../components/PageShell.jsx';

const importImageModules = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, as: 'url' });
const imageMap = Object.fromEntries(
  Object.entries(importImageModules).map(([path, url]) => [path.split('/').pop(), url])
);

const eventMediaMap = {
  'Publicity (Announcement)': {
    images: ['forty days.jpeg', 'IMG-20240205-WA0000.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  'Clean-up Exercise': {
    images: ['IMG-20240207-WA0014.jpg', 'IMG-20240207-WA0015.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  'Football Match (Achiase Nananom vs Afransi Nananom)': {
    images: ['IMG-20240207-WA0016.jpg', '233204549810_status_07c7f209400e470b8b0846643d173a7.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  'Vigil/Candle Procession': {
    images: ['FB_IMG_15745775539032314.jpg', '2316345f-d887-4657-9936-34d203795dd4.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  'Indoor Games': {
    images: ['47c8dda5-f674-4879-b563-d39fb1d88614.jpg', '5a73491a-85c1-4c60-85e4-a380303ec879.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  '40 Days Program': {
    images: ['266066e4-2880-4a2c-aecc-e22700f0d246.jpg', 'c921e0ec-1ed3-4c2f-beed-ee170c9f500e.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  'Football Match (Achiase youth vs Afransi youth)': {
    images: ['cba202db-646f-4cf4-9b54-6c837445cc2d.jpg', 'fa5749fa-fd7b-49ea-89ec-16a6b786682b.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
};

function EventDetailPage({ event, onBack }) {
  if (!event) {
    return (
      <PageShell title="Event Details">
        <div className="empty-state">
          <p>No event selected.</p>
          <button type="button" className="btn-primary" onClick={onBack}>
            Back to Outline
          </button>
        </div>
      </PageShell>
    );
  }

  const media = eventMediaMap[event.activities] || {
    images: ['forty days.jpeg', 'IMG-20240205-WA0000.jpg'],
    video: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  };

  return (
    <PageShell
      title={event.activities}
      subtitle={`${event.date} · ${event.time} · ${event.location}`}
      actions={
        <button type="button" className="btn-back" onClick={onBack}>
          ← Back
        </button>
      }
    >
      <div className="event-detail-grid">
        <div className="event-detail-main">
          <div className="info-card">
            <h2>Event Details</h2>
            <dl className="info-list">
              <div>
                <dt>Lead Coordinator</dt>
                <dd>{event.leadCoordinator}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{event.location}</dd>
              </div>
              <div>
                <dt>Schedule</dt>
                <dd>
                  {event.date} at {event.time}
                </dd>
              </div>
            </dl>
            <p className="info-note">
              Photo highlights and a video preview for this activity are shown below.
            </p>
          </div>

          <div className="event-images">
            {media.images.map((imageName) => (
              <div key={imageName} className="event-image-wrap">
                <img src={imageMap[imageName]} alt={`${event.activities} — ${imageName}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="event-detail-side">
          <div className="info-card">
            <h2>Video Highlights</h2>
            <p className="info-note">Watch a short recap of the activity.</p>
          </div>
          <div className="video-frame">
            <iframe
              src={media.video}
              title={`Video: ${event.activities}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default EventDetailPage;
