import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Componentes UI
import { Button } from '../../../../shared/components/buttons/button/button';
import { Select } from '../../../../shared/components/inputs/select/select';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';

// Interfaces (Exemplo - adapte para seus tipos reais)
export interface UserRequestFormValues {
  id: number;
  nome?: string;
  matricula?: string;
  dataNascimento?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  unidadeId?: number | null;
  setorId?: number | null;
  areaId?: number | null;
  cargoId?: number | null;
  detalhe?: string | null | undefined;
}

export interface SelectOption {
  label: string;
  value: number | string;
}

@Component({
  selector: 'app-form-user-request',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Vital para o formulário funcionar
    Select,
    TextArea,
    Button,
    TextField,
  ],
  templateUrl: './form-user-request.html',
  styleUrl: './form-user-request.css',
})
export class FormUserRequest {
  private fb = inject(FormBuilder);

  // --- Inputs de Dados (Listas para os Selects) ---
  unidades = input<SelectOption[]>([]);
  setores = input<SelectOption[]>([]);
  areas = input<SelectOption[]>([]);
  cargos = input<SelectOption[]>([]);

  // --- Input de Controle ---
  // Se true, bloqueia todo o formulário (visualização apenas)
  isDisabled = input<boolean>(false);

  // Se vier preenchido, popula o form (Edição)
  initialData = input<UserRequestFormValues | null>(null);

  // --- Output ---
  // Emite os dados válidos para o Pai salvar
  formSubmit = output<UserRequestFormValues>();

  // --- Formulário ---
  form: FormGroup;

  hiddenDetailInput = input<boolean>(false);

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required]], // Ideal adicionar validador de CPF aqui
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      unidadeId: [null, Validators.required],
      setorId: [null, Validators.required],
      areaId: [null], // Opcional segundo seu DTO anterior
      cargoId: [null, Validators.required],
      detalhe: ['', Validators.required],
    });

    // Efeito: Monitora se deve desabilitar o formulário
    effect(() => {
      if (this.isDisabled()) {
        this.form.disable(); // Bloqueia tudo
      } else {
        this.form.enable(); // Libera tudo
      }
    });

    // Efeito: Monitora se chegaram dados iniciais para preencher (Edição)
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.form.patchValue(data);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Mostra erros vermelhos se houver campos inválidos
    }
  }
}
