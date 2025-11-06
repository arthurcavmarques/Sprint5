import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class EvolucaoDTO {
    @IsInt()
    @IsNotEmpty()
        pacienteId: number;
    @IsNotEmpty()
    @IsString()
        titulo: string;
    @IsDateString()
        data: Date;
    @IsDateString()
        horaInicio: Date;
    @IsString()
    @IsNotEmpty()
        descricao: string;
}