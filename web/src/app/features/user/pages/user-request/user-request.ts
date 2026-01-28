import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Table } from '../../../../shared/components/table/table';
import { CommonModule } from '@angular/common';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { FormsModule } from '@angular/forms';
import { mockDataUsers } from './mockData';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../../../../shared/components/buttons/button/button';
export interface User {
  id: string;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: 'Active' | 'Banned' | 'Pendent';
  avatarUrl: string;
  selected?: boolean; // Opcional, controlado pela tabela
}
@Component({
  selector: 'app-user-request',
  imports: [
    Breadcrumb,
    Table,
    CommonModule,
    TextField,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    Button,
  ],
  templateUrl: './user-request.html',
  styleUrl: './user-request.css',
})
export class UserRequest {
  searchTerm: string = '';
  // Defina as colunas
  tableColumns = [
    { label: 'ID' },
    { label: 'Name' },
    { label: 'Company' },
    { label: 'Role' },
    { label: 'Verified', class: 'text-center' },
    { label: 'Status', class: 'w-12' },
  ];
  status = input<string>('');
  // Seus dados
  originalUsers: User[] = mockDataUsers;
  users = signal<User[]>(this.originalUsers);

  constructor() {
    effect(() => {
      const currentStatus = this.status();
      this.filterStatus(currentStatus ?? 'all');
    });
  }

  handleSearch(term: string) {
    if (!term) {
      // Se limpou o input, restaura todos
      this.users.set(this.originalUsers);
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Filtra pelo nome, empresa ou cargo
    const filtered = this.originalUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerTerm) ||
        u.company.toLowerCase().includes(lowerTerm) ||
        u.role.toLowerCase().includes(lowerTerm),
    );

    this.users.set(filtered);
  }

  filterStatus(status: string) {
    if (status == 'all') {
      this.users.set(this.originalUsers);
      return;
    }
    const filtered = this.originalUsers.filter((u) =>
      u.status.toLowerCase().includes(status.toLowerCase()),
    );
    this.users.set(filtered);
  }

  selectedUsers = signal<any[]>([]);
  // Método chamado pelo evento da tabela
  onSelectionChange(selectedItems: any[]) {
    console.log('Itens selecionados:', selectedItems);
    this.selectedUsers.set(selectedItems);
  }

  deleteSelected() {
    const idsToDelete = this.selectedUsers().map((u) => u.id);
    console.log('Deletando IDs:', idsToDelete);
  }
}
