import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginBanner } from '../../components/login-banner/login-banner';
import { AuthService } from '../../auth-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoginForm, LoginBanner, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private messageService: MessageService) {}

  async loginRequestHandler(formValues: any) {
    try {
      const apiRes = await this.authService.login(formValues);
      console.log(apiRes);
    } catch (error: any) {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: `${error.status} : ${error.code}`,
        detail: error.message,
        life: 3000,
      });
    }
  }
}
