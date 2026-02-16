import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDTO, UpateUserDTO } from './user.DTO';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'luisferdeveloper@gmail.com',
    },
    {
      id: '2',
      name: 'Luis Cadena',
      email: 'wallpapersss@gmail.com',
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string) {
    const userPosition = this.positionById(id);
    const user = this.users[userPosition];
    if (user.id === '1') {
      throw new ForbiddenException(
        `El usuario con id ${id} No tiene permisos para acceder a esta información`,
      );
    }
    return user;
  }

  createUser(@Body() body: CreateUserDTO) {
    //const idNew = (this.users.length + 1).toString();
    const idNew = new Date().getTime().toString();
    const emailNew = body.email;
    if (emailNew && !emailNew.includes('@')) {
      throw new UnprocessableEntityException(
        `El correo ${emailNew} no es válido`,
      );
    }
    body.id = idNew;
    this.users.push(body);
    return body;
  }

  deleteUser(id: string) {
    const position = this.positionById(id);
    this.users.splice(position, 1);
    return { message: `El usuario con id ${id} ha sido eliminado` };
  }

  updateUser(id: string, body: UpateUserDTO) {
    const position = this.positionById(id);
    const emailNew = body.email;
    if (emailNew && !emailNew.includes('@')) {
      throw new UnprocessableEntityException(
        `El correo ${emailNew} no es válido`,
      );
    }
    const currentData = this.users[position];
    const updatedUser = {
      ...currentData,
      ...body,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  private positionById(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`El usuario con id ${id} No existe.`);
    }
    return position;
  }
}
