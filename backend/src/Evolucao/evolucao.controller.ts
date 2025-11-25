import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoDTO } from './evolucao';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';

@Controller('evolucao')
export class EvolucaoController {
  constructor(private readonly evolucaoService: EvolucaoService) {}

  @Post()
  async create(@Body() req: EvolucaoDTO) {
    return await this.evolucaoService.create(req)
  }

  @Get()
  async listAll() {
    return await this.evolucaoService.listAll()
  }

  @Get(':id')
  async searchById(@Param('id', ParseIntPipe)  id : number) {
    return await this.evolucaoService.searchById(id)
  }

  @Patch(':id')
  async updateEvolucao(@Body() req : UpdateEvolucaoDTO, @Param('id', ParseIntPipe) id : number) {
      return await this.evolucaoService.updateEvolucao(req, id)
  }

  @Delete(':id')
  async deleteEvolucao(@Param('id', ParseIntPipe) id : number) {
    return this.evolucaoService.deleteEvolucao(id)
  }
}