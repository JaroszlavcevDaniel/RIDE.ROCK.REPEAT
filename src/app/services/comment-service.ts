import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ArticleComment } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private firestore: Firestore) {}

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
    user: any
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
      createdAt: serverTimestamp()
    });
  }
}