import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isGroup?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // 1. EXECUTA IMEDIATAMENTE AO CARREGAR A TELA (Correção Principal)
    this.createBreadcrumbs(this.activatedRoute.root);

    // 2. ESCUTA MUDANÇAS FUTURAS
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        // Reseta para garantir que o array comece limpo a cada navegação
        this.breadcrumbs.set([]);

        this.createBreadcrumbs(this.activatedRoute.root);
      });
  }
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = [],
  ): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.breadcrumbs.set(breadcrumbs);

      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumbData = child.snapshot.data['breadcrumb'];

      // 2. Verificamos se o objeto existe e se tem um label
      if (breadcrumbData && breadcrumbData.label) {
        breadcrumbs.push({
          label: breadcrumbData.label,
          url: url,
          // 3. Extraímos o isGroup do objeto (ou false se não existir)
          isGroup: breadcrumbData.isGroup ?? false,
        });
      }

      // Passa o array atualizado para o próximo nível
      this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
