import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import { LoginAuthDto } from 'src/controller/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /** Rota para realizar login no sistema */
  @Post('login')
  async login(@Body() payload: LoginAuthDto) {
    const { cpf, senha } = payload;
    return await this.authService.login({ cpf, password: senha });
  }
}
