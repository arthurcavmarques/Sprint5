import { Injectable, NotFoundException } from '@nestjs/common';
import { EvolucaoDTO } from './evolucao';
import { PrismaService } from '../Prisma/prisma.service';
import { UpdateEvolucaoDTO } from './atualizar.evolucao';

@Injectable()
export class EvolucaoService {
  constructor(private prismaService: PrismaService) {}

  async create(req: EvolucaoDTO) {
    const evolucao = await this.prismaService.evolucao.create({
      data: {
        ...req,
      },
    });

    return {
      id: evolucao.id,
      titulo: evolucao.titulo,
      data: evolucao.data,
      horaInicio: evolucao.horaInicio,
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
