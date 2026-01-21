import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../../../shared/interfaces/nav-item.interface';

@Component({
  selector: 'app-dashboard-navbar-item',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './dashboard-navbar-item.html',
  styleUrl: './dashboard-navbar-item.css',
})
export class DashboardNavbarItem {
  isOpen = signal(false);
  item = input<NavItem>({ title: 'Title' });
  toggle() {
    this.isOpen.update((v) => !v);
  }
}
