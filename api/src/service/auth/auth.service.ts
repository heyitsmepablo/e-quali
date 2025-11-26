import { Injectable } from '@nestjs/common';
import PrismaSingleton from 'src/singleton/prisma-singleton';

@Injectable()
export class AuthService {
  #database = PrismaSingleton.instance.client;

  async login(payload: {
    cpf: string;
    password: string;
  }): Promise<Record<string, string>> {
    const { cpf, password } = payload;

    const user = await this.#database.usuario.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new Error('Usuário ou senha incorretos.');
    }

    const access = await this.#database.acesso.findUnique({
      where: { usuarioId: user?.id },
    });

    if (access?.senha != password) {
      throw new Error('Usuário ou senha incorretos.');
    }

    return { message: 'success' };
  }
}
