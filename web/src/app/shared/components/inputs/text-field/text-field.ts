import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconEye } from '../../../icons/icon-eye/icon-eye';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

const TEXT_FIELD_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextField),
  multi: true,
};

@Component({
  selector: 'app-text-field',
  imports: [FormsModule, IconEye, NgxMaskDirective],
  providers: [TEXT_FIELD_ACCESSOR, provideNgxMask()],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextField implements ControlValueAccessor {
  //Inputs
  value: string = '';
  label: InputSignal<string> = input<string>('Label');
  hasLabel: InputSignal<boolean> = input<boolean>(false);
  placeholder: InputSignal<string> = input<string>('');
  variant: InputSignal<'outlined' | 'filled' | 'standard'> = input<
    'outlined' | 'filled' | 'standard'
  >('outlined');
  type: InputSignal<string> = input('text');
  showPasswordToggle: InputSignal<boolean> = input<boolean>(false);
  id: InputSignal<string> = input('');
  name: InputSignal<string> = input('');
  mask: InputSignal<string> = input('');
  dropSpecialCharacters: InputSignal<boolean> = input<boolean>(false);
  specialCharacters: InputSignal<string[]> = input(['']);
  //Values Internos
  disabled: boolean = false;
  eyeOn: boolean = true;
  innerValue: string | Record<string, any> = '';
  innerType = signal(this.type());
  private usingForms = false;

  constructor() {
    effect(() => {
      // if (!this.usingForms) {
      //   this.innerValue = this.value();
      // }
      this.innerType.set(this.type());
    });
  }
  // Funções auxiliares

  showPass(): void {
    const newType = this.innerType() === 'password' ? 'text' : 'password';
    this.innerType.set(newType);
    this.eyeOn = !this.eyeOn;
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
    const newValue: string = `${this.innerValue}`;
    this.value = newValue;
    if (this.usingForms) {
      this.onChange(newValue);
    }
  }
}
