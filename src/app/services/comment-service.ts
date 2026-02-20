import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ArticleComment } from '../models/user.model';
import { TelegramService } from './telegram-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(
    private firestore: Firestore,
    private telegramService: TelegramService,
     private http: HttpClient 
) {}

  getComments(articleId: string): Observable<ArticleComment[]> {
    const commentsRef = collection(
      this.firestore,
      `articles/${articleId}/comments`
    );

    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    return collectionData(q, { idField: 'id' }) as Observable<ArticleComment[]>;
  }

  addComment(
  articleId: string,
  text: string,
  user: any,
  parentId: string | null = null
) {
  const commentsRef = collection(
    this.firestore,
    `articles/${articleId}/comments`
  );

  return addDoc(commentsRef, {
    text,
    userId: user.uid,
    userName: user.displayName || 'Anonymous',
    userPhoto: user.photoURL || null,
    createdAt: serverTimestamp(),
    parentId: parentId
  }).then(async () => {
    // ----- TELEGRAM ÉRTESÍTÉS VERCEL API ALAPJÁN -----
    try {
      await this.http.post('https://my-telegram-api.vercel.app/api/sendCommentNotification',{ 
        articleId, 
        text, 
        user 
      }).toPromise();
      console.log('Telegram notification sent via Vercel API');
    } catch (err) {
      console.error('Error sending Telegram notification:', err);
    }
  }).catch(err => {
    console.error('Komment mentési hiba:', err);
  });
}

}