import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PacienteController],
  providers: [PacienteService, PrismaService],
})
export class PacienteModule {}
