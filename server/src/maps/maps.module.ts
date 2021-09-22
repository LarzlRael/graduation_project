import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import {
  ConfigModule,
  databasePoolFactory,
  ConfigService,
} from 'src/databasePool';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot(), MulterModule.register({ dest: './files' }),],
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
