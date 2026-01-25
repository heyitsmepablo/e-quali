import { Component, HostListener, output, signal } from '@angular/core';
import { IconMenu } from '../../../../shared/icons/icon-menu/icon-menu';
import { IconSearch } from '../../../../shared/icons/icon-search/icon-search';
import { IconBell } from '../../../../shared/icons/icon-bell/icon-bell';
import { Bagde } from '../../../../shared/components/bagde/bagde';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  imports: [IconMenu, IconSearch, IconBell, Bagde, CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  menuClickEvent = output<void>();
  isScrolled = signal(false);

  emitMenuClick() {
    this.menuClickEvent.emit();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    this.isScrolled.set(scrollPosition > 10);
  }
}
