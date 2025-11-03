import { Controller, Get } from '@nestjs/common';
import { ConsultaService } from './consulta.service';

@Controller()
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get()
  getHello(): string {
    return this.consultaService.getHello();
  }
}