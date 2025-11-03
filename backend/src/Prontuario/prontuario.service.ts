import { Injectable } from '@nestjs/common';

@Injectable()
export class ProntuarioService {
  getHello(): string {
    return 'Hello World!';
  }
}
