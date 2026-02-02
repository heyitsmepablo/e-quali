import { Injectable } from '@nestjs/common';
import PrismaSingleton from 'src/singleton/prisma-singleton';
import { CreateUserRequestDto } from './dtos/create.dto';

@Injectable()
export class UserRequestService {
  #database = PrismaSingleton.instance.client;
  async create(data: CreateUserRequestDto) {
    const { areaId, setorId, unidadeId, ...rest } = data;
    return await this.#database.solicitacaoUsuario.create({
      data: {
        cpf: data.cpf,
        dataNascimento: data.dataNascimento,
        detalhe: data.detalhe,
        email: data.email,
        telefone: data.telefone,
        matricula: data.matricula,
        statusSolicitacao: 'PENDENTE',
        usuarioSolicitadoNome: data.usuarioSolicitadoNome,
      },
    });
  }
  async listMany() {
    const dbResponse = await this.#database.solicitacaoUsuario.findMany({
      select: {
        id: true,
        usuarioSolicitadoNome: true,
        unidade: { select: { nome: true, sigla: true } },
        setor: { select: { nome: true, sigla: true } },
        area: { select: { nome: true } },
        cargo: { select: { nome: true } },
        statusSolicitacao: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
    return dbResponse;
  }
}
