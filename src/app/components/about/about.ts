import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content-service';
import { Article } from '../../models/article-model';
import { Language, LanguageService } from '../../services/language-service';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {

  articles: Article[] = [];  
  lang: Language = 'hu';
  private sub = new Subscription();
  isBrowser = false;

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private seo: SeoService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { this.isBrowser = isPlatformBrowser(this.platformId);}

  ngOnInit() {
  
    this.sub.add(
      this.languageService.lang$.subscribe(l => this.lang = l)
    );

    this.sub.add(
      this.contentService.getAbout().subscribe(articles => {
        this.articles = articles;  
      })
    );
    this.updateSeo();
  }

    private updateSeo() {

    if (this.lang === 'hu') {
      this.seo.updateTags({
        title: 'Rólam | Ride.Rock.Repeat',
        description: 'A Ride.Rock.Repeat története, küldetése és világa.',
        keywords: 'motor, zene, történetek',
        type: 'website'
      });
    } else {
      this.seo.updateTags({
        title: 'About me | Ride.Rock.Repeat',
        description: 'The story, mission and world of Ride.Rock.Repeat.',
        keywords: 'motorcycle, music, stories',
        type: 'website'
      });
    }
  }

    ngOnDestroy() {
    this.sub.unsubscribe(); 
  }

}
 