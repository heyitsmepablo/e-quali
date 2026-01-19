import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-search',
  imports: [CommonModule],
  templateUrl: './icon-search.html',
  styleUrl: './icon-search.css',
})
export class IconSearch {
  class = input<string>('');
}
