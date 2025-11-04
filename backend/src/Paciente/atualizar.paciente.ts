import { IsOptional,IsNotEmpty,MinLength, IsString, IsEmail, Max, Min, IsNumber } from 'class-validator';

export class UpdatePatientDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nomeCompleto?: string;

 
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(11)
  telefone?: string;

  @IsOptional()
  @MinLength(11)
  cpf?: string;

  @IsOptional()
  @MinLength(8)
  DataNascimento?: Date;

}
