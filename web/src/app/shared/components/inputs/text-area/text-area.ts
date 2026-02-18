import { CommonModule } from '@angular/common';
import { Component, computed, effect, forwardRef, input, InputSignal, signal } from '@angular/core'; // Adicione signal
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXT_AREA_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextArea),
  multi: true,
};

let nextId: number = 0;

@Component({
  selector: 'app-text-area',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area.html',
  styleUrl: './text-area.css',
  providers: [TEXT_AREA_ACCESSOR],
})
export class TextArea implements ControlValueAccessor {
  private _uniqueId = `app-text-field-${nextId++}`;

  // Inputs
  id = input<string>('');
  inputId = computed(() => this.id() || this._uniqueId);

  // ... outros inputs (label, placeholder, etc mantidos igual) ...
  label = input<string>('Label');
  hasLabel = input<boolean>(false);
  placeholder = input<string>('');
  variant = input<'outlined' | 'filled' | 'standard'>('outlined');
  type = input('text');
  showPasswordToggle = input<boolean>(false);
  name = input('');
  mask = input(''); // Nota: mask não funciona nativamente no textarea sem uma lib externa

  // --- MUDANÇA AQUI: Transforme disabled em Signal ---
  disabled = signal(false);

  eyeOn: boolean = true;
  innerValue: string = ''; // Removi o Record<string,any> para simplificar, textarea é string
  innerType = signal(this.type());
  private usingForms = false;

  constructor() {
    effect(() => {
      this.innerType.set(this.type());
    });
  }

  // CVA Implementation
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.usingForms = true;
    // Boa prática: tratar null/undefined para não quebrar o ngModel
    this.innerValue = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // --- MUDANÇA AQUI: Atualiza o Signal ---
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onBlur(): void {
    this.onTouched();
  }

  updateValue(event: any) {
    // O evento do ngModelChange já passa o valor novo, não precisa pegar this.innerValue
    this.innerValue = event;
    if (this.usingForms) {
      this.onChange(event);
    }
  }
}
