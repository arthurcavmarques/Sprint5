import { Module } from '@nestjs/common';
import { EvolucaoController } from './evolucao.controller';
import { EvolucaoService } from './evolucao.service';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  imports: [],
  controllers: [EvolucaoController],
  providers: [EvolucaoService, PrismaService],
})
export class EvolucaoModule {}
