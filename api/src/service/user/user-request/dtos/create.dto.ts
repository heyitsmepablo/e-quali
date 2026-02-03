import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiHideProperty()
  @IsUUID()
  @IsOptional()
  usuarioSolicitanteId: string = 'cd53f46d-11a3-4450-8765-90cb82b652d3';
  @IsString()
  usuarioSolicitadoNome: string = 'Guilherme Jaquison';
  @IsString()
  matricula: string = '123456';
  @IsInt()
  unidadeId: number = 1;
  @IsInt()
  setorId: number = 1;
  @IsInt()
  @IsOptional()
  areaId?: number = undefined;
  @IsInt()
  cargoId: number = 1;
  @IsString()
  cpf: string = '12345687910';
  @Type(() => Date)
  @IsDate()
  dataNascimento: Date = new Date(Date.now());
  @IsEmail()
  email: string = 'test@test.com';
  @IsString()
  @IsPhoneNumber('BR')
  telefone: string = '98991085854';
  @IsString()
  detalhe: string = 'um detalhe ficiticio aqui';
}
