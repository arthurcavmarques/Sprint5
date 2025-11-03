import { Controller, Get } from '@nestjs/common';
import { PacienteService } from './paciente.service';

@Controller()
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  getHello(): string {
    return this.pacienteService.getHello();
  }
}