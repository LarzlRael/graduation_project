import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import {
  ConfigModule,
  databasePoolFactory,
  ConfigService,
} from 'src/databasePool';

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
