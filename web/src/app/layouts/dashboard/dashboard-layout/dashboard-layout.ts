import { Component, signal } from '@angular/core';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { DashboardNavbar } from '../components/dashboard-navbar/dashboard-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardHeader, DashboardNavbar, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  // O estado principal fica AQUI
  navbarOpened = signal<boolean>(false);

  navbarToggle() {
    this.navbarOpened.update((val) => !val);
  }

  // Função específica para garantir que feche
  closeNavbar() {
    this.navbarOpened.set(false);
  }
}
