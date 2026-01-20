import { Component, signal } from '@angular/core';
import { DashboardSubheader } from '../dashboard-subheader/dashboard-subheader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [DashboardSubheader, CommonModule],
  templateUrl: './dashboard-navbar.html',
  styleUrl: './dashboard-navbar.css',
})
export class DashboardNavbar {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
