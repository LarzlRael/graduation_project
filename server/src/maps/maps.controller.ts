import { Body, Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';
import { MapDto } from './dto/mapDto';

@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) { }

  @Get()
  @Render('index')
  geoLog() {
    return { token: 'hello word', email: 'que fue' };
  }

  @Get('mapInfo')
  async getQuery(@Res() res: Response) {
    const result = await this.mapsService.executeQuery(
      'SELECT *, st_x(geom ) as lng, st_y(geom ) as lat  FROM fire_cvs;',
    );

    return res.json(result);
  }
  @Get('getbyDate/:date')
  async getHeatSourcesByDate(@Res() res: Response, @Param('date') date) {
    console.log(date);
    const result = await this.mapsService.getHeatSourcesByDate(date);
    return res.json(result);
  }
  @Get('getbyBetweenDate')
  async getbyBetweenDate(@Res() res: Response, @Body() mapDto: MapDto) {
    const result = await this.mapsService.getHeatSourcesByBetweenDate(mapDto);
    return res.json(result);
  }
  @Get('gethighestorlowest')
  async getHighestOrLowestHeatSources(
    @Res() res: Response,
    @Body() mapDto: MapDto,
  ) {
    const result = await this.mapsService.getHighestOrLowestHeatSources(
      mapDto,
      'DESC',
    );
    return res.json(result);
  }
}
