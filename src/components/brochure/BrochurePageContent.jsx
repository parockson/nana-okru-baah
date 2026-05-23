import React, { useMemo } from 'react';
import { buildBrochurePages } from '../../utils/buildBrochurePages.js';

function formatPageRange(entry) {
  if (entry.endPage && entry.endPage > entry.page) {
    return `${entry.page}–${entry.endPage}`;
  }
  return String(entry.page);
}

export function PageCover({ data }) {
  return (
    <div className="brochure-sheet brochure-sheet--dark bp-cover">
      <p className="bp-cover-eyebrow">{data.coverHeading}</p>
      {data.portraitUrl ? (
        <img src={data.portraitUrl} alt="" className="bp-portrait" />
      ) : (
        <div className="bp-portrait bp-portrait--placeholder">Portrait</div>
      )}
      <div className="bp-cover-text">
        <h2 className="bp-name">{data.fullName}</h2>
        {data.epithet && <p className="bp-epithet">{data.epithet}</p>}
        <p className="bp-life-dates">
          {data.birthDate} — {data.deathDate}
        </p>
      </div>
      <div className="bp-service-block">
        <p>{data.serviceVenue}</p>
        <p>
          {data.serviceDate} · {data.serviceTime}
        </p>
      </div>
    </div>
  );
}

export function PageToc({ data, page }) {
  return (
    <div className="brochure-sheet">
      <h3 className="bp-section-title">Table of Contents</h3>
      <ol className="bp-toc-list">
        {(page.tocEntries || []).map((entry) => (
          <li key={entry.label} className="bp-toc-item">
            <span className="bp-toc-label">{entry.label}</span>
            <span className="bp-toc-dots" aria-hidden="true" />
            <span className="bp-toc-page">{formatPageRange(entry)}</span>
          </li>
        ))}
      </ol>
      <p className="bp-toc-note">Turn the page to continue →</p>
    </div>
  );
}

export function PageOrder({ data, page }) {
  return (
    <div className="brochure-sheet">
      <h3 className="bp-section-title">
        Order of Service
        {page.totalParts > 1 && <span className="bp-part"> ({page.part}/{page.totalParts})</span>}
      </h3>
      <div className="bp-timeline">
        {page.items.map((item) => (
          <div key={item.id} className="bp-timeline-row">
            <span className="bp-timeline-time">{item.time || '—'}</span>
            <span className="bp-timeline-leader">{item.title || '—'}</span>
            <span className="bp-timeline-presenter">{item.presenter || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageTribute({ data, page }) {
  return (
    <div className="brochure-sheet">
      <h3 className="bp-section-title">
        Life Tribute
        {page.totalParts > 1 && <span className="bp-part"> ({page.part}/{page.totalParts})</span>}
      </h3>
      <div className="bp-bio-flow">
        {page.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

export function PageGallery({ data, page }) {
  return (
    <div className="brochure-sheet">
      <h3 className="bp-section-title">
        Family Memories
        {page.totalParts > 1 && <span className="bp-part"> ({page.part}/{page.totalParts})</span>}
      </h3>
      <div className={`bp-collage bp-collage--${Math.min(page.urls.length, 4)}`}>
        {page.urls.map((url, i) => (
          <img key={`${url}-${i}`} src={url} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export function PageGratitude({ data }) {
  return (
    <div className="brochure-sheet">
      <h3 className="bp-section-title bp-section-title--center">Words of Gratitude</h3>
      <p className="bp-gratitude-only">{data.gratitudeNote}</p>
    </div>
  );
}

export function PageBack({ data }) {
  return (
    <div className="brochure-sheet">
      <div className="bp-back">
        <h3 className="bp-section-title bp-section-title--center">Final Details</h3>
        <div className="bp-back-sections">
          <div className="bp-back-box">
            <strong>Interment / Burial</strong>
            <span>{data.intermentDetails}</span>
          </div>
          <div className="bp-back-box">
            <strong>Repast / Reception</strong>
            <span>{data.repastAddress}</span>
          </div>
        </div>
        <p className="bp-back-footer">{data.fullName} · {data.serviceDate}</p>
      </div>
    </div>
  );
}

function renderPage(data, page) {
  switch (page.type) {
    case 'cover':
      return <PageCover data={data} />;
    case 'toc':
      return <PageToc data={data} page={page} />;
    case 'order':
      return <PageOrder data={data} page={page} />;
    case 'tribute':
      return <PageTribute data={data} page={page} />;
    case 'gallery':
      return <PageGallery data={data} page={page} />;
    case 'gratitude':
      return <PageGratitude data={data} />;
    case 'back':
      return <PageBack data={data} />;
    default:
      return <PageCover data={data} />;
  }
}

export function BrochurePageByIndex({ data, index }) {
  const pages = useMemo(() => buildBrochurePages(data), [data]);
  const page = pages[index];
  if (!page) return null;
  return renderPage(data, page);
}

export function BrochurePrintFlat({ data }) {
  const pages = buildBrochurePages(data);
  return (
    <div className="brochure-print-flat" aria-hidden="true">
      {pages.map((p) => (
        <div key={p.id}>{renderPage(data, p)}</div>
      ))}
    </div>
  );
}

export { buildBrochurePages };
