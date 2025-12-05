import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import { LoginAuthDto } from 'src/controller/auth/dto/login.dto';
import { UpdatePasswordAuthDto } from './dto/updatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /** Realizar login no sistema */
  @Post('login')
  async login(@Body() payload: LoginAuthDto) {
    const { cpf, senha } = payload;
    return await this.authService.login({ cpf, password: senha });
  }
  /** Mudar Senha  */
  @Post('update/password')
  async updatePassword(@Body() payload: UpdatePasswordAuthDto) {
    const { cpf, newPassword } = payload;

    return await this.authService.changePassword({ cpf, newPass: newPassword });
  }
}
