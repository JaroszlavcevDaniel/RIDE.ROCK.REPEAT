import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from '../services/language-service';
import { Observable } from 'rxjs';
import { ContentService } from '../services/content-service';
import { SeoService } from '../services/seo-service';

@Component({
  selector: 'app-fuel-calc',
  standalone: false,
  templateUrl: './fuel-calc.html',
  styleUrl: './fuel-calc.css',
})
export class FuelCalc implements OnInit {

    lang: Language = 'hu';
    currentLang: Language;
    content$!: Observable<any>;

  fuelUsed: number | null = null;
  distance: number | null = null;
  price: number | null = null;

  consumption: number | null = null;
  totalCost: number | null = null;

     constructor(
        private languageService: LanguageService,
        private contentService: ContentService,
        private seo: SeoService
      ) {
       this.currentLang = this.languageService.getCurrentLang();
      }
      
  calculate(): void {

    if (!this.fuelUsed || !this.distance || !this.price) {
      return;
    }

    // liter / 100 km
    this.consumption = (this.fuelUsed / this.distance) * 100;

    // teljes költség
    this.totalCost = this.fuelUsed * this.price;
  }

ngOnInit(): void {
  this.content$ = this.contentService.getContent();

  this.content$.subscribe(data => {
  });
  if (this.lang === 'hu') {
    this.seo.updateTags({
      title: 'Üzemanyag fogyasztás kalkulátor | Ride.Rock.Repeat',
      description: 'Számold meg üzemyanag fogyasztást egyszerüen a Ride.Rock.Repeat oldalon.',
      type: 'website'
    });
  } else {
    this.seo.updateTags({
      title: 'Fuel consumption calculator | Ride.Rock.Repeat',
      description: 'Calculate fuel consumption easily on Ride.Rock.Repeat.',
      type: 'website'
    });
  }
}
    
}
