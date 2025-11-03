import { Module } from '@nestjs/common';
import { ProntuarioController } from './prontuario.controller';
import { ProntuarioService } from './prontuario.service';

@Module({
  imports: [],
  controllers: [ProntuarioController],
  providers: [ProntuarioService],
})
export class ProntuarioModule {}
