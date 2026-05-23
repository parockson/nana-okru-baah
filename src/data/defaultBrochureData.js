import defaultPortrait from '../assets/forty days.jpeg';

const importImageModules = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, as: 'url' });
const assetUrls = Object.values(importImageModules).slice(0, 6);

export const defaultBrochureData = {
  coverHeading: 'A Celebration of Life',
  portraitUrl: defaultPortrait,
  fullName: 'Nana Okru-Baah V',
  epithet: 'Odikro of Gomoa Achiase',
  birthDate: '31st March 1952',
  deathDate: '29th November 2020',
  serviceDate: '28th – 29th May 2026',
  serviceTime: '8:30 AM Daily',
  serviceVenue: 'Gomoa Achiase, Central Region, Ghana',
  orderOfService: [
    { id: '1', time: '9:00 AM', title: 'Opening Prayer & Hymn', presenter: 'Rev. Isaac Mensah' },
    { id: '2', time: '9:30 AM', title: 'Scripture Reading', presenter: 'Family Representative' },
    { id: '3', time: '10:00 AM', title: 'Tributes & Eulogies', presenter: 'Children & Nananom' },
    { id: '4', time: '11:00 AM', title: 'Sermon', presenter: 'Pastor Emmanuel' },
    { id: '5', time: '12:00 PM', title: 'Final Commendation', presenter: 'Chiefs & Elders Council' },
  ],
  biography: `Nana Okru-Baah V was born on 31st March 1952. He was enstooled as the traditional ruler and Odikro of Gomoa Achiase, serving his people with wisdom, visionary leadership, and profound dedication for over four decades.

Following a short illness, Nana peacefully transitioned on 29th November 2020 at the Kasoa Polyclinic. His legacy remains rooted in cultural preservation, community progress, and unwavering integrity.`,
  collageUrls: assetUrls.length ? assetUrls : [defaultPortrait],
  gratitudeNote:
    'The family of the late Nana Okru-Baah V expresses heartfelt gratitude to all who have supported us through prayers, visits, and contributions during this period of mourning. May God richly bless you.',
  intermentDetails: 'Burial at Achiase Family Cemetery · Thursday, 28th May 2026 · 1:00 – 4:00 PM',
  repastAddress: 'Reception at Achiase Palace Grounds & Durbar Grounds following interment.',
};

export function createOrderItem() {
  return {
    id: crypto.randomUUID(),
    time: '',
    title: '',
    presenter: '',
  };
}
