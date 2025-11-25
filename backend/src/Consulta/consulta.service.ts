import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { ConsultaDTO } from './consulta';
import { updateConsultaDto } from './consulta.update';
// REMOVA a linha: import dayjs from 'dayjs';

@Injectable()
export class ConsultaService {
  constructor(private prisma: PrismaService) {}

  async create(data: ConsultaDTO) {
    // 🛑 CORREÇÃO: Removemos a conversão manual com dayjs.
    // O Prisma agora recebe as strings ISO (ex: "2025-11-25T08:00:00.000Z")
    // e converte corretamente para o tipo DateTime do banco de dados.
    
		const consulta = await this.prisma.consulta.create ({  
			data : {
				...data,
			},
			include: { paciente: true },
		});

		// Return a normalized object with the fields the frontend expects
		return {
			id: consulta.id,
			pacienteId: consulta.pacienteId,
			patientName: (consulta as any).paciente?.nomeCompleto ?? null,
			date: consulta.dataEvento?.toISOString().split('T')[0] ?? null,
			nomeEvento: consulta.nomeEvento,
			horarioInicio: consulta.horarioInicio,
			horarioFim: consulta.horarioFim,
		};
  }

	async findId(id: number) {
		const consulta = await this.prisma.consulta.findUnique({ where: { id }, include: { paciente: true } });
		if (!consulta) return null;
		return {
			id: consulta.id,
			pacienteId: consulta.pacienteId,
			patientName: consulta.paciente?.nomeCompleto ?? null,
			date: consulta.dataEvento?.toISOString().split('T')[0] ?? null,
			nomeEvento: consulta.nomeEvento,
			horarioInicio: consulta.horarioInicio,
			horarioFim: consulta.horarioFim,
		};
	}

	async findAll() {
		// Include the related patient and return a small, friendly payload shape
		const consultas = await this.prisma.consulta.findMany({ include: { paciente: true } });
		return (consultas as any[]).map((c) => ({
			id: c.id,
			pacienteId: c.pacienteId,
			patientName: (c as any).paciente?.nomeCompleto ?? null,
			date: c.dataEvento?.toISOString().split('T')[0] ?? null,
			nomeEvento: c.nomeEvento,
			horarioInicio: c.horarioInicio,
			horarioFim: c.horarioFim,
		}));
	}
  async remove(id: number) {
    return this.prisma.consulta.delete({ where: { id } });
  }
  async update(id: number, updateConsultaDto: updateConsultaDto) {
    return this.prisma.consulta.update({ where: { id:id }, data: updateConsultaDto });
  }

}