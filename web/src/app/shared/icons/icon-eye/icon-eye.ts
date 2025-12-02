import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-icon-eye',
  imports: [],
  templateUrl: './icon-eye.html',
  styleUrl: './icon-eye.css',
})
export class IconEye {
  on: InputSignal<boolean> = input<boolean>(true);
}
