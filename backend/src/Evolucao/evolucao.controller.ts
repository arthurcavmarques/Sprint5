import { Controller, Get } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';

@Controller()
export class EvolucaoController {
  constructor(private readonly evoulacaoService: EvolucaoService) {}

  @Get()
  getHello(): string {
    return this.evoulacaoService.getHello();
  }
}