import { Injectable } from '@nestjs/common';

@Injectable()
export class PacienteService {
  getHello(): string {
    return 'Hello World!';
  }
}
