import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../models/article-model';
import { Lang } from '../article-card/article-card';
import { ContentService } from '../../services/content-service';
import { Language, LanguageService } from '../../services/language-service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo-service';
import { SoundService } from '../../services/sound-service';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})

export class MainPage implements OnInit, OnDestroy {

  featuredArticle?: Article;
  featuredPlaylist?: Article;
  lang: Language = 'hu';
  private sub = new Subscription()

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private seo: SeoService,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    this.sub.add(
      this.languageService.lang$.subscribe(l => this.lang = l)
    );

    this.sub.add(
      this.contentService.getFeaturedArticle().subscribe(a => {
        this.featuredArticle = a;
      })
    );
     this.sub.add(
      this.contentService.getFeaturedPlaylist().subscribe(a => {
        this.featuredPlaylist = a;
      })
    );
        this.updateSeo();
  }

  private updateSeo() {
    if (this.lang === 'hu') {
      this.seo.updateTags({
        title: 'Ride.Rock.Repeat – Motor, zene, történetek',
        description: 'Fedezd fel a legfrissebb motoros kalandokat, zenéket és történeteket a Ride.Rock.Repeat oldalán.',
        type: 'website'
      });
    } else {
      this.seo.updateTags({
        title: 'Ride.Rock.Repeat – Motorcycle, Music, Stories',
        description: 'Discover the latest motorcycling adventures, music, and stories on Ride.Rock.Repeat.',
        type: 'website'
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }

  onClick() {
    this.soundService.playClickTwo();
  }
}