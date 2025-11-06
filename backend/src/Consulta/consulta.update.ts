import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class updateConsultaDto {
    @IsOptional()
    @IsInt()
    pacienteId?: number;

    @IsOptional()
    @IsDateString()
    dataEvento?: Date;

    @IsOptional()
    @IsString()
    nomeEvento?: string;

    @IsDateString()
    @IsOptional()
    horarioInicio?: Date;
    
    @IsDateString()
    @IsOptional()
    horarioFim?: Date;

}
