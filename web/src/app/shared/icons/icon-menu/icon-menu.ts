import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-menu',
  imports: [CommonModule],
  templateUrl: './icon-menu.html',
  styleUrl: './icon-menu.css',
})
export class IconMenu {
  class = input<string>('');
}
