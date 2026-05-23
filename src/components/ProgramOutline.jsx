import React from 'react';

const outlineRows = [
  {
    date: 'Monday, 18 May 2026 - Thursday, 29 May 2026',
    time: 'MORNING & EVENING',
    activities: 'PUBLICITY (ANNOUNCEMENT)',
    location: 'ACHI A SE TOWNSHIP',
    principalActors: 'P.A SYSTEMS',
    requiredResource: 'P.A SYSTEMS',
    leadCoordinator: 'OCQUAYE',
    remarks: '',
  },
  {
    date: 'Thursday, 28 May 2026',
    time: '8:00 - 10:00 am',
    activities: 'CLEAN-UP EXERCISE',
    location: 'ACHI A SE TOWNSHIP',
    principalActors: 'CHILDREN, FAMILY, NANANOM, GENERAL PUBLIC, ETC',
    requiredResource: 'MACHETE, BROOMS, HOES, SHOVELS, RUBBISH COLLECTORS, ETC',
    leadCoordinator: 'ABEIku',
    remarks: '',
  },
  {
    date: 'Thursday, 28 May 2026',
    time: '3:00 - 5:00 pm',
    activities: 'FOOTBALL MATCH BETWEEN ACHIASE NANANOM AND AFRANSI NANANOM',
    location: 'ACHI A SE COMMUNITY PARK',
    principalActors: 'ACHI A SE NANANOM VRS AFRANSI NANANOM',
    requiredResource: 'CHAIRS, BOTTLED WATER, DRINKS FOR REFRESHMENT, FOOTBALL',
    leadCoordinator: 'FIIFI',
    remarks: '',
  },
  {
    date: 'Thursday, 28 May 2026',
    time: '7:00 - 10:00 pm',
    activities: 'VIGIL/CANDLE PROCESSION NIGHT',
    location: 'PRINCIPAL STREETS OF ACHIASE, BESEADZE, AFRANSI & OBUASE',
    principalActors: 'CHILDREN, FAMILY, NANANOM, GENERAL PUBLIC, ETC',
    requiredResource: 'P.A SYSTEMS, WATER, SECURITY, BRANDED PARAPHERNALIA, ETC',
    leadCoordinator: 'ATO & SAMMY',
    remarks: '',
  },
  {
    date: 'Thursday, 28 May 2026',
    time: '10:00 - TDB',
    activities: 'INDOOR GAMES',
    location: 'ACHI A SE PALACE',
    principalActors: 'CHILDREN, FAMILY, NANANOM, GENERAL PUBLIC, ETC',
    requiredResource: 'DRAUGHT, PLAYING CARDS, LUDO, OWARE, ETC',
    leadCoordinator: 'YAW ALEX',
    remarks: '',
  },
  {
    date: 'Friday, 29 May 2026',
    time: '9:00 am - 2:00 pm',
    activities: '40 DAYS PROGRAM',
    location: 'DURBAR GROUNDS',
    principalActors: 'CHILDREN, FAMILY, NANANOM, GENERAL PUBLIC, ETC',
    requiredResource: 'DECO, CHAIRS, WATER, FOOD, ALCOHOLIC & NON ALCOHOLIC DRINKS, P.A SYSTEM, MC, KEY ACTORS, ETC',
    leadCoordinator: 'FIIFI, ATO, SAMMY, AMPOMAH, RITA, NANA KWAME & OCQUAYE',
    remarks: '',
  },
  {
    date: 'Friday, 29 May 2026',
    time: '3:00 - 5:00 pm',
    activities: 'FOOTBALL MATCH BETWEEN ACHIASE YOUTH AND AFRANSI YOUTH',
    location: 'ACHI A SE COMMUNITY PARK',
    principalActors: 'ACHI A SE YOUTH VRS AFRANSI YOUTH',
    requiredResource: 'CHAIRS, BOTTLED WATER, DRINKS FOR REFRESHMENT, FOOTBALL',
    leadCoordinator: 'ABEIku & OCQUAYE',
    remarks: '',
  },
];

function ProgramOutline() {
  return (
    <section className="w-full max-w-[210mm] mt-10 bg-neutral-800 p-5 rounded-lg border border-amber-500/20 shadow-xl">
      <div className="mb-5">
        <h2 className="text-xl text-amber-500 font-bold tracking-wide mb-1">40 Days Program Outline</h2>
        <p className="text-sm text-neutral-400">Detailed schedule and coordination plan for the 40 days celebration events.</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-neutral-700 bg-neutral-950/80">
        <table className="min-w-full border-collapse text-left text-[11px] sm:text-sm">
          <thead className="bg-neutral-900 text-neutral-100">
            <tr>
              <th className="px-3 py-3 border-b border-neutral-700">DATE</th>
              <th className="px-3 py-3 border-b border-neutral-700">TIME</th>
              <th className="px-3 py-3 border-b border-neutral-700">ACTIVITIES</th>
              <th className="px-3 py-3 border-b border-neutral-700">LOCATION</th>
              <th className="px-3 py-3 border-b border-neutral-700">PRINCIPAL ACTORS</th>
              <th className="px-3 py-3 border-b border-neutral-700">REQUIRED RESOURCE</th>
              <th className="px-3 py-3 border-b border-neutral-700">LEAD COORDINATOR</th>
              <th className="px-3 py-3 border-b border-neutral-700">REMARKS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {outlineRows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-neutral-950/90' : 'bg-neutral-900/90'}>
                <td className="px-3 py-3 align-top text-neutral-200">{row.date}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.time}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.activities}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.location}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.principalActors}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.requiredResource}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.leadCoordinator}</td>
                <td className="px-3 py-3 align-top text-neutral-200">{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProgramOutline;
