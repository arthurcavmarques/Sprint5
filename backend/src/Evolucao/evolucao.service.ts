import { Injectable, NotFoundException } from '@nestjs/common';
import { EvolucaoDTO } from './evolucao';
import { PrismaService } from '../Prisma/prisma.service';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';
import dayjs from 'dayjs';

@Injectable()
export class EvolucaoService {
  constructor(private prismaService: PrismaService) {}

  async create(req: EvolucaoDTO) {
    const dataISO = dayjs(req.data, 'DD/MM/YYYY').toDate();
    const horaISO = dayjs(` ${req.data} ${req.horaInicio}`, 'DD/MM/YYYY HH:mm').toDate();

    const evolucao = await this.prismaService.evolucao.create({
      data: {
        ...req,
        data : dataISO,
        horaInicio : horaISO,
      },
    });

    return {
      id: evolucao.id,
      titulo: evolucao.titulo,
      data: req.data,
      horaInicio: req.horaInicio,
      descricao: evolucao.descricao,
    };
  }

  async listAll() {
    return await this.prismaService.evolucao.findMany() 
  }

  async searchById(id : number) {
    const evolucao = await this.prismaService.evolucao.findUnique({
        where: {
            id : id
        }
    })

    if(evolucao == null) {
        throw new NotFoundException('Evolucao nao encontrada')
    }
    
    return evolucao
  }

  async updateEvolucao(req : UpdateEvolucaoDTO, id : number) {
     const evolucao = await this.prismaService.evolucao.update({
    where: {
      id: id,
    },
    data: {
      ...req,
    },
  });

    if(evolucao == null) {
        throw new NotFoundException('Evolucao nao encontrada')
    }
    
    return evolucao
  }

  async deleteEvolucao(id : number) {
    const evolucao = this.prismaService.evolucao.delete({
      where: {
          id : id
      }
    })

    if(evolucao == null) {
        throw new NotFoundException('Evolucao nao encontrada')
    }

    return evolucao
  }
}
