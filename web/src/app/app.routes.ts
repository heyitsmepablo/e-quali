import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ResetPassword } from './features/auth/pages/reset-password/reset-password';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  {path: 'reset-password', component:ResetPassword}
];
