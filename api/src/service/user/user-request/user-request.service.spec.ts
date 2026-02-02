/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UserRequestService } from './user-request.service';

describe('UserRequestService', () => {
  let service: UserRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRequestService],
    }).compile();

    service = module.get<UserRequestService>(UserRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listAll', () => {
    it('Resolve: Deve retornar lista com estrutura correta', () => {
      const result = service.listAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            usuarioSolicitado: expect.any(String),
            unidade: expect.any(String),
            setor: expect.any(String),
            area: expect.any(String),
            cargo: expect.any(String),
            status: expect.any(String),
            criadoEm: expect.any(Date),
          }),
        ]),
      );
    });
  });
});
