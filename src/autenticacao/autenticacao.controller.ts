import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AutenticacaoLogarDto } from './dtos/autenticacao-logar.dto';
import { AutenticacaoResponseDto } from './dtos/autenticacao-response.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post('logar')
  logar(@Body() acesso: AutenticacaoLogarDto): AutenticacaoResponseDto {
    return this.autenticacaoService.logar(acesso);
  }
}
