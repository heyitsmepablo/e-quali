import { Controller, Get } from '@nestjs/common';
import { UserRequestService } from 'src/service/user/user-request/user-request.service';

@Controller('user-request')
export class UserRequestController {
  constructor(private userRequestService: UserRequestService) {}
  @Get()
  async findMany() {
    return await this.userRequestService.listMany();
  }
}
