import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-subheader',
  imports: [],
  templateUrl: './dashboard-subheader.html',
  styleUrl: './dashboard-subheader.css',
})
export class DashboardSubheader {
  title = input<string>('Subheader title');
}
