// 1. DTOs auxiliares para objetos aninhados (Garantes que o Swagger gere o schema correto)
class UnidadeResponseDto {
  id: number;
  nome: string;
  sigla: string | null;
}

class SetorResponseDto {
  id: number;
  nome: string;
  sigla: string | null;
}

class CargoResponseDto {
  id: number;
  nome: string;
}

class AreaResponseDto {
  id: number;
  nome: string;
}

class HistoricoSolicitacaoResponseDto {
  id: number;
  solcitacaoId: number;
  evento: string;
  observacao: string | null;
  categoria: string; // Ex: 'SUCESSO', 'INFO'
  criadoEm: Date | null;
  atualizadoEm: Date | null;
  autorId: string;
}

// 3. DTO Principal corrigido
export class UserRequestFindOneResponseDto {
  id: number;

  statusSolicitacao: string;

  usuarioSolicitadoNome: string;

  matricula: string;

  cpf: string;

  dataNascimento: Date;

  email: string;

  telefone: string;

  detalhe?: string;

  feedbackResultado?: string | null;

  criadoEm: Date | null;

  atualizadoEm: Date | null;

  unidade: UnidadeResponseDto;

  setor: SetorResponseDto;

  cargo: CargoResponseDto;

  area?: AreaResponseDto | null;

  historicoSolicitacao: HistoricoSolicitacaoResponseDto[];
}
