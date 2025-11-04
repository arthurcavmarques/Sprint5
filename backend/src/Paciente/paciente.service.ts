import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { Paciente } from './paciente';
import { UpdatePatientDto } from './atualizar.paciente';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}

  async create(data: Paciente) {
    return this.prisma.paciente.create({ data });
  }

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: string) {
    return this.prisma.paciente.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePatientDto) {
    return this.prisma.paciente.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.paciente.delete({ where: { id } });
  }

}
