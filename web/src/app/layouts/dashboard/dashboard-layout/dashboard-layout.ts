import { Component } from '@angular/core';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { DashboardNavbar } from '../components/dashboard-navbar/dashboard-navbar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardHeader, DashboardNavbar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {}
