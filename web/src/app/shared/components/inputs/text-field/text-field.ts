import { Component, effect, forwardRef, input, InputSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXT_FIELD_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextField),
  multi: true,
};

@Component({
  selector: 'app-text-field',
  imports: [FormsModule],
  providers: [TEXT_FIELD_ACCESSOR],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField implements ControlValueAccessor {
  //Inputs
  value: InputSignal<string> = input<string>('');
  label: InputSignal<string> = input<string>('Label');
  hasLabel: InputSignal<boolean> = input<boolean>(false);
  placeholder: InputSignal<string> = input<string>('');
  disabled: boolean = false;
  variant: InputSignal<'outlined' | 'filled' | 'standard'> = input<
    'outlined' | 'filled' | 'standard'
  >('outlined');
  //Values Internos
  innerValue: string | Record<string, any> = '';
  private usingForms = false;

  constructor() {
    effect(() => {
      if (!this.usingForms) {
        this.innerValue = this.value();
      }
    });
  }

  // Funções do CVA
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.usingForms = true;
    this.innerValue = obj;
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

  onBlur(): void {
    this.onTouched();
  }

  updateValue(event: any) {
    const newValue = event.target.value;
    this.innerValue = newValue;
    if (this.usingForms) {
      this.onChange(newValue);
    }
  }
  
}
