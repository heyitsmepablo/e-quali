import { Component, Input, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  //inputs
  type: InputSignal<'button' | 'submit' | 'reset'> = input<'button' | 'submit' | 'reset'>('button');
  variant: InputSignal<'contained' | 'outlined' | 'text' | 'soft'> = input<
    'contained' | 'outlined' | 'text' | 'soft'
  >('contained');
  color: InputSignal<'inherit' | 'primary' | 'secondary' | 'info' | 'warning' | 'error'> = input<
    'inherit' | 'primary' | 'secondary' | 'info' | 'warning' | 'error'
  >('primary');
  size: InputSignal<'lg' | 'md' | 'sm'> = input<'lg' | 'md' | 'sm'>('md');
  disabled: InputSignal<boolean> = input<boolean>(false);
  label: InputSignal<string> = input<string>('Label');
}
