import { IsOptional, IsString } from 'class-validator';

export class FindAllParametrosDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  local?: string;
}
