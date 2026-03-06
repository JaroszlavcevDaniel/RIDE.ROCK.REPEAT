import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContentService } from '../../services/content-service';
import { LanguageService } from '../../services/language-service';
import { filter, Observable, Subject } from 'rxjs';
import { Language } from '../../models/language.type';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import firebase from 'firebase/compat/app';
import { isPlatformBrowser, Location } from '@angular/common';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',

})
export class Navbar implements OnInit  {

  private destroy$ = new Subject<void>();
  
  lang: Language = 'hu'; 
  isBrowser = false;
  currentLang: Language;
  content$!: Observable<any>;
  showBackButton = false;
  user: firebase.User | null = null;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private contentService: ContentService,
    private auth: AuthService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.currentLang = this.languageService.getCurrentLang();
    this.content$ = this.contentService.getContent();
    this.auth.user$.subscribe(user => this.user = user);
  
       this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const langFromUrl = event.urlAfterRedirects.split('/')[1];

        if (this.isLanguage(langFromUrl)) {
          this.currentLang = langFromUrl;
          this.showBackButton = event.urlAfterRedirects !== `/${this.currentLang}`;
        }
      });
  }

    goBack(): void {
    this.location.back();
  }

    private isLanguage(value: string): value is Language {
    return value === 'hu' || value === 'en';
  }

    ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.lang = lang;
    });
      this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => this.closeNavbar());
  }

  switchLanguage(lang: Language): void {
    if (lang === this.currentLang) return;

    this.currentLang = lang;
    this.languageService.setLanguage(lang);
    this.router.navigate(['/', lang]);
  }

  login() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.auth.logout();
  }

closeNavbar() {
  if (!isPlatformBrowser(this.platformId)) return;

  import('bootstrap').then(({ Collapse }) => {
    const navbar = document.getElementById('mainNavbar');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

}