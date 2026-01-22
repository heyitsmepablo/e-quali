import { Component, signal } from '@angular/core';
import { DashboardSubheader } from '../dashboard-subheader/dashboard-subheader';
import { CommonModule } from '@angular/common';
import { DashboardNavbarItem } from '../dashboard-navbar-item/dashboard-navbar-item';


@Component({
  selector: 'app-dashboard-navbar',
  imports: [DashboardSubheader, CommonModule, DashboardNavbarItem],
  templateUrl: './dashboard-navbar.html',
  styleUrl: './dashboard-navbar.css',
})
export class DashboardNavbar {}

