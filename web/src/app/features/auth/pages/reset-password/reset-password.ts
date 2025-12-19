import { Component } from '@angular/core';
import { NewPasswordForm } from '../../components/new-password-form/new-password-form';
import { AuthService } from '../../auth-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [NewPasswordForm, ToastModule],
  providers: [MessageService],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  formPassword!: string;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async firstAccessRequestHandler(formValues: any) {
    const { newPassword } = formValues;
    try {
      const user = JSON.parse(localStorage.getItem('user') ?? '');
      await this.authService.firstAccess({ userId: user.id, newPassword });
      return this.router.navigate(['/', 'home']);
    } catch (error: any) {
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
