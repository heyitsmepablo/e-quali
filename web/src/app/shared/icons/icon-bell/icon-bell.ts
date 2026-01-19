import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-bell',
  imports: [CommonModule],
  templateUrl: './icon-bell.html',
  styleUrl: './icon-bell.css',
})
export class IconBell {
  class = input('');
}
