import { Component } from '@angular/core';

@Component({
  selector: 'app-mapper',
  standalone: false,
  templateUrl: './mapper.html',
  styleUrl: './mapper.css',
 
})
  

export class Mapper {
 hoveredRoad: string | null = null;
}
