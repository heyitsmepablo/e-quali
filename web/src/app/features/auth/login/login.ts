import { Component } from '@angular/core';
import { TextField } from '../../../shared/components/inputs/text-field/text-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [TextField, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({ cpf: ['cpfsss', Validators.minLength(4)] });
  }
}
