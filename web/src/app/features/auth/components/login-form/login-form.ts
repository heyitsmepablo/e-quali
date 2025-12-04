import { Component } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      cpf: ['', Validators.minLength(11)],
      password: [''],
    });
  }

  onSubmit(): void {}
}
