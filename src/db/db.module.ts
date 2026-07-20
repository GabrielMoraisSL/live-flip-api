import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || '',
        port: Number(configService.get<string>('DB_PORT')) || 3000,
        username: configService.get<string>('DB_USER') || '',
        password: configService.get<string>('DB_PASSWD') || '',
        database: configService.get<string>('DB_NAME') || '',
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*.ts'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
