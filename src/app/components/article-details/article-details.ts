import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../models/article-model';
import { Language, LanguageService } from '../../services/language-service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content-service';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../services/auth-service';
import { combineLatest, Subscription, switchMap } from 'rxjs';
import { CommentService } from '../../services/comment-service';
import { SeoService } from '../../services/seo-service';


@Component({
  selector: 'app-article-details',
  standalone: false,
  templateUrl: './article-details.html',
  styleUrl: './article-details.css',
})
export class ArticleDetails implements OnInit, OnDestroy {
  article: any;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private languageService: LanguageService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.route.paramMap,
      this.languageService.lang$ 
    ]).pipe(
      switchMap(([params, lang]) => {
        const slug = params.get('slug')!;
        return this.contentService.getArticleBySlug(slug, lang as 'hu' | 'en');
      })
    ).subscribe(article => {
      this.article = article;

      this.updateSeo();
    });
  }

    private updateSeo(): void {

    if (!this.article) return;

    this.seo.updateTags({
      title: this.article.title + ' | Ride.Rock.Repeat',
      description: this.article.description,
      image: this.article.image,
      type: 'article'
    });

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}