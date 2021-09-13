import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';
import { MapDto } from './dto/mapDto';

@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) { }

  @Get()
  @Render('map/index')
  geoLog() {
    return { token: 'hello word', email: 'que fue' };
  }

  @Post('mapinfo')
  async getQuery(@Res() res: Response) {
    const result = await this.mapsService.executeQuery(
      `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat  FROM   fire_one_year WHERE acq_date='2020-10-11';`,
    );

    return res.json(result);
  }
  @Get('getbyDate/:date')
  async getHeatSourcesByDate(@Res() res: Response, @Param('date') date) {
    console.log(date);
    const result = await this.mapsService.getHeatSourcesByDate(date);
    return res.json(result);
  }

  @Post('getbybetweendate')
  async getbyBetweenDate(@Res() res: Response, @Body() mapDto: MapDto) {
    const result = await this.mapsService.getHeatSourcesByBetweenDate(mapDto);
    return res.json(result);
  }

  @Post('gethighestorlowest')
  async getHighestOrLowestHeatSources(
    @Res() res: Response,
    @Body() mapDto: MapDto,
  ) {
    const result = await this.mapsService.getHighestOrLowestHeatSources(mapDto);
    return res.json(result);
  }
  @Get('today')
  async getHeatSourcesToday(@Res() res: Response) {
    const result = await this.mapsService.getHeatSourcesToday();
    return res.json(result);
  }
}
