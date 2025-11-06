import { IsOptional,IsNotEmpty,MinLength, IsString, IsEmail, MaxLength, IsDateString, IsPhoneNumber } from 'class-validator';

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
  @MaxLength(11)
  @IsPhoneNumber()
  telefone?: string;

  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsDateString()
  DataNascimento?: Date;

}
