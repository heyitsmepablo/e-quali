import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Components
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';
import { Button } from '../../../../shared/components/buttons/button/button';
import { Card } from '../../../../shared/components/card/card';
import {
  FormUserRequest,
  UserRequestFormValues,
} from '../../components/form-user-request/form-user-request';

// Mocks (Se puder, mova isso para o Service no futuro)
import { mockAreas, mockCargos, mockSetores, mockUnidades } from '../user-request/mockData';
import {
  UserRequestRequestDetailsResponse,
  UserRequestService,
} from '../../services/user-request/user-request-service';
import { UserRequestAdapter } from '../../adapters/user-request-adatpter';

@Component({
  selector: 'app-details-user-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    Breadcrumb,
    TextArea,
    Button,
    Card,
    FormUserRequest,
  ],
  templateUrl: './details-user-request.html',
  styleUrl: './details-user-request.css',
})
export class DetailsUserRequest implements OnInit {
  private userRequestService = inject(UserRequestService);

  // Inputs
  idSolicitacaoUsuario = input.required<number>(); // Usei required para garantir tipagem

  // State Signals
  isLoading = signal(true);
  apiData = signal<UserRequestRequestDetailsResponse | null>(null);
  requestDetailsFormValues = signal<UserRequestFormValues | null>(null);
  detalheSolicitacao = new FormControl('');
  // Options Signals (Mocks)
  unidade = signal(mockUnidades);
  setor = signal(mockSetores);
  area = signal(mockAreas);
  cargo = signal(mockCargos);

  async ngOnInit(): Promise<void> {
    await this.fetchRequestDetails();
    this.detalheSolicitacao.disable(); // Agora o campo fica somente leitura
  }

  async fetchRequestDetails() {
    this.isLoading.set(true);

    try {
      const data = await this.userRequestService.requestDetails(this.idSolicitacaoUsuario());

      // CORREÇÃO: Chamar o método disable() e popular o valor
      this.detalheSolicitacao.setValue(data.detalhe ?? '');

      this.apiData.set(data);
      this.requestDetailsFormValues.set(UserRequestAdapter.toFormValues(data));
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
