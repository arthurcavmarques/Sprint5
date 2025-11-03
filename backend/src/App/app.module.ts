import { Module } from '@nestjs/common';
import { PacienteModule } from '../Paciente/paciente.module';
import { ConsultaModule } from '../Consulta/consulta.module';
import { ProntuarioModule } from '../Prontuario/prontuario.module';

@Module({
  imports: [ConsultaModule, PacienteModule, ProntuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
