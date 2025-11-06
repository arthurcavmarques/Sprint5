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
  async findOne(@Param('id') id: number) {

    const paciente = await this.pacienteService.findOne(id);

    if(!paciente){
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }

    return paciente;

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