import { Component } from '@angular/core';
import { NewPasswordForm } from '../../components/new-password-form/new-password-form';

@Component({
  selector: 'app-reset-password',
  imports: [NewPasswordForm],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {}
