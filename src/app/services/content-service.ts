import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LanguageService } from './language-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentData } from '../models/content.model';
import { Article } from '../models/article-model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private CONTENT_URL = 'content/content.json';
  private content$: Observable<ContentData>;

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {

    this.content$ = this.http
      .get<ContentData>(this.CONTENT_URL)
      .pipe(
        shareReplay(1)
      );
  }

  getContent() {
    return this.languageService.lang$.pipe(
      switchMap(lang =>
        this.http.get<any>(this.CONTENT_URL).pipe(
          map(data => data[lang])
        )
      )
    );
  }

  getArticles() {
    return this.content$.pipe(
      map(content => content.articles)
    );
  }

  getFeaturedArticle(): Observable<Article> {
    return this.getArticles().pipe(
      map(articles => articles.find(a => a.featured)!)
    );
  }

  getActiveArticles(): Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.filter(a => a.isActive && a.isArticle))
    );
  }

  getActivePlaylists(): Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.filter(a => a.isActive && a.isPlaylist))
    );
  }

  getAbout(): Observable<Article[]> {
    return this.getArticles().pipe(
      map(articles => articles.filter(a => a.about))
    );
  }

  getFeaturedPlaylist(): Observable<Article> {
    return this.getArticles().pipe(
      map(articles => articles.find(a => a.featuredPlaylist)!)
    );
  }

  getArticleBySlug(slug: string, lang: 'hu' | 'en'): Observable<any> {
  return this.content$.pipe(
    map(data => {
    
      const articleContainer = data.articles.find(
        (a: any) => a.hu?.slug === slug || a.en?.slug === slug
      );

      if (!articleContainer) return null;

      return {
        ...articleContainer,     
        ...articleContainer[lang]
      };
    })
  );
}

  getMyArticles(): Observable<Article[]> {
    return this.getContent().pipe(
      map(data => data.articles ?? [])
    );
  }

}
