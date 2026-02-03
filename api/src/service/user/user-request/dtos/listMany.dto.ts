import { IsDate, IsInt, IsString } from 'class-validator';

export class ListManyUserRequestResponseDto {
  @IsInt()
  id: number;
  @IsString()
  usuarioSolicitadoNome: string;
  unidade: { id: number; nome: string; sigla: string | null };
  setor: { id: number; nome: string; sigla: string | null };
  area?: { id: number; nome: string } | null;
  cargo: { id: number; nome: string };
  @IsString()
  statusSolicitacao: string;
  @IsDate()
  criadoEm: Date | null;
  @IsDate()
  atualizadoEm: Date | null;
}
