import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoDTO } from './evolucao';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';

@Controller()
export class EvolucaoController {
  constructor(private readonly evoulacaoService: EvolucaoService) {}

  @Post('evolucoes')
  async create(@Body() req: EvolucaoDTO) {
    return await this.evoulacaoService.create(req)
  }

  @Get('evolucoes')
  async listAll() {
    return await this.evoulacaoService.listAll()
  }

  @Get('evolucoes/:id')
  async searchById(@Param('id') id : number) {
    return await this.evoulacaoService.searchById(id)
  }

  @Patch('evolucoes/:id')
  async updateEvolucao(@Body() req : UpdateEvolucaoDTO, @Param('id') id : number) {
      return await this.evoulacaoService.updateEvolucao(req, id)
  }

  @Delete('evolucoes/:id')
  async deleteEvolucao(@Param('id') id : number) {
    return this.evoulacaoService.deleteEvolucao(id)
  }
}