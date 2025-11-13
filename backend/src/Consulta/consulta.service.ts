import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { ConsultaDTO } from './consulta';
import { updateConsultaDto } from './consulta.update';
import dayjs from 'dayjs';

@Injectable()
export class ConsultaService {
  constructor(private prisma: PrismaService) {}

  async create(data: ConsultaDTO) {
    const dataISO = dayjs(data.dataEvento, 'DD/MM/YYYY').toDate();
    const horaInicioISO = dayjs(`${data.dataEvento} ${data.horarioInicio}`, 'DD/MM/YYYY HH:mm').toDate();
    const horaFinalISO = dayjs(`${data.dataEvento} ${data.horarioFim}`, 'DD/MM/YYYY HH:mm').toDate();

    const consulta = await this.prisma.consulta.create ({  
      data : {
        ...data,
        dataEvento: dataISO,
        horarioInicio: horaInicioISO,
        horarioFim: horaFinalISO,
      } 
    });

    return {
      id : consulta.id,
      dataEvento : data.dataEvento,
      nomeEvento : consulta.nomeEvento,
      horarioInicio : data.horarioInicio,
      horarioFim : data.horarioFim
    }
  }

  async findId(id: number) {
    return this.prisma.consulta.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.consulta.findMany();
  }
  async remove(id: number) {
    return this.prisma.consulta.delete({ where: { id } });
  }
  async update(id: number, updateConsultaDto: updateConsultaDto) {
    return this.prisma.consulta.update({ where: { id:id }, data: updateConsultaDto });
  }

}
