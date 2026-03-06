import { Component, Inject, input, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Article } from '../../models/article-model';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content-service';
import { Language, LanguageService } from '../../services/language-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
export type Lang = 'hu' | 'en';

@Component({
  selector: 'app-article-card',
  standalone: false,
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})

export class ArticleCard implements OnInit {

@Input() article?: Article;
  lang!: Language;
  slug!: string;
   private langSubscription?: Subscription;

    isBrowser = false;
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
    
  ) {this.isBrowser = isPlatformBrowser(this.platformId);}

  ngOnInit(): void {

    this.lang = this.route.snapshot.paramMap.get('lang') as Language;

    this.slug = this.route.snapshot.paramMap.get('slug')!;

    console.log('DETAIL LANG:', this.lang);
    console.log('DETAIL SLUG:', this.slug);

    this.contentService
      .getArticleBySlug(this.slug, this.lang)
      .subscribe(article => {
        console.log('DETAIL ARTICLE:', article);
        this.article = article;
      });
  }

}