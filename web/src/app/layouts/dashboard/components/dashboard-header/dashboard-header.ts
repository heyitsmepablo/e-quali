import { Component } from '@angular/core';
import { IconMenu } from '../../../../shared/icons/icon-menu/icon-menu';
import { IconSearch } from '../../../../shared/icons/icon-search/icon-search';
import { IconBell } from '../../../../shared/icons/icon-bell/icon-bell';
import { Bagde } from '../../../../shared/components/bagde/bagde';
@Component({
  selector: 'app-dashboard-header',
  imports: [IconMenu, IconSearch, IconBell, Bagde],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {}
