import { Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { mockDataUsers } from '../../pages/user-request/mockData';
import { CommonModule } from '@angular/common';
import { Table } from '../../../../shared/components/table/table';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { FormsModule } from '@angular/forms';
export interface UserTableRow {
  id: number;
  nome: string;
  unidade: string;
  setor: string;
  cargo: string;
  status: string;
  criadoEm: string | null;
  atualizadoEm: string | null;
}
@Component({
  selector: 'app-user-table',
  imports: [CommonModule, RouterLinkActive, RouterLink, Table, TextField, FormsModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  isLoading = input<boolean>(false);
  searchTerm: string = '';
  // Defina as colunas
  tableColumns = [
    { label: 'ID' },
    { label: 'Nome' },
    { label: 'Unidade', class: 'w-12 text-start' },
    { label: 'Setor', class: 'text-start  pl-2.5' },
    { label: 'Cargo', class: ' text-start ' },
    { label: 'Status', class: 'text-start   ' },
    { label: 'Criado Em' },
    { label: 'Atualizado Em' },
  ];
  status = input<string>('');
  rows = input<UserTableRow[]>([]);
  users = signal<UserTableRow[]>(this.rows());

  private router = inject(Router);

  constructor() {
    effect(() => {
      const currentStatus = this.status();
      this.filterStatus(currentStatus);
    });
  }

  handleSearch(term: string) {
    if (!term) {
      // Se limpou o input, restaura todos
      this.users.set(this.rows());
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Filtra pelo nome, empresa ou cargo
    const filtered = this.rows().filter(
      (u) =>
        u.nome.toLowerCase().includes(lowerTerm) ||
        u.unidade.toLowerCase().includes(lowerTerm) ||
        u.cargo.toLowerCase().includes(lowerTerm) ||
        u.setor.toLowerCase().includes(lowerTerm),
    );

    this.users.set(filtered);
  }

  filterStatus(status: string | undefined) {
    console.log('Status no effect:', status); // Debug para confirmar

    // Verifica se é nulo, undefined, vazio ou 'all'
    if (!status || status.toLowerCase() === 'all') {
      this.users.set(this.rows());
      return;
    }

    const filtered = this.rows().filter((u) =>
      u.status.toLowerCase().includes(status.toLowerCase()),
    );
    this.users.set(filtered);
  }

  navigateToDetails(user: any) {
    // Mesma lógica que estava no [routerLink]
    this.router.navigate(['/usuario/solicitacao', user.id]);
  }
}
