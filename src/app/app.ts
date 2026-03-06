import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from './services/language-service';
import { filter } from 'rxjs';
import { Language } from './models/language.type';
import { isPlatformBrowser } from '@angular/common';
declare let gtag: Function; 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Router event SSR-safe Google Analytics
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'page_view', { page_path: event.urlAfterRedirects });
          }
        });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const lang = this.router.url.split('/')[1] as Language;
          if (lang === 'hu' || lang === 'en') {
            this.languageService.setLanguage(lang);
          }
        });
    }
  }
}