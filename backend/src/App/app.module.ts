import { Module } from '@nestjs/common';
import { PacienteModule } from '../Paciente/paciente.module';
import { ConsultaModule } from '../Consulta/consulta.module';
import { EvolucaoModule } from '../Evolucao/evolucao.module';

@Module({
  imports: [ConsultaModule, PacienteModule, EvolucaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
