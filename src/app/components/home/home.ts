import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SoundService } from '../../services/sound-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  content$!: Observable<any>;

  isBrowser = false;

  constructor(
    private contentService: ContentService,
    private soundService: SoundService,
    @Inject(PLATFORM_ID) private platformId: Object
) {
    this.content$ = this.contentService.getContent();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
   onClick() {
    this.soundService.playClick();
  }
}