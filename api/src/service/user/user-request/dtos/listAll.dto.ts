import { IsDate, IsInt, IsString } from 'class-validator';

export class ListAllUserRequestResponseDto {
  @IsInt()
  id: number = 0;
  @IsString()
  usuarioSolicitado: string = 'Pablo Eduardo';
  @IsString()
  unidade: string = 'SEMUS';
  @IsString()
  setor: string = 'SUPQUALI';
  @IsString()
  cargo: string = 'ANALISTA TECNICO';
  @IsString()
  status: string = 'PENDENTE';
  @IsDate()
  criadoEm: Date = new Date(Date.now());
}
