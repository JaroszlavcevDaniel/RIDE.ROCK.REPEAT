// src/prerender-routes.ts
export interface ArticleRoute {
  lang: string;
  slug: string;
}

// Statikus nyelvi oldalak
export const staticRoutes: string[] = [
  '',      // root redirect
  'hu',
  'en',
  'hu/about',
  'en/about',
  'hu/stories',
  'en/stories',
  'hu/playlists',
  'en/playlists',
  'hu/contact',
  'en/contact',
  'hu/tools',
  'en/tools',
  'hu/wildCampMapHu',
  'en/wildCampMapEn',
  'hu/fuelCalc',
  'en/fuelCalc',
  'hu/cookieinfo',
  'en/cookieinfo',
];

// Paraméteres cikkek a prerender-hez
export const articleRoutes: ArticleRoute[] = [
  { lang: 'hu', slug: 'utazasom-magyarorszagon-szlovenian-es-olaszorszagon-keresztul' },
  { lang: 'en', slug: 'my-trip-through-hungary-slovenia-italy' },
  { lang: 'hu', slug: 'nu-metal-playliszt-a-tura-kezdeshez' },
  { lang: 'en', slug: 'nu-metal-playlist-for-tour-start' },
  { lang: 'hu', slug: 'kilenc-biztonsagi-szabaly-amit-mindig-betartom-motorozaskor' },
  { lang: 'en', slug: 'nine-safety-rules-i-always-follow-when-riding' },
  { lang: 'hu', slug: 'miert-zsenialis-otlet-motoros-ponyvat-vinni-motoros-utazasra' },
  { lang: 'en', slug: 'why-bringing-a-motorcycle-cover-on-a-trip-is-a-brilliant-idea' },
  { lang: 'hu', slug: 'miert-erdemes-ket-eso-szettet-vinni-magaddal-egy-motoros-utazasra' },
  { lang: 'en', slug: 'why-its-worth-bringing-two-rain-suits-on-a-motorcycle-trip' },
  { lang: 'hu', slug: 'hogyan-aludhatsz-ingyen-utazas-kozben' },
  { lang: 'en', slug: 'how-can-you-sleep-for-free-while-traveling' },
  { lang: 'hu', slug: 'nagy-utmutato-a-vadkempingezeshez-europa' },
  { lang: 'en', slug: 'ultimate-guide-to-wild-camping-europe' },
  { lang: 'hu', slug: 'nagy-utmutato-a-vadkempingezeshez-balkan&kelet-europa' },
  { lang: 'en', slug: 'ultimate-guide-to-wild-camping-balkans&easterneurope' },
  { lang: 'hu', slug: 'nagy-utmutato-a-vadkempingezeshez-usa&kanada' },
  { lang: 'en', slug: 'ultimate-guide-to-wild-camping-usa&canada' },
  { lang: 'hu', slug: 'hogyan-ellenorzom-es-cserelem-az-olajat-a-motoromon' },
  { lang: 'en', slug: 'how-i-check-and-change-oil' },
  { lang: 'hu', slug: 'top-20-dolog-must-have-nomad-utazasban' },
  { lang: 'en', slug: 'top-20-must-haves-for-nomadic-motorcycle-trip' },
  { lang: 'hu', slug: 'top-10-rock-dal-amit-erdemes-hallgatni-ha-lány-utasod-van' },
  { lang: 'en', slug: 'top-10-rock-songs-to-play-when-you-re-riding-with-a-female-passenger' },
  { lang: 'hu', slug: 'top-10-feel-good-rock-dal-amitol-jobb-lesz-az-ut' },
  { lang: 'en', slug: 'top-10-feel-good-rock-songs-that-make-every-ride-better' },
  { lang: 'hu', slug: 'top-10-igazi-rock-dal-ami-nem-magyarazkodik' },
  { lang: 'en', slug: 'top-10-real-rock-songs-that-don-t-explain-themselves' },
  { lang: 'hu', slug: 'top-10-rock-dal-az-utazas-hangulatahoz' },
  { lang: 'en', slug: 'top-10-rock-songs-to-get-in-the-travel-mood' },
  { lang: 'hu', slug: 'igazi-skandinav-hangulatu-playlist-sotet-erdok-hideg-tavak-kemeny-riffek' },
  { lang: 'en', slug: 'true-scandinavian-atmosphere-playlist-dark-forests-cold-waters-heavy-riffs' },
  { lang: 'hu', slug: 'top-10-progressziv-gothic-metal&rock-dal-motorozashoz' },
  { lang: 'en', slug: 'top-10-progressive-gothic-metal&rock-songs-for-riding' },
  { lang: 'hu', slug: 'ejszakai-utak-es-brit-visszhangok-top-15-brit-rock-dal-motorozashoz' },
  { lang: 'en', slug: 'night-roads-british-echoes-top-15-brit-rock-songs-for-the-ride' },
  // további cikkek...fefe
];