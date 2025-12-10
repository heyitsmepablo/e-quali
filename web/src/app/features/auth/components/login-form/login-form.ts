import { Component, output, signal, Signal } from '@angular/core';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [TextField, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm!: FormGroup;
  submitted = signal(false);
  loginSubmit = output<any>();

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      cpf: ['', Validators.minLength(11)],
      password: [''],
    });
  }

  get cpfShouldShowError() {
    const control = this.loginForm.controls['cpf'];
    return control.invalid && this.submitted() && (control.touched || control.dirty);
  }

  async onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log('valores enviados pelo form-login: ' + JSON.stringify(formValues, null, 2));
      this.loginSubmit.emit(formValues);
    }
    this.submitted.set(true);
  }
}
