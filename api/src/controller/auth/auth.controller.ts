import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import {
  LoginAuthDto,
  LoginAuthResponseDto,
} from 'src/common/dtos/auth/login.dto';
import {
  UpdatePasswordAuthDto,
  UpdatePasswordAuthResponseDto,
} from '../../common/dtos/auth/updatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Realiza o Login do Usuário
   * @returns Retorna um objeto contendo o token de acesso e dados básicos do usuário.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginAuthDto): Promise<LoginAuthResponseDto> {
    console.log('request payload: ' + JSON.stringify(payload, null, 2));
    const { cpf, senha } = payload;
    return await this.authService.login({ cpf, password: senha });
  }

  /** Mudar Senha  */
  @Post('update/password')
  async updatePassword(
    @Body() payload: UpdatePasswordAuthDto,
  ): Promise<UpdatePasswordAuthResponseDto> {
    const { cpf, newPassword } = payload;
    return await this.authService.changePassword({ cpf, newPass: newPassword });
  }
}
