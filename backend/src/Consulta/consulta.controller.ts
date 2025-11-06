import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaDTO } from './consulta';
import { updateConsultaDto } from './consulta.update';


@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    const consulta = this.consultaService.findId(id);
    
    if(!consulta){
      throw new NotFoundException(`Consulta com ID ${id} não encontrada.`);
    }
    return consulta;
  }
  
  @Get()
  findAll() {
    return this.consultaService.findAll();
  }
  
  @Post()
  create(@Body() createConsultaDto: ConsultaDTO) {
    return this.consultaService.create(createConsultaDto);
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateConsultaDto: updateConsultaDto) {
    return this.consultaService.update(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consultaService.remove(id);
  }
}