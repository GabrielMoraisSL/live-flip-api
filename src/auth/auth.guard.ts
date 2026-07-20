import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string = '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extrairTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('Acesso não autorizado.');
    }
    try {
      request['user'] = await this.jwtService.verifyAsync<JwtPayloadDto>(
        token,
        {
          secret: this.jwtSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('Acesso não autorizado.');
    }
    return true;
  }
  private extrairTokenHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
