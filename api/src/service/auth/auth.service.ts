import { Injectable } from '@nestjs/common';
import { RecordNotFoundError } from 'src/common/errors/record-not-found.error';
import { UnauthorizedError } from 'src/common/errors/unauthorized.error';
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
        perfilFuncionalId: true,
        perfilFuncional: {
          select: {
            unidade: { select: { id: true, nome: true, sigla: true } },
            setor: { select: { id: true, nome: true, sigla: true } },
            area: { select: { id: true, nome: true } },
            cargo: { select: { id: true, nome: true } },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedError('Usuário ou senha incorretos.');
    }

    const access = await this.#database.acesso.findUnique({
      where: { usuarioId: user?.id },
    });

    if (access?.senha != password) {
      throw new UnauthorizedError('Usuário ou senha incorretos.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { perfilFuncionalId, ...formatUser } = user;

    return { user: formatUser };
  }

  async changePassword(payload: { cpf: string; newPass: string }) {
    const { cpf, newPass } = payload;

    const user = await this.#database.usuario.findUnique({
      where: { cpf },
    });
    if (!user) {
      throw new RecordNotFoundError('Usuario não encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const access = await this.#database.acesso.update({
      where: { usuarioId: user?.id },
      data: { senha: newPass },
    });

    return { message: 'success' };
  }
}
