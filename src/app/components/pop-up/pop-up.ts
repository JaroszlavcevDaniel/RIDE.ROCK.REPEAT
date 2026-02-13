import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: false,
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp implements OnInit {

  show: boolean = false; 

  constructor() { }

 ngOnInit(): void {
  setTimeout(() => {
    this.show = true; 
  }, 2000);
  
}

  closePopup() {
    this.show = false;
  }

}
