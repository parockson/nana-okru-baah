import React from 'react';

function formatDateCell(value) {
  const [day, ...rest] = value.split(' ');
  return (
    <div className="cell-stack">
      <span className="cell-label">{day}</span>
      <span className="cell-value">{rest.join(' ')}</span>
    </div>
  );
}

function formatTimeCell(value) {
  const separators = [' - ', '-', ' – ', '—', '&', ' to ', ' onwards'];
  let start = value;
  let end = '';

  for (const separator of separators) {
    if (value.includes(separator)) {
      [start, end] = value.split(separator).map((part) => part.trim());
      if (end) break;
    }
  }

  return (
    <div className="cell-stack">
      <span className="cell-value">{start}</span>
      <span className="cell-meta">{end || 'End TBD'}</span>
    </div>
  );
}

function renderBulleted(value) {
  const items = value.split(/\s*[,;&]\s*|\s+and\s+/i).filter(Boolean);
  return (
    <ul className="cell-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function OutlineTable({ rows, onRowClick, hint = 'Click any row to view photos and video highlights.' }) {
  return (
    <>
      <p className="table-hint">{hint}</p>
      <div className="table-wrap">
        <table className="adinkra-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Activities</th>
              <th>Location</th>
              <th>Lead Coordinator</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onRowClick?.(row);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${row.activities}`}
              >
                <td data-label="Date">{formatDateCell(row.date)}</td>
                <td data-label="Time">{formatTimeCell(row.time)}</td>
                <td data-label="Activities">{renderBulleted(row.activities)}</td>
                <td data-label="Location">{row.location}</td>
                <td data-label="Lead">{renderBulleted(row.leadCoordinator)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OutlineTable;
