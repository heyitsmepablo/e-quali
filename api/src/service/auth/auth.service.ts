import { Injectable } from '@nestjs/common';
import { RecordNotFoundError } from 'src/common/errors/record-not-found.error';
import { UnauthorizedError } from 'src/common/errors/unauthorized.error';
import { LoginAuthResponseDto } from 'src/common/dtos/auth/login.dto';
import PrismaSingleton from 'src/singleton/prisma-singleton';
import {
  FirstAccessPasswordAuthDto,
  FirstAccessPasswordAuthResponseDto,
} from 'src/common/dtos/auth/firstAccess';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  #database = PrismaSingleton.instance.client;

  async login(payload: {
    cpf: string;
    password: string;
  }): Promise<LoginAuthResponseDto> {
    const { cpf, password } = payload;

    const jwtExpireIn =
      this.configService.getOrThrow<ms.StringValue>('JWT_EXPIRES_IN');

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
      console.log('usuario não encontrado');
      throw new UnauthorizedError('Usuário ou senha incorretos.');
    }

    const access = await this.#database.acesso.findUnique({
      where: { usuarioId: user?.id },
    });

    if (access?.senha != password) {
      console.log('senha incorreta');
      throw new UnauthorizedError('Usuário ou senha incorretos.');
    }

    const { ultimoLogin } = access;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { perfilFuncionalId, ...formatUser } = user;
    const token = await this.jwtService.signAsync({ ...formatUser });
    const expira_em_milisegundos = ms(jwtExpireIn);
    const valido_ate_timestamp = Date.now() + expira_em_milisegundos;

    return {
      token: token,
      tipo: 'Bearer',
      expira_em_milisegundos: expira_em_milisegundos,
      valido_ate_timestamp: valido_ate_timestamp,
      usuario: formatUser,
      ultimo_login: ultimoLogin,
    };
  }

  async firstAccess(
    payload: FirstAccessPasswordAuthDto,
  ): Promise<FirstAccessPasswordAuthResponseDto> {
    const { userId, newPassword } = payload;

    const user = await this.#database.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new RecordNotFoundError('Usuario não encontrado');
    }
    const access = await this.#database.acesso.findUnique({
      where: { usuarioId: user.id },
    });

    if (access?.ultimoLogin) {
      throw new UnauthorizedError('Não Autoriazdo');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.#database.acesso.update({
      where: { usuarioId: user?.id },
      data: { senha: newPassword },
    });

    return { message: 'success' };
  }
}
