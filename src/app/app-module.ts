import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { Stories } from './components/stories/stories';
import { Rides } from './components/rides/rides';
import { Music } from './components/music/music';
import { About } from './components/about/about';
import { Navbar } from './components/navbar/navbar';
import { LanguageSwitch } from './components/language-switch/language-switch';
import { ArticleCard } from './components/article-card/article-card';
import { Footer } from './components/footer/footer';
import { NotFound } from './components/not-found/not-found';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageGuard } from './core/core/guards/language-guard';
import { MainPage } from './components/main-page/main-page';
import { ArticleDetails } from './components/article-details/article-details';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from './environment/environment';

// ✅ USE ONLY COMPAT API (remove modular API imports)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Contact } from './components/contact/contact';
import { ArticleComments } from './components/article-comments/article-comments';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { FavoriteButtonComponent } from './components/favorite-button-component/favorite-button-component';
// import { Favorites } from './components/favorites/favorites';

@NgModule({
  declarations: [
    App,
    Home,
    Stories,
    Rides,
    Music,
    About,
    Navbar,
    LanguageSwitch,
    ArticleCard,
    Footer,
    NotFound,
    MainPage,
    ArticleDetails,
    Contact,
    ArticleComments,
    // FavoriteButtonComponent,
    // Favorites,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
   
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
     

  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideFirestore(() => getFirestore()),
  ],
  bootstrap: [App]
})
export class AppModule { }