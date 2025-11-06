import { IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class Paciente {
    @IsNotEmpty()
    @IsString()
        nomeCompleto: string;
        
    @IsNotEmpty()
    @IsDateString()
        dataNascimento: Date;

    @IsPhoneNumber()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
        telefone: string;

    @IsNotEmpty()
    @IsEmail()
        email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
        cpf: string;
}