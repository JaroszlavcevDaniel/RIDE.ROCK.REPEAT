// src/app/app.routes.server.ts
import { ServerRoute, RenderMode } from '@angular/ssr';
import { staticRoutes, articleRoutes } from '../prerender-routes';

const staticLangParams = ['hu', 'en'];

// Paraméteres statikus nyelvi oldalak
const staticParamRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/about',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/stories',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/playlists',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/contact',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/tools',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/wildCampMapHu',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/wildCampMapEn',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/fuelCalc',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
  {
    path: ':lang/cookieinfo',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => staticLangParams.map(lang => ({ lang }))
  },
];

// Cikkek
const articleServerRoutes: ServerRoute[] = [
  {
    path: ':lang/articles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async (): Promise<Record<string, string>[]> =>
      articleRoutes.map(a => ({ lang: a.lang, slug: a.slug }))
  }
];

// Fallback
const fallbackRoute: ServerRoute = { path: '**', renderMode: RenderMode.Prerender };

export const serverRoutes: ServerRoute[] = [
  ...staticParamRoutes,
  ...articleServerRoutes,
  fallbackRoute
];