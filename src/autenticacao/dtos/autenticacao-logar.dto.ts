import { IsString } from 'class-validator';

export class AutenticacaoLogarDto {
  @IsString()
  nome: string;

  @IsString()
  senha: string;
}
