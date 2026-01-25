import { Component, input, output, signal } from '@angular/core';
import { DashboardSubheader } from '../dashboard-subheader/dashboard-subheader';
import { CommonModule } from '@angular/common';
import { DashboardNavbarItem } from '../dashboard-navbar-item/dashboard-navbar-item';
import { NavItem } from '../../../../shared/interfaces/nav-item.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [DashboardSubheader, CommonModule, DashboardNavbarItem, RouterLink],
  templateUrl: './dashboard-navbar.html',
  styleUrl: './dashboard-navbar.css',
})
export class DashboardNavbar {
  navbarItems: NavItem = {
    title: 'Usuario',
    path: '/usuario',
    children: [
      {
        title: 'Solicitação',
        path: 'solicitacao',
      },
    ],
  };

  userData = {
    nome: 'Pablo Eduardo',
    cargo: 'Admin',
  };

  isOpened = input.required<boolean>();
  closeEvent = output<void>();

  requestClose(): void {
    this.closeEvent.emit();
  }
}
