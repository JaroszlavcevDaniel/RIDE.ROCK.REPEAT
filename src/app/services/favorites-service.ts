// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { BehaviorSubject, of } from 'rxjs';
// import { switchMap, map } from 'rxjs/operators';
// import { AuthService } from './auth-service';


// @Injectable({
//   providedIn: 'root'
// })
// export class FavoritesService {

//   // belső state
//   private favoritesSubject = new BehaviorSubject<number[]>([]);

//   // public observable (ezt használja a UI)
//   favorites$ = this.favoritesSubject.asObservable();

//   constructor(
//     private auth: AuthService,
//     private firestore: AngularFirestore
//   ) {
//     this.listenToUserFavorites();
//   }

//   /**
//    * Figyeli a login állapotot
//    * és realtime tölti a kedvenceket
//    */
//   private listenToUserFavorites() {

//     this.auth.user$
//       .pipe(
//         switchMap(user => {

//           // ha nincs user → üres lista
//           if (!user) {
//             return of([]);
//           }

//           // users/{uid}/favorites
//           return this.firestore
//             .collection(`users/${user.uid}/favorites`)
//             .valueChanges({ idField: 'id' });

//         }),
//         map((docs: any[]) =>
//           docs.map(doc => Number(doc.id))
//         )
//       )
//       .subscribe(favorites => {
//         this.favoritesSubject.next(favorites);
//       });
//   }

//   /**
//    * Kedvenc hozzáadás / törlés
//    */
//   async toggleFavorite(articleId: number) {

//     const user = await this.auth.user$.toPromise();

//     if (!user) {
//       console.warn('User not logged in');
//       return;
//     }

//     const docRef = this.firestore.doc(
//       `users/${user.uid}/favorites/${articleId}`
//     );

//     const currentFavorites = this.favoritesSubject.value;
//     const alreadyFavorite = currentFavorites.includes(articleId);

//     if (alreadyFavorite) {
//       await docRef.delete();
//     } else {
//       await docRef.set({
//         createdAt: Date.now()
//       });
//     }
//   }

//   /**
//    * Megmondja egy cikkről, hogy kedvenc-e
//    */
//   isFavorite(articleId: number) {
//     return this.favorites$.pipe(
//       map(list => list.includes(articleId))
//     );
//   }
// }
