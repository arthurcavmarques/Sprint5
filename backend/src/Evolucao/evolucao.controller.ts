import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoDTO } from './evolucao';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';

@Controller()
export class EvolucaoController {
  constructor(private readonly evolucaoService: EvolucaoService) {}

  @Post('evolucao')
  async create(@Body() req: EvolucaoDTO) {
    return await this.evolucaoService.create(req)
  }

  @Get('evolucao')
  async listAll() {
    return await this.evolucaoService.listAll()
  }

  @Get('evolucao/:id')
  async searchById(@Param('id', ParseIntPipe)  id : number) {
    return await this.evolucaoService.searchById(id)
  }

  @Patch('evolucao/:id')
  async updateEvolucao(@Body() req : UpdateEvolucaoDTO, @Param('id', ParseIntPipe) id : number) {
      return await this.evolucaoService.updateEvolucao(req, id)
  }

  @Delete('evolucao/:id')
  async deleteEvolucao(@Param('id', ParseIntPipe) id : number) {
    return this.evolucaoService.deleteEvolucao(id)
  }
}