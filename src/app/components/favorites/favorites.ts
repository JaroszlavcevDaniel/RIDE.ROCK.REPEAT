// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { FavoritesService } from '../../services/favorites-service';

// @Component({
//   selector: 'app-favorites',
//   standalone: false,
//   templateUrl: './favorites.html',
//   styleUrl: './favorites.css',
// })
// export class Favorites  implements OnInit {

//   // teljes kedvenc cikk lista
//   favoriteStories$!: Observable<any[]>;

//   constructor(
//     private favoritesService: FavoritesService,
//     private storiesService: StoriesService
//   ) {}

//   ngOnInit(): void {

//     /**
//      * combineLatest:
//      * - favorites$ → [1,4,7]
//      * - stories$ → összes cikk JSON-ból
//      *
//      * => kiszűrjük a kedvenceket
//      */
//     this.favoriteStories$ = combineLatest([
//       this.favoritesService.favorites$,
//       this.storiesService.stories$
//     ]).pipe(
//       map(([favoriteIds, stories]) =>
//         stories.filter((story: any) =>
//           favoriteIds.includes(story.id)
//         )
//       )
//     );
//   }
// }
