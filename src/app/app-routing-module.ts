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
    component: ArticleDetails
  },

  
  {
    path: ':lang',
    component: Home
  },

 
  {
    path: ':lang/about',
    component: About
  },
  {
    path: ':lang/stories',
    component: Stories
  },
  {
    path: ':lang/playlists',
    component: Music
  },
   {
    path: ':lang/contact',
    component: Contact
  },

  {
    path: ':lang/tools',
    component: Tools
  },

    {
    path: ':lang/wildCampMapHu',
    component: WildCampMapHu
  },

     {
    path: ':lang/wildCampMapEn',
    component: WildCampMapEn
  },

    {
    path: ':lang/fuelCalc',
    component: FuelCalc
  },


   {
    path: ':lang/cookieinfo',
    component: CookieInfo
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
