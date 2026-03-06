import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-cookie-info',
  standalone: false,
  templateUrl: './cookie-info.html',
  styleUrl: './cookie-info.css',
})
export class CookieInfo {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

scrollToSection(id: string) {
  if (!isPlatformBrowser(this.platformId)) return;

  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

}
