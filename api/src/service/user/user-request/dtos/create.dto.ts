import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class CreateUserRequestDto {
  @ApiHideProperty()
  @IsUUID()
  @IsOptional()
  usuarioSolicitante: string = 'cd53f46d-11a3-4450-8765-90cb82b652d3';
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
  areaId?: number;
  @IsString()
  cpf: string = '12345687910';
  @IsDate()
  dataNascimento: Date = new Date(Date.now());
  @IsEmail()
  email: string = 'test@test.com';
  @IsPhoneNumber('BR')
  telefone: number = 98988812374;
  @IsString()
  detalhe: string = 'um detalhe ficiticio aqui';
}
