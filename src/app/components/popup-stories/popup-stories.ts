import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-stories',
  standalone: false,
  templateUrl: './popup-stories.html',
  styleUrl: './popup-stories.css',
})
export class PopupStories implements OnInit {

  show: boolean = false; 

  constructor() { }

 ngOnInit(): void {
  setTimeout(() => {
    this.show = true; 
  }, 3000);
  
}

  closePopup() {
    this.show = false;
  }

}
