import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayLoad } from '../models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userJwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }

  generateToken(user: User) {
    const payLoad: PayLoad = { sub: user.id };
    return this.userJwt.sign(payLoad);
  }
}
