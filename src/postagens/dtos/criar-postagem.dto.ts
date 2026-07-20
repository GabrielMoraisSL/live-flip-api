import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CriarPostagemDto {
  @IsString()
  @MinLength(5)
  @MaxLength(256)
  titulo: string;

  @IsString()
  @MinLength(5)
  @MaxLength(256)
  local: string;

  @IsString()
  midia: string;

  @IsUUID()
  @IsOptional()
  conquistaId?: string;
}
