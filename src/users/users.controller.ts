import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, UpateUserDTO } from './user.DTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpateUserDTO) {
    return this.userService.updateUser(id, body);
  }
}
