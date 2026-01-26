import { Component, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Table } from '../../../../shared/components/table/table';
import { CommonModule } from '@angular/common';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { FormsModule } from '@angular/forms';
export interface User {
  id: string;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: 'Active' | 'Banned';
  avatarUrl: string;
  selected?: boolean; // Opcional, controlado pela tabela
}
@Component({
  selector: 'app-user-request',
  imports: [Breadcrumb, Table, CommonModule, TextField, FormsModule],
  templateUrl: './user-request.html',
  styleUrl: './user-request.css',
})
export class UserRequest {
  searchTerm: string = '';
  // Defina as colunas
  tableColumns = [
    { label: 'Name' },
    { label: 'Company' },
    { label: 'Role' },
    { label: 'Verified', class: 'text-center' },
    { label: 'Status' },
    { label: '', class: 'w-12' }, // Coluna de ações
  ];

  // Seus dados
  originalUsers: User[] = [
    {
      id: '1',
      name: 'Adam Trantow',
      company: 'Mohr, Langworth and Hills',
      role: 'UI Designer',
      verified: true,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=Adam+Trantow&background=c7d2fe&color=3730a3',
    },
    {
      id: '2',
      name: 'Angel Rololfson',
      company: 'Koch and Sons',
      role: 'Full Stack Designer',
      verified: true,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=Angel+Rololfson&background=fecaca&color=991b1b',
    },
    {
      id: '3',
      name: 'Betty Hammes',
      company: 'Waelchi - VonRueden',
      role: 'Hr Manager',
      verified: false,
      status: 'Banned',
      avatarUrl: 'https://ui-avatars.com/api/?name=Betty+Hammes&background=bbf7d0&color=166534',
    },
    {
      id: '4',
      name: 'Billy Braun',
      company: 'White, Cassin and Goldner',
      role: 'Leader',
      verified: true,
      status: 'Banned',
      avatarUrl: 'https://ui-avatars.com/api/?name=Billy+Braun&background=bfdbfe&color=1e3a8a',
    },
    {
      id: '5',
      name: 'Billy Stoltenberg',
      company: 'Medhurst, Moore and Franey',
      role: 'Leader',
      verified: true,
      status: 'Active',
      avatarUrl:
        'https://ui-avatars.com/api/?name=Billy+Stoltenberg&background=e9d5ff&color=6b21a8',
    },
    {
      id: '6',
      name: 'Charles Franecki',
      company: 'Langosh, Kautzer and Kraus',
      role: 'Full Stack Designer',
      verified: false,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=Charles+Franecki&background=fde68a&color=92400e',
    },
    {
      id: '7',
      name: 'Christopher Bernier',
      company: 'Johnston, Kirlin and Wolk',
      role: 'Backend Developer',
      verified: true,
      status: 'Banned',
      avatarUrl:
        'https://ui-avatars.com/api/?name=Christopher+Bernier&background=a5f3fc&color=155e75',
    },
    {
      id: '8',
      name: 'Clark Mueller',
      company: 'Wiza, Schowalter and Conroy',
      role: 'Front End Developer',
      verified: false,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=Clark+Mueller&background=ddd6fe&color=5b21b6',
    },
    {
      id: '9',
      name: 'Danny Armstrong',
      company: "Toy, Borer and O'Kon",
      role: 'Project Manager',
      verified: true,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=Danny+Armstrong&background=fbcfe8&color=9d174d',
    },
    {
      id: '10',
      name: 'David Becker',
      company: 'Yost and Sons',
      role: 'UI/UX Designer',
      verified: true,
      status: 'Active',
      avatarUrl: 'https://ui-avatars.com/api/?name=David+Becker&background=e2e8f0&color=475569',
    },
  ];
  users = signal<User[]>([]);

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
}
