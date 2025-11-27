import { Injectable } from '@nestjs/common';
import PrismaSingleton from 'src/singleton/prisma-singleton';

@Injectable()
export class AuthService {
  #database = PrismaSingleton.instance.client;

  async login(payload: {
    cpf: string;
    password: string;
  }): Promise<Record<string, any>> {
    const { cpf, password } = payload;

    const user = await this.#database.usuario.findUnique({
      where: { cpf },
      select: {
        id: true,
        nome: true,
        matricula: true,
        cpf: true,
        email: true,
        unidadeSetorAreaCargo: {
          select: {
            unidade: { select: { id: true, nome: true, sigla: true } },
            setor: { select: { id: true, nome: true } },
            area: { select: { id: true, nome: true } },
            cargo: { select: { id: true, nome: true } },
          },
        },
      },
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

    return user;
  }
}
