import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserRequestDto, userListDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserRequestDto) {
    console.log(dto);
    return this.userService.createUser(dto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateUserRequestDto>,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Get('list')
  async getUserList(@Query() dto: userListDto) {
    return this.userService.getUserList(dto);
  }

  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserDetails(id);
  }
}
