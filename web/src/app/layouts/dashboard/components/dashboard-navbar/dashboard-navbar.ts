import { Component, signal } from '@angular/core';
import { DashboardSubheader } from '../dashboard-subheader/dashboard-subheader';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [DashboardSubheader],
  templateUrl: './dashboard-navbar.html',
  styleUrl: './dashboard-navbar.css',
})
export class DashboardNavbar {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
