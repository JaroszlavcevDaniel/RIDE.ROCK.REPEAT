import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  content$!: Observable<any>;

  constructor(
    private contentService: ContentService,
    private soundService: SoundService
) {
    this.content$ = this.contentService.getContent();
  }
   onClick() {
    this.soundService.playClick();
  }
}