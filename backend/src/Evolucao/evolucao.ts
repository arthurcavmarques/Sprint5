import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class EvolucaoDTO {
    @IsInt()
    @IsNotEmpty()
        pacienteId: number;
    @IsNotEmpty()
    @IsString()
        titulo: string;
    @IsDateString()
        data: string;
    @IsDateString()
        horaInicio: string;
    @IsString()
    @IsNotEmpty()
        descricao: string;
}