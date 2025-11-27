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
        unidadeSetorAreaCargoId: true,
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { unidadeSetorAreaCargo, unidadeSetorAreaCargoId, ...rest } = user;
    const { unidade, setor, area, cargo } = unidadeSetorAreaCargo;

    const formatUser = {
      ...rest,
      unidade,
      setor,
      area,
      cargo,
    };

    return { user: formatUser };
  }

  async changePassword(payload: { cpf: string; newPass: string }) {
    const { cpf, newPass } = payload;

    const user = await this.#database.usuario.findUnique({
      where: { cpf },
    });
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const access = await this.#database.acesso.update({
      where: { usuarioId: user?.id },
      data: { senha: newPass },
    });

    return { message: 'success' };
  }
}
