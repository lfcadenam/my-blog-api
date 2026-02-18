import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './dtos/user.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find({
      relations: ['profile'],
    });
  }

  async getProfileByUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} No existe.`);
    }
    return user.profile;
  }

  async getPostsByUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user.posts;
  }

  async getUserById(id: number) {
    const user = await this.userById(id);
    if (user.id === 1) {
      throw new ForbiddenException(
        `El usuario con id ${id} No tiene permisos para acceder a esta información`,
      );
    }
    return user;
  }

  async createUser(body: CreateUserDTO) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException('Error creando el usuario.');
    }
  }

  async deleteUser(id: number) {
    const user = await this.userById(id);
    await this.usersRepository.delete(user.id);
    return { message: `El usuario con id ${id} ha sido eliminado` };
  }

  async updateUser(id: number, body: UpdateUserDTO) {
    try {
      const user = await this.userById(id);
      const updatedUser = this.usersRepository.merge(user, body);
      await this.usersRepository.save(updatedUser);
      return updatedUser;
    } catch {
      throw new BadRequestException('Error actualizando el usuario.');
    }
  }

  private async userById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} No existe.`);
    }
    return user;
  }

  async getUserProfile(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} No existe.`);
    }
    return user.profile;
  }
}
