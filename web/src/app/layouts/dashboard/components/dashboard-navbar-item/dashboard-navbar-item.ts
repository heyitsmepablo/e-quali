import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../../../shared/interfaces/nav-item.interface';

@Component({
  selector: 'app-dashboard-navbar-item',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './dashboard-navbar-item.html',
  styleUrl: './dashboard-navbar-item.css',
})
export class DashboardNavbarItem implements OnInit {
  isOpen = signal(false);
  item = input<NavItem>({ title: 'Title' });
  private router = inject(Router);
  isActiveParent = signal(false);
  ngOnInit(): void {
    this.checkActiveState();
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }
  private checkActiveState() {
    if (this.item().children && this.item().path) {
      const active = this.router.url.includes(this.item().path!);
      this.isActiveParent.set(active);
      if (active) {
        this.isOpen.set(true);
      }
    }
  }
}
