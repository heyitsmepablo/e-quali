import { Component } from '@angular/core';
import { UserPayloadStorage } from '../../../shared/types/user.type';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  user!: UserPayloadStorage | undefined;
  constructor() {
    const userDataStorage = localStorage.getItem('user');
    if (userDataStorage) {
      this.user = JSON.parse(userDataStorage);
    }
  }

  get setor(): string {
    const setor = this.user?.perfilFuncional?.setor;
    return setor ? `${setor.nome} (${setor.sigla})` : '';
  }

  get area(): string {
    return this.user?.perfilFuncional?.area?.nome ?? '';
  }

  get cargo(): string {
    return this.user?.perfilFuncional?.cargo?.nome ?? '';
  }

  get unidade(): string {
    const unidade = this.user?.perfilFuncional?.unidade;
    return unidade ? `${unidade.nome} (${unidade.sigla})` : '';
  }
}
