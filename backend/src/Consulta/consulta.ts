import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";


export class ConsultaDTO {
    @IsInt()
    @IsNotEmpty()
        pacienteId: number;
    @IsDateString()
        dataEvento: Date;
    @IsNotEmpty()
    @IsString()
        nomeEvento: string;
    @IsDateString()
    @IsNotEmpty()
        horarioInicio: Date;
    @IsDateString()
    @IsNotEmpty()
        horarioFim: Date;
}