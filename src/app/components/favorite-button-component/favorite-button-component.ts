// import { Component, Input, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { FavoritesService } from '../../services/favorites-service';

// @Component({
//   selector: 'app-favorite-button-component',
//   standalone: false,
//   templateUrl: './favorite-button-component.html',
//   styleUrl: './favorite-button-component.css',
// })
// export class FavoriteButtonComponent implements OnInit {

//   @Input() articleId!: number;

//   isFav$!: Observable<boolean>;

//   constructor(private favorites: FavoritesService) {}

//   ngOnInit() {
//     this.isFav$ = this.favorites.isFavorite(this.articleId);
//   }

//   toggle() {
//     this.favorites.toggleFavorite(this.articleId);
//   }
// }
