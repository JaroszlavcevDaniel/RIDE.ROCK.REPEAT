import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Article } from '../../models/article-model';
import { Language, LanguageService } from '../../services/language-service';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { SeoService } from '../../services/seo-service';
import { SoundService } from '../../services/sound-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-music',
  standalone: false,
  templateUrl: './music.html',
  styleUrl: './music.css',
})
export class Music implements OnInit, OnDestroy {

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
      this.languageService.lang$.subscribe(l => this.lang = l)
    );

    this.sub.add(
      this.contentService.getActivePlaylists().subscribe(articles => {
        this.articles = articles;  
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

    onClick() {
    this.soundService.playClickTwo();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
}

