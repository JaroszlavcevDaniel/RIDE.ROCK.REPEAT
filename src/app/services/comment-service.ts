import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy, serverTimestamp } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ArticleComment } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(
    private firestore: Firestore,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getComments(articleId: string): Observable<ArticleComment[]> {
    if (!isPlatformBrowser(this.platformId)) {
      // SSR alatt üres tömböt adunk vissza
      return of([]);
    }

    const commentsRef = collection(this.firestore, `articles/${articleId}/comments`);
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    return collectionData(q, { idField: 'id' }) as Observable<ArticleComment[]>;
  }

  addComment(
    articleId: string,
    text: string,
    user: any,
    parentId: string | null = null
  ): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      // SSR alatt ne próbáljunk Firestore-t hívni, de térjünk vissza Promise-al
      console.warn('addComment skipped on server-side rendering');
      return Promise.resolve();
    }

    const commentsRef = collection(this.firestore, `articles/${articleId}/comments`);

    return addDoc(commentsRef, {
      text,
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      userPhoto: user.photoURL || null,
      createdAt: serverTimestamp(),
      parentId: parentId
    })
    .then(() => {
      // Sikeres mentés
    })
    .catch(err => {
      console.error('Komment mentési hiba:', err);
    });
  }
}