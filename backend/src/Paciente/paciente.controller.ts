import { Controller, Get, NotFoundException, Param, Post, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente';
import { AtualizarPaciente } from './atualizar.paciente';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pacienteService.findOne(id);
  } 

  @Get(':nome')
  searchByName(@Param('nome') nomeCompleto: string) {
    return this.pacienteService.searchByName(nomeCompleto);
  }
  
  @Post()
  create(@Body() createPacienteDto: Paciente) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePacienteDto: AtualizarPaciente) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pacienteService.remove(id);
  }

}