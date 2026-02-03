import { Injectable } from '@nestjs/common';
import PrismaSingleton from 'src/singleton/prisma-singleton';
import { CreateUserRequestDto } from './dtos/create.dto';
import { ListManyUserRequestResponseDto } from './dtos/listMany.dto';
import { EventoSolicitacao } from './user-request.enum';

@Injectable()
export class UserRequestService {
  #database = PrismaSingleton.instance.client;

  private async registrarHistorico(
    solicitacaoId: number,
    autorId: string,
    evento: EventoSolicitacao,
    categoria: 'SUCESSO' | 'INFO' | 'ALERTA',
    observacao?: string,
  ) {
    await this.#database.historicoSolicitacaoUsuario.create({
      data: {
        solicitacaoUsuario: { connect: { id: solicitacaoId } },
        autor: { connect: { id: autorId } },
        evento,
        categoria,
        observacao,
      },
    });
  }
  async create(data: CreateUserRequestDto) {
    try {
      // Desestruturamos para separar os IDs das relações dos dados comuns
      const {
        usuarioSolicitanteId,
        unidadeId,
        setorId,
        cargoId,
        areaId,
        ...restanteDosDados
      } = data;

      // Se o ID vier undefined do DTO, usamos um ID padrão (EXISTENTE NO SEU BANCO) para teste
      const solicitanteId =
        usuarioSolicitanteId || 'cd53f46d-11a3-4450-8765-90cb82b652d3';

      const newRequest = await this.#database.solicitacaoUsuario.create({
        data: {
          ...restanteDosDados,
          statusSolicitacao: 'PENDENTE',
          usuario: { connect: { id: solicitanteId } },
          unidade: { connect: { id: unidadeId } },
          setor: { connect: { id: setorId } },
          cargo: { connect: { id: cargoId } },
          ...(areaId && { area: { connect: { id: areaId } } }),
        },
      });

      // LOG: "Solicitação criada por você"
      await this.registrarHistorico(
        newRequest.id,
        newRequest.usuarioSolicitanteId, // Quem criou
        EventoSolicitacao.CRIADO,
        'SUCESSO',
      );

      // LOG: "Aguardando análise" (Imediatamente após, estado inicial)
      await this.registrarHistorico(
        newRequest.id,
        newRequest.usuarioSolicitanteId, // Ou ID do sistema
        EventoSolicitacao.AGUARDANDO_ANALISE,
        'INFO',
      );

      return newRequest;
    } catch (error) {
      console.error('Erro ao criar solicitação:', error);
      throw error; // Importante retonar o erro para o NestJS tratar
    }
  }

  async listMany(): Promise<ListManyUserRequestResponseDto[]> {
    const dbResponse = await this.#database.solicitacaoUsuario.findMany({
      select: {
        id: true,
        usuarioSolicitadoNome: true,
        unidade: { select: { id: true, nome: true, sigla: true } },
        setor: { select: { id: true, nome: true, sigla: true } },
        area: { select: { id: true, nome: true } },
        cargo: { select: { id: true, nome: true } },
        statusSolicitacao: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
    return dbResponse;
  }

  async findOne(id: number) {
    const requestDetails = await this.#database.solicitacaoUsuario.findUnique({
      where: { id },
      select: {
        id: true,
        statusSolicitacao: true,
        usuarioSolicitadoNome: true,
        matricula: true,
        unidade: { select: { id: true, nome: true, sigla: true } },
        setor: { select: { id: true, nome: true, sigla: true } },
        area: { select: { id: true, nome: true } },
        cargo: { select: { id: true, nome: true } },
        cpf: true,
        dataNascimento: true,
        email: true,
        telefone: true,
        detalhe: true,
        feedbackResultado: true,
        usuarioFinal: true,
        historicoSolicitacaoUsuarios: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
    return requestDetails;
  }
}
