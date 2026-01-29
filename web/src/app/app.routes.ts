import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ResetPassword } from './features/auth/pages/reset-password/reset-password';
import { DashboardLayout } from './layouts/dashboard/dashboard-layout/dashboard-layout';
import { Home } from './features/home/home';
import { UserRequest } from './features/user/pages/user-request/user-request';
import { CreateUserRequest } from './features/user/pages/create-user-request/create-user-request';
import { DetailsUserRequest } from './features/user/pages/details-user-request/details-user-request';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'reset-password', component: ResetPassword },
  { path: 'layout/dashboard', component: DashboardLayout },
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: Home, data: { breadcrumb: { label: 'Dashboard' } } },
      {
        path: 'usuario',
        data: { breadcrumb: { label: 'Usuário', isGroup: true } },
        children: [
          {
            path: 'solicitacao',
            data: { breadcrumb: { label: 'Solicitação' } },
            children: [
              { path: '', component: UserRequest },
              {
                path: 'criar',
                component: CreateUserRequest,
                data: { breadcrumb: { label: 'Nova Solicitação' } },
              },
              {
                path: ':idSolicitacaoUsuario',
                component: DetailsUserRequest,
                data: { breadcrumb: { label: 'Detalhes da Solicitação' } },
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
