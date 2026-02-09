import { Component, effect, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/buttons/button/button';
import { UserTable, UserTableRow } from '../../components/user-table/user-table';
import { UserRequestService } from '../../services/user-request-service/user-request-service';

@Component({
  selector: 'app-user-request',
  imports: [Breadcrumb, CommonModule, FormsModule, RouterLink, Button, UserTable],
  templateUrl: './user-request.html',
  styleUrl: './user-request.css',
})
export class UserRequest implements OnInit {
  private userRequestService = inject(UserRequestService);

  // Inputs e Signals
  status = input<string>('');
  selectedUsers = signal<any[]>([]);

  // Inicialize o signal com um array vazio para evitar erros no template
  users = signal<UserTableRow[]>([]);
  loading = signal<boolean>(false);

  async ngOnInit(): Promise<void> {
    await this.fetchRequests();
  }

  async fetchRequests() {
    this.loading.set(true);
    try {
      const data = await this.userRequestService.listRequests();

      // Transformação de dados centralizada
      const mappedUsers = data.map(
        (d): UserTableRow => ({
          id: d.id,
          nome: d.usuarioSolicitadoNome,
          unidade: d.unidade.nome,
          setor: d.setor.sigla ?? 'N/A', // Tratando nulos
          cargo: d.cargo.nome,
          status: d.statusSolicitacao,
          criadoEm: d.criadoEm,
          atualizadoEm: d.atualizadoEm,
        }),
      );

      this.users.set(mappedUsers);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
      // Aqui você poderia disparar um Toast ou Snackbar de erro
    } finally {
      this.loading.set(false);
    }
  }

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
