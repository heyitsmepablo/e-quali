import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserRequestDto } from 'src/service/user/user-request/dtos/create.dto';
import { UserRequestFindOneResponseDto } from 'src/service/user/user-request/dtos/findOne.dto';
import { UserRequestService } from 'src/service/user/user-request/user-request.service';

@Controller('user-request')
export class UserRequestController {
  constructor(private userRequestService: UserRequestService) {}
  @Get()
  async findMany() {
    return await this.userRequestService.listMany();
  }

  @Post('create')
  async create(@Body() data: CreateUserRequestDto) {
    return await this.userRequestService.create(data);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) requestId: number,
  ): Promise<UserRequestFindOneResponseDto> {
    return await this.userRequestService.findOne(requestId);
  }
}
