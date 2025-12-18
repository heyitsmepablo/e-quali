/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { prismaMock } from 'src/__mock__/singleton/prisma-singleton';
import { LoginAuthResponseDto } from 'src/common/dtos/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from 'src/__mock__/service/jwt.service';
import { configServiceMock } from 'src/__mock__/service/utils.service';
import { ConfigService } from '@nestjs/config';
import { FirstAccessPasswordAuthDto } from 'src/common/dtos/auth/firstAccess.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const args = { cpf: '123', password: '123' };

    it('Resolve: Deve resolver retornando payload', async () => {
      const mockUser = {
        id: '1',
        nome: 'Fulano',
        matricula: '123',
        cpf: args.cpf,
        email: 'teste@teste.com',
        perfilFuncionalId: 99,
        perfilFuncional: {
          unidade: { id: 1, nome: 'Unidade X', sigla: 'UX' },
          setor: { id: 2, nome: 'Setor Y', sigla: 'SY' },
          area: { id: 3, nome: 'Area Z' },
          cargo: { id: 4, nome: 'Cargo A' },
        },
      };

      const mockAccess = {
        senha: args.password,
        ultimoLogin: null,
      };

      const expectedResponse: LoginAuthResponseDto = {
        token: 'um-token',
        tipo: 'Bearer',
        expira_em_milisegundos: expect.any(Number),
        valido_ate_timestamp: expect.any(Number),
        usuario: {
          id: '1',
          nome: 'Fulano',
          matricula: '123',
          cpf: args.cpf,
          email: 'teste@teste.com',
          perfilFuncional: mockUser.perfilFuncional,
        },
        ultimo_login: null,
      };

      prismaMock.usuario.findUnique.mockResolvedValue(mockUser as any);
      prismaMock.acesso.findUnique.mockResolvedValue(mockAccess as any);
      configServiceMock.getOrThrow.mockReturnValue('1h');
      jwtServiceMock.signAsync.mockResolvedValue(expectedResponse.token);
      await expect(service.login(args)).resolves.toEqual(expectedResponse);
      expect(jwtServiceMock.signAsync).toHaveBeenCalled();
    });

    it('Reject: Deve rejeitar com erro do prisma/usuario lançando no payload', async () => {
      const expectedResponse = new Error('error');

      prismaMock.usuario.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });
    it('Reject: Deve rejeitar com erro do prisma/acesso lançando no payload', async () => {
      const expectedResponse = new Error('error');

      prismaMock.usuario.findUnique.mockResolvedValue('success' as any);
      prismaMock.acesso.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });

    it('Reject: Deve rejeitar ao não encontrar um usuario com mensagem de erro', async () => {
      const expectedResponse = 'Usuário ou senha incorretos.';
      prismaMock.usuario.findUnique.mockResolvedValue(null);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });

    it('Reject: Deve rejeitar com senhas diferentes com mensagem de erro', async () => {
      const expectedResponse = 'Usuário ou senha incorretos.';

      prismaMock.usuario.findUnique.mockResolvedValue('success' as any);
      prismaMock.acesso.findUnique.mockResolvedValue({
        senha: 'senha-diferente',
      } as any);

      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });
  });

  describe('firstAccess', () => {
    const args: FirstAccessPasswordAuthDto = {
      userId: '0000000000',
      newPassword: 'nova-senha',
    };
    it('Resolve: Deve resolver retornando payload', async () => {
      const expectedResponse = { message: 'success' } as any;

      prismaMock.usuario.findUnique.mockResolvedValue({
        id: args.userId,
      } as any);

      prismaMock.acesso.findUnique.mockResolvedValue({
        ultimoLogin: null,
      } as any);

      prismaMock.acesso.update.mockResolvedValue({ message: 'success' } as any);

      // --- executa só uma vez ---
      const result = await service.firstAccess(args);

      // valida retorno
      expect(result).toEqual(expectedResponse);

      // valida chamadas do prisma

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: args.userId },
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prismaMock.acesso.findUnique).toHaveBeenCalledWith({
        where: { usuarioId: args.userId },
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prismaMock.acesso.update).toHaveBeenCalledWith({
        where: { usuarioId: args.userId },
        data: { senha: args.newPassword },
      });
    });

    it('Reject: Deve rejeitar caso não encontre usuario com jogando mensagem de erro', async () => {
      const expectedResponse = 'Usuario não encontrado';
      prismaMock.usuario.findUnique.mockResolvedValue(null);

      await expect(service.firstAccess(args)).rejects.toThrow(expectedResponse);
    });

    it('Reject: Deve rejeitar caso não prisma/acesso dê erro com jogando mensagem de erro', async () => {
      const expectedResponse = 'erro generico';
      prismaMock.usuario.findUnique.mockResolvedValue({ id: 'um-id' } as any);
      prismaMock.acesso.update.mockRejectedValue(new Error(expectedResponse));

      await expect(service.firstAccess(args)).rejects.toThrow(expectedResponse);
    });
  });
});
