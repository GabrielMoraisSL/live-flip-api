import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PostagemUsuarioDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  nome: string;
}

export class PostagemConquistaDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  base: string;

  @IsNumber()
  @IsOptional()
  pontuacao: number;
}

export class PostagemDto {
  @IsUUID()
  id: string;

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
  usuarioId: string;

  @ValidateNested()
  @Type(() => PostagemUsuarioDto)
  @IsOptional()
  usuario?: PostagemUsuarioDto;

  @IsUUID()
  @IsOptional()
  conquistaId?: string;

  @ValidateNested()
  @Type(() => PostagemConquistaDto)
  @IsOptional()
  conquista?: PostagemConquistaDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostagemUsuarioDto)
  @IsOptional()
  curtidas?: PostagemUsuarioDto[];

  @IsDateString()
  criadoEm: string;

  @IsDateString()
  atualizadoEm: string;
}
