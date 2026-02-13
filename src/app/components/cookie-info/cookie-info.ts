import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-info',
  standalone: false,
  templateUrl: './cookie-info.html',
  styleUrl: './cookie-info.css',
})
export class CookieInfo {

  scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

}
