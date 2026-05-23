import React from 'react';
import PageShell from '../components/PageShell.jsx';
import OutlineTable from '../components/OutlineTable.jsx';

const outlineRows = [
  {
    date: 'Mon 18 May 2026 - Thu 29 May 2026',
    time: 'Morning & Evening',
    activities: 'Publicity (Announcement)',
    location: 'Achiase Township',
    leadCoordinator: 'Ocquaye',
  },
  {
    date: 'Thu 28 May 2026',
    time: '8:00-10:00 am',
    activities: 'Clean-up Exercise',
    location: 'Achiase Township',
    leadCoordinator: 'Abeiku',
  },
  {
    date: 'Thu 28 May 2026',
    time: '3:00-5:00 pm',
    activities: 'Football Match (Achiase Nananom vs Afransi Nananom)',
    location: 'Achiase Community Park',
    leadCoordinator: 'Fiifi',
  },
  {
    date: 'Thu 28 May 2026',
    time: '7:00-10:00 pm',
    activities: 'Vigil/Candle Procession',
    location: 'Principal streets of Achiase, Beseadze, Afransi & Obuase',
    leadCoordinator: 'Ato & Sammy',
  },
  {
    date: 'Thu 28 May 2026',
    time: '10:00 pm - TBD',
    activities: 'Indoor Games',
    location: 'Achiase Palace',
    leadCoordinator: 'Yaw Alex',
  },
  {
    date: 'Fri 29 May 2026',
    time: '9:00 am - 2:00 pm',
    activities: '40 Days Program',
    location: 'Durbar Grounds',
    leadCoordinator: 'Fiifi, Ato, Sammy, Ampomah, Rita, Nana Kwame & Ocquaye',
  },
  {
    date: 'Fri 29 May 2026',
    time: '3:00-5:00 pm',
    activities: 'Football Match (Achiase youth vs Afransi youth)',
    location: 'Achiase Community Park',
    leadCoordinator: 'Abeiku & Ocquaye',
  },
];

function ProgramOutlinePage({ onRowClick }) {
  return (
    <PageShell
      title="40 Days Outline"
      subtitle="Schedule of activities during the 40 days observation."
    >
      <OutlineTable
        rows={outlineRows}
        onRowClick={onRowClick}
        hint="Select a row to view photos and video highlights for that activity."
      />
    </PageShell>
  );
}

export default ProgramOutlinePage;
