import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Table } from '../../../../shared/components/table/table';
import { CommonModule } from '@angular/common';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../../../../shared/components/buttons/button/button';
import { UserTable, UserTableRow } from '../../components/user-table/user-table';
import { mockDataUsers } from './mockData';

@Component({
  selector: 'app-user-request',
  imports: [Breadcrumb, CommonModule, FormsModule, RouterLink, Button, UserTable],
  templateUrl: './user-request.html',
  styleUrl: './user-request.css',
})
export class UserRequest {
  status = input<string>('');
  selectedUsers = signal<any[]>([]);

  users = signal(
    mockDataUsers.map(
      (d): UserTableRow => ({
        id: d.id,
        nome: d.usuarioSolicitadoNome,
        unidade: d.unidade.nome,
        setor: d.setor.sigla,
        cargo: d.cargo.nome,
        status: d.statusSolicitacao,
        criadoEm: d.criadoEm,
        atualizadoEm: d.atualizadoEm,
      }),
    ),
  );

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
