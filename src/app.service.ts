import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Luisfernando, bienvenido a tu API de Blog!!';
  }
}
