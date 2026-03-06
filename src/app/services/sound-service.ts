import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {

 
 private clickSound?: HTMLAudioElement;
  private clickSoundTwo?: HTMLAudioElement;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
   
    if (isPlatformBrowser(this.platformId)) {
  this.clickSound = new Audio('sounds/start.mp3');
  this.clickSound.volume = 0.4; 
}
    
   if (isPlatformBrowser(this.platformId)) {
     this.clickSoundTwo = new Audio('sounds/next.mp3');
    this.clickSoundTwo.volume = 0.1; 
}
    
  }

  playClick() {

    this.clickSound!.currentTime = 0;
    this.clickSound!.play().catch(err => {
    });
  }

   playClickTwo() {

    this.clickSoundTwo!.currentTime = 0;
    this.clickSoundTwo!.play().catch(err => {
    });
  }




}