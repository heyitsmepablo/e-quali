import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ResetPassword } from './features/auth/pages/reset-password/reset-password';
import { MainLayout } from './layouts/main/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'reset-password', component: ResetPassword },
  { path: 'home', component: MainLayout },
  { path: 'layout/dashboard', component: DashboardLayout },
];
