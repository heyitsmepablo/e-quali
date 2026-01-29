import { Component, input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor {
  label = input<string>('');
  id = input<string>('');
  placeholder = input<string>(''); // Texto da opção vazia
  variant = input<'outlined' | 'filled' | 'standard'>('outlined');

  // Dados para o select
  options = input<any[]>([]);
  bindLabel = input<string>('label'); // Nome da chave para exibir (ex: 'nome')
  bindValue = input<string>('value'); // Nome da chave do valor (ex: 'id')

  // Controle interno
  innerValue = signal<any>(null);
  disabled = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.innerValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(value: any) {
    this.innerValue.set(value);
    this.onChange(value);
    this.onTouched();
  }

  // Helper para resolver o label do objeto
  getLabel(option: any): string {
    const labelKey = this.bindLabel();
    return labelKey ? option[labelKey] : option;
  }

  // Helper para resolver o value do objeto
  getValue(option: any): any {
    const valueKey = this.bindValue();
    return valueKey ? option[valueKey] : option;
  }
}
