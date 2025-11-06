import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { Paciente } from './paciente';
import { AtualizarPaciente } from './atualizar.paciente';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}

  async create(data: Paciente) {
    return this.prisma.paciente.create({ data });
  }

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    return this.prisma.paciente.findUnique({ where: { id : id } });
  }

  async update(id: number, data: AtualizarPaciente) {
    return this.prisma.paciente.update({ where: { id : id}, data });
  }

  async remove(id: number) {
    return this.prisma.paciente.delete({ where: { id : id } });
  }

}
