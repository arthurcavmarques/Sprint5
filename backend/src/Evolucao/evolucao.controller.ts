import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoDTO } from './evolucao';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';

@Controller()
export class EvolucaoController {
  constructor(private readonly evoulacaoService: EvolucaoService) {}

  @Post('evolucao')
  async create(@Body() req: EvolucaoDTO) {
    return await this.evoulacaoService.create(req)
  }

  @Get('evolucao')
  async listAll() {
    return await this.evoulacaoService.listAll()
  }

  @Get('evolucao/:id')
  async searchById(@Param('id', ParseIntPipe),  id : number) {
    return await this.evoulacaoService.searchById(id)
  }

  @Patch('evolucao/:id')
  async updateEvolucao(@Body() req : UpdateEvolucaoDTO, @Param('id', ParseIntPipe) id : number) {
      return await this.evoulacaoService.updateEvolucao(req, id)
  }

  @Delete('evolucao/:id')
  async deleteEvolucao(@Param('id', ParseIntPipe) id : number) {
    return this.evoulacaoService.deleteEvolucao(id)
  }
}