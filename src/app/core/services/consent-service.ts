import { Injectable } from '@angular/core';

export type ConsentState = 'granted' | 'denied';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {

  private STORAGE_KEY = 'rrr_cookie_consent';

  getConsent(): ConsentState | null {
    return localStorage.getItem(this.STORAGE_KEY) as ConsentState;
  }

  hasDecision(): boolean {
    return this.getConsent() !== null;
  }

  accept(): void {
    localStorage.setItem(this.STORAGE_KEY, 'granted');
  }

  reject(): void {
    localStorage.setItem(this.STORAGE_KEY, 'denied');
  }
}