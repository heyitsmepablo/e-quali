import { Component } from '@angular/core';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardHeader],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {}
