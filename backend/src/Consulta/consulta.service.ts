import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { ConsultaDTO } from './consulta';
import { updateConsultaDto } from './consulta.update';

@Injectable()
export class ConsultaService {
  constructor(private prisma: PrismaService) {}

  async create(data: ConsultaDTO) {
    return this.prisma.consulta.create({ data });
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
