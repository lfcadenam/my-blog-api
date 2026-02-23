import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.DTO';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id/profile')
  getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProfile(id);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get(':id/posts')
  getPosts(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getPostsByUserId(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.userService.updateUser(id, body);
  }
}
