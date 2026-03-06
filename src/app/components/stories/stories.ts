import { Language, LanguageService } from './../../services/language-service';
import { ContentService } from './../../services/content-service';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Article } from '../../models/article-model';
import { SeoService } from '../../services/seo-service';
import { SoundService } from '../../services/sound-service';

@Component({
  selector: 'app-stories',
  standalone: false,
  templateUrl: './stories.html',
  styleUrl: './stories.css',
})
export class Stories implements OnInit, OnDestroy {

  articles: Article[] = []; 
  lang: Language = 'hu';
  private sub = new Subscription();
  isBrowser = false;

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private seo: SeoService,
    private soundService: SoundService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {this.isBrowser = isPlatformBrowser(this.platformId)}

  ngOnInit() {
    this.sub.add(
      this.languageService.lang$.subscribe(l => {
        this.lang = l;
        this.updateSeo();
      })
    );

    this.sub.add(
      this.contentService.getActiveArticles().subscribe(articles => {
        this.articles = articles;  
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

    onClick() {
    this.soundService.playClickTwo();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
}
