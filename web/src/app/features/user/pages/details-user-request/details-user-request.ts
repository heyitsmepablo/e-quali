import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

// Services & Adapters
import {
  UserRequestDetailsResponse,
  UserRequestService,
} from '../../services/user-request-service/user-request-service';
import { UserRequestAdapter } from '../../components/form-user-request/adapter/form-user-request-adapter';

// Mocks (Se puder, mova isso para o Service no futuro)
import { mockAreas, mockCargos, mockSetores, mockUnidades } from '../user-request/mockData';

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
  apiData = signal<UserRequestDetailsResponse | null>(null);
  requestDetailsFormValues = signal<UserRequestFormValues | null>(null);

  // Options Signals (Mocks)
  unidade = signal(mockUnidades);
  setor = signal(mockSetores);
  area = signal(mockAreas);
  cargo = signal(mockCargos);

  async ngOnInit(): Promise<void> {
    await this.fetchRequestDetails();
  }

  async fetchRequestDetails() {
    this.isLoading.set(true);

    try {
      const data = await this.userRequestService.requestDetails(this.idSolicitacaoUsuario());

      this.apiData.set(data);
      this.requestDetailsFormValues.set(UserRequestAdapter.toFormValues(data));
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
      // Aqui você poderia adicionar um Toast/Notification de erro
    } finally {
      this.isLoading.set(false);
    }
  }
}
