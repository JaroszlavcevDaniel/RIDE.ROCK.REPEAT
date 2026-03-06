import fs from 'fs';
import path from 'path';

interface ArticleContainer {
  hu: { slug: string };
  en: { slug: string };
}

interface ContentData {
  articles: ArticleContainer[];
}

// src/prerender-routes.ts
export default async function getPrerenderRoutes() {
  const routes: string[] = [
    '/',
    '/hu',
    '/en',
    '/hu/about',
    '/en/about',
    '/hu/stories',
    '/en/stories',
    '/hu/playlists',
    '/en/playlists',
    '/hu/contact',
    '/en/contact',

    // cikkek
    '/hu/articles/utazasom-magyarorszagon-szlovenian-es-olaszorszagon-keresztul',
    '/en/articles/my-trip-through-hungary-slovenia-italy',
    '/hu/articles/kilenc-biztonsagi-szabaly-amit-mindig-betartom-motorozaskor',
    '/en/articles/nine-safety-rules-i-always-follow-when-riding',
    '/hu/articles/miert-zsenialis-otlet-motoros-ponyvat-vinni-motoros-utazasra',
    '/en/articles/why-bringing-a-motorcycle-cover-on-a-trip-is-a-brilliant-idea',
    '/hu/articles/miert-erdemes-ket-eso-szettet-vinni-magaddal-egy-motoros-utazasra',
    '/en/articles/why-its-worth-bringing-two-rain-suits-on-a-motorcycle-trip',
    '/hu/articles/hogyan-aludhatsz-ingyen-utazas-kozben',
    '/en/articles/how-can-you-sleep-for-free-while-traveling',
    '/hu/articles/nagy-utmutato-a-vadkempingezeshez-europa',
    '/en/articles/ultimate-guide-to-wild-camping-europe',
    '/hu/articles/nagy-utmutato-a-vadkempingezeshez-balkan&kelet-europa',
    '/en/articles/ultimate-guide-to-wild-camping-balkans&easterneurope',
    '/hu/articles/nagy-utmutato-a-vadkempingezeshez-usa&kanada',
    '/en/articles/ultimate-guide-to-wild-camping-usa&canada',
    '/hu/articles/hogyan-ellenorzom-es-cserelem-az-olajat-a-motoromon',
    '/en/articles/how-i-check-and-change-oil',
    '/hu/articles/top-20-dolog-must-have-nomad-utazasban',
    '/en/articles/top-20-must-haves-for-nomadic-motorcycle-trip',
    '/hu/articles/nu-metal-playliszt-a-tura-kezdeshez',
    '/en/articles/top-10-rock-songs-to-play-when-you-re-riding-with-a-female-passenger',
    '/en/articles/top-10-feel-good-rock-songs-that-make-every-ride-better',
    '/en/articles/top-10-real-rock-songs-that-don-t-explain-themselves',
    '/en/articles/top-10-rock-songs-to-get-in-the-travel-mood',
    '/en/articles/true-scandinavian-atmosphere-playlist-dark-forests-cold-waters-heavy-riffs',
    '/en/articles/top-10-progressive-gothic-metal&rock-songs-for-riding',
    '/en/articles/night-roads-british-echoes-top-15-british-rock-songs-for-the-ride',
    '/en/articles/nu-metal-playlist-for-tour-start'
  ];

  return routes;
}