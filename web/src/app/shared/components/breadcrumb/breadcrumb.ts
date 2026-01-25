import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit {
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  // O último item da lista geralmente é o título da página
  pageTitle = signal<string>('');

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
        this.pageTitle.set('');
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
      if (breadcrumbs.length > 0) {
        this.pageTitle.set(breadcrumbs[breadcrumbs.length - 1].label);
      }
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // IMPORTANTE: Verifica se existe 'data: { breadcrumb: ... }' na rota
      const label = child.snapshot.data['breadcrumb'];

      if (label) {
        breadcrumbs.push({ label, url });
      }

      // Passa o array atualizado para o próximo nível
      this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
