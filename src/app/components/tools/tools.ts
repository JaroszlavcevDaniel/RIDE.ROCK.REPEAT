import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from '../../services/language-service';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-tools',
  standalone: false,
  templateUrl: './tools.html',
  styleUrl: './tools.css',
})
export class Tools  implements OnInit {

  lang: Language = 'hu';
  currentLang: Language;
  content$!: Observable<any>;

  constructor(
    private languageService: LanguageService,
    private contentService: ContentService,
    private seo: SeoService
  ) {
   this.currentLang = this.languageService.getCurrentLang();
  }

ngOnInit(): void {
  this.content$ = this.contentService.getContent();

  this.content$.subscribe(data => {
  });
  if (this.lang === 'hu') {
    this.seo.updateTags({
      title: 'Kapcsolat | Ride.Rock.Repeat',
      description: 'Lépj kapcsolatba velünk a Ride.Rock.Repeat oldalon.',
      type: 'website'
    });
  } else {
    this.seo.updateTags({
      title: 'Contact | Ride.Rock.Repeat',
      description: 'Get in touch with us at Ride.Rock.Repeat.',
      type: 'website'
    });
  }
}
}
