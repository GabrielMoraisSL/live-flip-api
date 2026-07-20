import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AtualizarPostagemDto {
  @IsString()
  @MinLength(5)
  @MaxLength(256)
  @IsOptional()
  titulo?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(256)
  @IsOptional()
  local?: string;

  @IsString()
  @IsOptional()
  midia?: string;

  @IsUUID()
  @IsOptional()
  conquistaId?: string;
}
