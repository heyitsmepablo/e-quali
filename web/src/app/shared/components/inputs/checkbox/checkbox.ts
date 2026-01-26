import { Component, input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  color = input<'default' | 'primary' | 'secundary'>('default');
  size = input<'s' | 'm'>('m');
  disabled = input<boolean>(false);
}
