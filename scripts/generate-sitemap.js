const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const baseUrl = 'https://ride-rock-repeat.hu'; 
const outputDir = path.join(__dirname, '../public_html'); // közvetlen webroot
const sitemapFile = path.join(outputDir, 'sitemap.xml');

// --- LISTA A CIKKEKRŐL / OLDALAKRÓL ---
const pages = [
  { url: 'hu', lastmod: '2026-03-11' }, 
  { url: 'en', lastmod: '2026-03-11' },
  { url: 'hu/about', lastmod: '2026-03-11' },
  { url: 'en/about', lastmod: '2026-03-11' },
  { url: 'hu/stories', lastmod: '2026-03-11' },
  { url: 'en/stories', lastmod: '2026-03-11' },
  { url: 'en/playlists', lastmod: '2026-03-11' },
  { url: 'hu/playlists', lastmod: '2026-03-11' },
  { url: 'hu/contact', lastmod: '2026-03-11' },
  { url: 'en/contact', lastmod: '2026-03-11' },
  // … a többi oldal ...

   {  url: 'hu/articles/utazasom-magyarorszagon-szlovenian-es-olaszorszagon-keresztul', lastmod: '2026-03-11'  },
  { url: 'en/articles/my-trip-through-hungary-slovenia-italy', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/nu-metal-playliszt-a-tura-kezdeshez', lastmod: '2026-03-11'  },
  {  url: 'en/articles/nu-metal-playlist-for-tour-start', lastmod: '2026-03-11'  },
  { url: 'hu/articles/kilenc-biztonsagi-szabaly-amit-mindig-betartom-motorozaskor', lastmod: '2026-03-11'  },
  {  url: 'en/articles/nine-safety-rules-i-always-follow-when-riding', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/miert-zsenialis-otlet-motoros-ponyvat-vinni-motoros-utazasra', lastmod: '2026-03-11'  },
  {  url: 'en/articles/why-bringing-a-motorcycle-cover-on-a-trip-is-a-brilliant-idea', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/miert-erdemes-ket-eso-szettet-vinni-magaddal-egy-motoros-utazasra', lastmod: '2026-03-11'  },
  {  url: 'en/articles/why-its-worth-bringing-two-rain-suits-on-a-motorcycle-trip', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/hogyan-aludhatsz-ingyen-utazas-kozben', lastmod: '2026-03-11'  },
  {  url: 'en/articles/how-can-you-sleep-for-free-while-traveling', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/nagy-utmutato-a-vadkempingezeshez-europa', lastmod: '2026-03-11'  },
  {  url: 'en/articles/ultimate-guide-to-wild-camping-europe', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/nagy-utmutato-a-vadkempingezeshez-balkan&kelet-europa', lastmod: '2026-03-11'  },
  {  url: 'en/articles/ultimate-guide-to-wild-camping-balkans&easterneurope', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/nagy-utmutato-a-vadkempingezeshez-usa&kanada', lastmod: '2026-03-11'  },
  {  url: 'en/articles/ultimate-guide-to-wild-camping-usa&canada', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/hogyan-ellenorzom-es-cserelem-az-olajat-a-motoromon', lastmod: '2026-03-11'  },
  {  url: 'en/articles/how-i-check-and-change-oil', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-20-dolog-must-have-nomad-utazasban', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-20-must-haves-for-nomadic-motorcycle-trip', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-10-rock-dal-amit-erdemes-hallgatni-ha-lány-utasod-van', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-10-rock-songs-to-play-when-you-re-riding-with-a-female-passenger', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-10-feel-good-rock-dal-amitol-jobb-lesz-az-ut', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-10-feel-good-rock-songs-that-make-every-ride-better', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-10-igazi-rock-dal-ami-nem-magyarazkodik', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-10-real-rock-songs-that-don-t-explain-themselves', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-10-rock-dal-az-utazas-hangulatahoz', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-10-rock-songs-to-get-in-the-travel-mood', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/igazi-skandinav-hangulatu-playlist-sotet-erdok-hideg-tavak-kemeny-riffek', lastmod: '2026-03-11'  },
  {  url: 'en/articles/true-scandinavian-atmosphere-playlist-dark-forests-cold-waters-heavy-riffs', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/top-10-progressziv-gothic-metal&rock-dal-motorozashoz', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-10-progressive-gothic-metal&rock-songs-for-riding', lastmod: '2026-03-11'  },
  { url: 'hu/articles/ejszakai-utak-es-brit-visszhangok-top-15-brit-rock-dal-motorozashoz', lastmod: '2026-03-11'  },
  {  url: 'en/articles/night-roads-british-echoes-top-15-brit-rock-songs-for-the-ride', lastmod: '2026-03-11'  },
  {  url: 'hu/articles/milyen-motoros-kesztyut-erdemes-venni', lastmod: '2026-03-11'  },
  {  url: 'en/articles/what-motorcycle-gloves-should-you-buy', lastmod: '2026-03-11'  },
   {  url: 'hu/articles/nem-indul-a-motor-amit-en-ilyenkor-vegignezek-az-ut-szelen', lastmod: '2026-03-11'  },
  {  url: 'en/articles/the-motorcycle-wont-start–what-i-usually-check-on-the-side-of-the-road', lastmod: '2026-03-11'  },
   {  url: 'hu/articles/milyen-motort-erdemes-elsonek-valasztani-oszinte-gondolatok-kezdo-motorosoknak', lastmod: '2026-03-11'  },
  { url: 'en/articles/what-type-of-motorcycle-should-you-choose-as-your-first-one', lastmod: '2026-03-11'  },
    {  url: 'hu/articles/top-15-francia-rock-dal', lastmod: '2026-03-11'  },
  {  url: 'en/articles/top-15-french-rock-songs', lastmod: '2026-03-11'  },
    { url: 'hu/articles/top-15-magyar-rock-dal-ami-elvisz-messzire-meg-ugy-is-hogyha-itthon-maradok', lastmod: '2026-03-11'  },
  { url: 'en/articles/top-15-hungarian-rock-songs-that-will-take-you-far-even-if-you-stay-at-home', lastmod: '2026-03-11'  },
    {  url: 'hu/articles/10-eldugott-es-hangulatos-motoros-hely-magyarorszagon', lastmod: '2026-03-11'  },
  {  url: 'en/articles/10-secluded-and-cosy-motorcycle-spots-in-hungary', lastmod: '2026-03-11'  },

];

// --- ESCAPE FUNKCIÓ ---
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/–/g, "-"); // hosszú kötőjel cseréje simára
}

// --- GENERÁLÁS ---
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
  const fullUrl = `${baseUrl}/${page.url}`;
  const safeUrl = escapeXml(fullUrl);

  sitemap += `  <url>\n`;
  sitemap += `    <loc>${safeUrl}</loc>\n`;
  sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>\n`;

// --- MENTÉS ---
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(sitemapFile, sitemap, { encoding: 'utf8' });
console.log('Sitemap sikeresen generálva: ' + sitemapFile);

