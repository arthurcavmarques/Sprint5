import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { Paciente } from './paciente';
import { AtualizarPaciente } from './atualizar.paciente';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}

 async create(data: Paciente) {
  const existente = await this.prisma.paciente.findUnique({
    where: { cpf: data.cpf },
  });

  if (existente) {
    throw new Error(`Já existe um paciente com o CPF ${data.cpf}.`);
  }

  return this.prisma.paciente.create({ data });
}


  async searchByName(nomeCompleto: string) {
    return this.prisma.paciente.findMany({
      where: { nomeCompleto: { contains: nomeCompleto, mode: 'insensitive' } },
    });
  }

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id: id } });

    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }

    return paciente;
  }

  async update(id: number, data: AtualizarPaciente) {
    try {
      return await this.prisma.paciente.update({ where: { id: id }, data });
    } catch {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.paciente.delete({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }
  }

}
