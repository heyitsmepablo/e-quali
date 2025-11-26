/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { prismaMock } from 'src/__mock__/singleton/prisma-singleton';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const args = { cpf: '123', password: '123' };

    it('Resolve: Deve resolver retornando payload', async () => {
      const expectedResponse = { message: 'success' } as any;

      prismaMock.usuario.findUnique.mockResolvedValue(expectedResponse);
      prismaMock.acesso.findUnique.mockResolvedValue({
        senha: args.password,
      } as any);

      await expect(service.login(args)).resolves.toEqual(expectedResponse);
    });

    it('Reject: Deve rejeitar com erro do prisma/usuario lançando no payload', async () => {
      const expectedResponse = new Error('error');

      prismaMock.usuario.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.login(args)).rejects.toBeInstanceOf(Error);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });
    it('Reject: Deve rejeitar com erro do prisma/acesso lançando no payload', async () => {
      const expectedResponse = new Error('error');

      prismaMock.usuario.findUnique.mockResolvedValue('success' as any);
      prismaMock.acesso.findUnique.mockRejectedValue(expectedResponse);
      await expect(service.login(args)).rejects.toBeInstanceOf(Error);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });

    it('Reject: Deve rejeitar ao não encontrar um usuario com mensagem de erro', async () => {
      const expectedResponse = 'Usuário ou senha incorretos.';
      prismaMock.usuario.findUnique.mockResolvedValue(null);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
      await expect(service.login(args)).rejects.toBeInstanceOf(Error);
    });

    it('Reject: Deve rejeitar com senhas diferentes com mensagem de erro', async () => {
      const expectedResponse = 'Usuário ou senha incorretos.';

      prismaMock.usuario.findUnique.mockResolvedValue('success' as any);
      prismaMock.acesso.findUnique.mockResolvedValue({
        senha: 'senha-diferente',
      } as any);

      await expect(service.login(args)).rejects.toBeInstanceOf(Error);
      await expect(service.login(args)).rejects.toThrow(expectedResponse);
    });
  });
});
