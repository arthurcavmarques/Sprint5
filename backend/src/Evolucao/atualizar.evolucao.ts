import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEvolucaoDTO {
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
        pacienteId: number;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
        titulo: string;
    @IsOptional()
    @IsDateString()
        data: Date;
    @IsDateString()
    @IsOptional()
        horarioInicio: Date;
    @IsOptional()
    @IsString()
    @IsNotEmpty()
        descricao: string;
}