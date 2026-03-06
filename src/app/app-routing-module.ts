import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ArticleCard } from './components/article-card/article-card';
import { Stories } from './components/stories/stories';
import { Music } from './components/music/music';
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';
import { LanguageGuard } from './core/core/guards/language-guard';
import { ArticleDetails } from './components/article-details/article-details';
import { Contact } from './components/contact/contact';
import { CookieInfo } from './components/cookie-info/cookie-info';
import { Tools } from './components/tools/tools';
import { WildCampMapHu } from './wild-camp-map-hu/wild-camp-map-hu';
import { WildCampMapEn } from './wild-camp-map-en/wild-camp-map-en';
import { FuelCalc } from './fuel-calc/fuel-calc';

const routes: Routes = [

  {
    path: ':lang/articles/:slug',
    component: ArticleDetails, data: { renderMode: 'static' } 
  },

  
  {
    path: ':lang',
    component: Home, data: { renderMode: 'static' } 
  },

 
  {
    path: ':lang/about',
    component: About, data: { renderMode: 'static' } 
  },
  {
    path: ':lang/stories',
    component: Stories, data: { renderMode: 'static' } 
  },
  {
    path: ':lang/playlists',
    component: Music, data: { renderMode: 'static' } 
  },
   {
    path: ':lang/contact',
    component: Contact, data: { renderMode: 'static' } 
  },

  {
    path: ':lang/tools', component: Tools, data: { renderMode: 'static' } 
  },

    {
    path: ':lang/wildCampMapHu',
    component: WildCampMapHu, data: { renderMode: 'static' } 
  },

     {
    path: ':lang/wildCampMapEn',
    component: WildCampMapEn, data: { renderMode: 'static' } 
  },

    {
    path: ':lang/fuelCalc',
    component: FuelCalc, data: { renderMode: 'static' } 
  },


   {
    path: ':lang/cookieinfo',
    component: CookieInfo, data: { renderMode: 'static' } 
  },


  {
    path: '',
    redirectTo: 'hu',
    pathMatch: 'full'
  },

// 404
  {
    path: '**',
    redirectTo: 'hu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
