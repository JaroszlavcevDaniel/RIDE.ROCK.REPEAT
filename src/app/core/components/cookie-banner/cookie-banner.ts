import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../../services/consent-service';

@Component({
  selector: 'app-cookie-banner',
  standalone: false,
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner implements OnInit {

  visible = false;

  constructor(private consent: ConsentService) {}

  ngOnInit(): void {
    this.visible = !this.consent.hasDecision();
  }

  accept() {
    this.consent.accept();
    this.visible = false;
  }

  reject() {
    this.consent.reject();
    this.visible = false;
  }
}
