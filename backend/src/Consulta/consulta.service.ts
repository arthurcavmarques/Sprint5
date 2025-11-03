import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsultaService {
  getHello(): string {
    return 'Hello World!';
  }
}
