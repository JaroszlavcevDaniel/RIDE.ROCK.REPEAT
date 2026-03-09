import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ConsentService } from '../../services/consent-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: false,
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner implements OnInit {

  visible = false;
   isBrowser = false;

  constructor(
    private consent: ConsentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.visible = !this.consent.hasDecision();
  }

  accept() {
    if (!this.isBrowser) return;
    this.consent.accept();
    this.visible = false;
  }

  reject() {
     if (!this.isBrowser) return;
    this.consent.reject();
    this.visible = false;
  }
}
