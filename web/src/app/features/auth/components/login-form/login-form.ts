import { Component, signal, Signal } from '@angular/core';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login-form',
  imports: [TextField, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm!: FormGroup;
  submitted = signal(false);

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      cpf: ['', Validators.minLength(14)],
      password: [''],
    });
  }

  get cpfShouldShowError() {
    const control = this.loginForm.controls['cpf'];
    return control.invalid && this.submitted() && (control.touched || control.dirty);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log(formValues);
      await this.authService.login(formValues);
    }
    this.submitted.set(true);
  }
}
