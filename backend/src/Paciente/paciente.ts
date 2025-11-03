import { IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class Paciente {
    @IsNotEmpty()
    @IsString()
        nomeCompleto: string;
    @IsNotEmpty()
    @IsDateString()
        dataNascimento: Date;
    @IsPhoneNumber()
    @IsNotEmpty()
        telefone: string;
    @IsNotEmpty()
    @IsEmail()
        email: string;
    @IsNotEmpty()
        cpf: string;
}