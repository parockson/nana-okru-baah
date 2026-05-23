import React from 'react';
import PageShell from '../components/PageShell.jsx';
import OutlineTable from '../components/OutlineTable.jsx';

const funeralRows = [
  {
    date: 'Mon 18 May 2026 - Thu 28 May 2026',
    time: 'Daily',
    activities: 'Home Mourning & Reception',
    location: 'Family Residence',
    leadCoordinator: 'Family Committee',
  },
  {
    date: 'Wed 27 May 2026',
    time: '6:00-9:00 pm',
    activities: 'Prayer & Hymn Session',
    location: 'Community Hall',
    leadCoordinator: 'Rev. Isaac Mensah',
  },
  {
    date: 'Thu 28 May 2026',
    time: '9:00 am - 12:00 pm',
    activities: 'Funeral Service & Sermon',
    location: 'Achiase Community Church',
    leadCoordinator: 'Pastor Emmanuel & Family',
  },
  {
    date: 'Thu 28 May 2026',
    time: '1:00-4:00 pm',
    activities: 'Burial & Interment Ceremony',
    location: 'Achiase Family Cemetery',
    leadCoordinator: 'Chiefs & Elders Council',
  },
  {
    date: 'Thu 28 May 2026',
    time: '5:00-8:00 pm',
    activities: 'Wake Keeping & Thanksgiving',
    location: 'Achiase Palace Grounds',
    leadCoordinator: 'Funeral Committee',
  },
  {
    date: 'Fri 29 May 2026',
    time: '10:00 am onwards',
    activities: 'Final Reception & Send-Off',
    location: 'Durbar Grounds',
    leadCoordinator: 'All Coordinators',
  },
];

function FuneralOutlinePage({ onRowClick }) {
  return (
    <PageShell
      title="Funeral Outline"
      subtitle="Ceremonies, services, and coordination for the funeral program."
    >
      <OutlineTable
        rows={funeralRows}
        onRowClick={onRowClick}
        hint="Select a row to view photos and reflections for that ceremony."
      />
    </PageShell>
  );
}

export default FuneralOutlinePage;
