import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginBanner } from '../../components/login-banner/login-banner';
import { AuthService } from '../../auth-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoginForm, LoginBanner, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  loading = false;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  async loginRequestHandler(formValues: any) {
    try {
      this.loading = !this.loading;
      const loginRes = await this.authService.login({
        cpf: formValues?.cpf,
        senha: formValues?.password,
      });

      console.log(loginRes);

      const { ultimo_login } = loginRes;

      if (!ultimo_login) {
        localStorage.setItem('user', JSON.stringify(loginRes.usuario, null, 2));
        this.route.navigate(['/', 'reset-password']);
      }

      return 'Futuro Redirect pro APP';
    } catch (error: any) {
      this.loading = !this.loading;
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: `${error.status} : ${error.code}`,
        detail: error.message,
        life: 3000,
      });
      throw error;
    }
  }
}
