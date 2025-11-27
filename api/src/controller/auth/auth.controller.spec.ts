import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginAuthDto } from 'src/controller/auth/dto/login.dto';
import { AuthService } from 'src/service/auth/auth.service';
import { authServiceMock } from 'src/__mock__/service/auth.service';
import { UpdatePasswordAuthDto } from './dto/updatePassword.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('login', () => {
    const requestPayload = new LoginAuthDto();
    it('Resolve: Deve resolver com sucesso retornando mensagem', async () => {
      const expectResponse = { payload: 'seria-um-user-payload' };
      authServiceMock.login.mockResolvedValue(expectResponse);
      await expect(controller.login(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
    it('Reject: Deve rejeitar ao authService dar erro, jogando mensagem', async () => {
      const expectResponse = 'uma mensagem de erro';
      authServiceMock.login.mockRejectedValue(new Error(expectResponse));
      await expect(controller.login(requestPayload)).rejects.toBeInstanceOf(
        Error,
      );
      await expect(controller.login(requestPayload)).rejects.toThrow(
        expectResponse,
      );
    });
  });
  describe('update', () => {
    const requestPayload = new UpdatePasswordAuthDto();
    it('Resolve: Deve resolver com sucesso retornando mensagem', async () => {
      const expectResponse = { message: 'success' };
      authServiceMock.changePassword.mockResolvedValue(expectResponse);
      await expect(controller.updatePassword(requestPayload)).resolves.toEqual(
        expectResponse,
      );
    });
    it('Reject: Deve rejeitar ao authService dar erro, jogando mensagem', async () => {
      const expectResponse = 'uma mensagem de erro';
      authServiceMock.changePassword.mockRejectedValue(
        new Error(expectResponse),
      );
      await expect(
        controller.updatePassword(requestPayload),
      ).rejects.toBeInstanceOf(Error);
      await expect(controller.updatePassword(requestPayload)).rejects.toThrow(
        expectResponse,
      );
    });
  });
});
