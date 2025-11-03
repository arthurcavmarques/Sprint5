import { Controller, Get } from '@nestjs/common';
import { ProntuarioService } from './prontuario.service';

@Controller()
export class ProntuarioController {
  constructor(private readonly prontuarioService: ProntuarioService) {}

  @Get()
  getHello(): string {
    return this.prontuarioService.getHello();
  }
}