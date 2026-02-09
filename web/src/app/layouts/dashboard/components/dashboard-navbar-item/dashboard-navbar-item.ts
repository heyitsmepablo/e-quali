import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, Event } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavItem } from '../../../../shared/interfaces/nav-item.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-navbar-item',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './dashboard-navbar-item.html',
  styleUrl: './dashboard-navbar-item.css',
})
export class DashboardNavbarItem implements OnInit {
  isOpen = signal(false);
  item = input<NavItem>({ title: 'Title' });
  clickItemNav = output();
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isActiveParent = signal(false);

  constructor() {
    this.router.events
      .pipe(
        // Filtra apenas quando a navegação termina
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        // Cancela a subscrição quando o componente for destruído
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        // Recalcula o estado ativo sempre que a URL mudar
        this.checkActiveState();
      });
  }

  ngOnInit(): void {
    this.checkActiveState();
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }

  clickEmmiter() {
    this.clickItemNav.emit();
  }

  private checkActiveState() {
    if (this.item().children && this.item().path) {
      const active = this.router.url.includes(this.item().path!);
      this.isActiveParent.set(active);
      if (active) {
        this.isOpen.set(true);
      } else {
        this.isOpen.set(false);
      }
    }
  }
}
