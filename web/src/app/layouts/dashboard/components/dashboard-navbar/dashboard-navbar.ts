import { Component, signal } from '@angular/core';
import { DashboardSubheader } from '../dashboard-subheader/dashboard-subheader';
import { CommonModule } from '@angular/common';
import { DashboardNavbarItem } from '../dashboard-navbar-item/dashboard-navbar-item';
import { NavItem } from '../../../../shared/interfaces/nav-item.interface';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [DashboardSubheader, CommonModule, DashboardNavbarItem],
  templateUrl: './dashboard-navbar.html',
  styleUrl: './dashboard-navbar.css',
})
export class DashboardNavbar {
  navbarItems: NavItem = {
    title: 'Usuario',
    path: '/layout',
    children: [
      {
        title: 'Solicitação',
        path: 'dashboard',
      },
      { title: 'Cadastro' },
    ],
  };
  userData = {
    nome: 'Pablo Eduardo',
    cargo: 'Admin',
  };

  isOpen = signal(false);
}
