import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostagemDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  conquista?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(256)
  titulo: string;

  // user: string;

  @IsString()
  @MinLength(5)
  @MaxLength(256)
  local: string;

  @IsArray()
  @IsNumber({}, { each: true })
  curtidas: number[];

  @IsString()
  midia: string;
}
