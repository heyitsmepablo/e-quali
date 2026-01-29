import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css', // O CSS do tailwind/halo continua o mesmo
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox implements ControlValueAccessor {
  // --- ESTADO INTERNO ---
  checked = signal<boolean>(false);
  disabled = signal<boolean>(false);

  // Armazena o valor atual do formulário (pode ser boolean ou array)
  private currentModel: any;

  // --- INPUTS ---
  // "value" é a string que este checkbox representa (ex: "admin", "leitura")
  value = input<string | null>(null);

  // "binary": Se true, ignora o 'value' e retorna true/false
  binary = input<boolean>(false);

  // Estilização
  size = input<'s' | 'm'>('m');
  color = input<'default' | 'primary'>('default');
  inputId = input<string>('');
  name = input<string>('');
  indeterminate = input<boolean>(false);

  // --- CVA CALLBACKS ---
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  // 1. Angular envia dados para o componente (Escrever na Tela)
  writeValue(model: any): void {
    this.currentModel = model;

    if (this.binary()) {
      // MODO BINÁRIO: O modelo é apenas true/false
      this.checked.set(!!model);
    } else {
      // MODO GRUPO: O modelo é um Array. Checamos se o 'value' está dentro dele.
      if (Array.isArray(model) && this.value()) {
        this.checked.set(model.includes(this.value()));
      } else {
        this.checked.set(false);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // 2. Usuário interage com o componente (Enviar para o Angular)
  onInputChange(event: Event): void {
    if (this.disabled()) return;

    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    // Atualiza o visual imediatamente
    this.checked.set(isChecked);

    if (this.binary()) {
      // LÓGICA 1: Retorna apenas Boolean
      this.onChange(isChecked);
    } else {
      // LÓGICA 2: Manipula Array de Strings
      this.handleArrayChange(isChecked);
    }

    this.onTouched();
  }

  private handleArrayChange(isChecked: boolean) {
    // Pega o valor específico deste checkbox (ex: "admin")
    const itemValue = this.value();

    // Se não tiver valor definido, não tem como adicionar no array
    if (!itemValue) return;

    // Garante que temos um array para trabalhar
    const currentArray = Array.isArray(this.currentModel) ? [...this.currentModel] : [];

    if (isChecked) {
      // ADICIONAR: Se marcou e não está na lista, adiciona
      if (!currentArray.includes(itemValue)) {
        currentArray.push(itemValue);
      }
    } else {
      // REMOVER: Se desmarcou, remove da lista
      const index = currentArray.indexOf(itemValue);
      if (index > -1) {
        currentArray.splice(index, 1);
      }
    }

    // Emite o NOVO array completo (ex: ['admin', 'user'])
    this.onChange(currentArray);
  }
}
