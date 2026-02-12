import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../models/article-model';
import { Language, LanguageService } from '../../services/language-service';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-music',
  standalone: false,
  templateUrl: './music.html',
  styleUrl: './music.css',
})
export class Music implements OnInit, OnDestroy {

  articles: Article[] = [];  // Array to hold all active articles
  lang: Language = 'hu';
  private sub = new Subscription();

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    // Subscribe to language changes
    this.sub.add(
      this.languageService.lang$.subscribe(l => this.lang = l)
    );

    // Subscribe to active articles
    this.sub.add(
      this.contentService.getActivePlaylists().subscribe(articles => {
        this.articles = articles;  // Now correctly assigns array to array
      })
    );
    this.updateSeo();
  }

   private updateSeo() {
    if (this.lang === 'hu') {
      this.seo.updateTags({
        title: 'Zenei lejátszási listák | Ride.Rock.Repeat',
        description: 'Fedezd fel a legújabb zenei lejátszási listákat a Ride.Rock.Repeat oldalán.',
        type: 'website'
      });
    } else {
      this.seo.updateTags({
        title: 'Music Playlists | Ride.Rock.Repeat',
        description: 'Discover the latest music playlists on Ride.Rock.Repeat.',
        type: 'website'
      });
    }
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
}

