import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { Pool } from 'pg';
import { ConfigService, ConfigModule } from '@nestjs/config';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    host: process.env.HOST,
    port: 5432,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    MapsService,
  ],
  controllers: [MapsController],
})
export class MapsModule { }
