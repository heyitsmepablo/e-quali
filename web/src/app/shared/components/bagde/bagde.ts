import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bagde',
  imports: [],
  templateUrl: './bagde.html',
  styleUrl: './bagde.css',
})
export class Bagde {
  numberValue = input<number>(0);
}
