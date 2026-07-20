import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UsuarioDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  nome: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  senha: string;
}
