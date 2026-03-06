import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export type ConsentState = 'granted' | 'denied';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  private STORAGE_KEY = 'rrr_cookie_consent';

  getConsent(): ConsentState | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.STORAGE_KEY) as ConsentState;
  }

  hasDecision(): boolean {
    return this.getConsent() !== null;
  }

  accept(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, 'granted');
  }

  reject(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, 'denied');
  }
}