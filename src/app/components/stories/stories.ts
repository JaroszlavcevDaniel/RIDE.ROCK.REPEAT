import { Language, LanguageService } from './../../services/language-service';
import { ContentService } from './../../services/content-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Article } from '../../models/article-model';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-stories',
  standalone: false,
  templateUrl: './stories.html',
  styleUrl: './stories.css',
})
export class Stories implements OnInit, OnDestroy {

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
      this.languageService.lang$.subscribe(l => {
        this.lang = l;
        this.updateSeo();
      })
    );

    // Subscribe to active articles
    this.sub.add(
      this.contentService.getActiveArticles().subscribe(articles => {
        this.articles = articles;  // Now correctly assigns array to array
      })
    );
     this.updateSeo();
  }

   private updateSeo() {
    if (this.lang === 'hu') {
      this.seo.updateTags({
        title: 'Történetek | Ride.Rock.Repeat',
        description: 'Olvasd el a legfrissebb motoros történeteket a Ride.Rock.Repeat oldalán.',
        type: 'website'
      });
    } else {
      this.seo.updateTags({
        title: 'Stories | Ride.Rock.Repeat',
        description: 'Read the latest motorcycling stories on Ride.Rock.Repeat.',
        type: 'website'
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
}
