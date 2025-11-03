import { Injectable } from '@nestjs/common';

@Injectable()
export class EvolucaoService {
  getHello(): string {
    return 'Hello World!';
  }
}
