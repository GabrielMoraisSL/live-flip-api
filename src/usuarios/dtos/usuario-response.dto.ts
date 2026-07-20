import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UsuarioResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  nome: string;
}
