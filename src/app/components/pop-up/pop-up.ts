import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: false,
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp implements OnInit {

  show: boolean = true; // true = megjelenik automatikusan

  constructor() { }

  ngOnInit(): void {
    // Itt lehet pl. késleltetni a megjelenést, ha szeretnéd
    setTimeout(() => this.show = true, 200);
  }

  closePopup() {
    this.show = false;
  }

}
