import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';
import { MapDto } from './dto/mapDto';
import { join } from 'path';

@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) { }


  /* @Get('*')
  showMenu(@Res() res: Response) {
    console.log(join(__dirname, '../..', 'public/main/index.html'));
    res.sendFile(join(__dirname, '../..', 'public/main/index.html')),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      };
  } */

  @Get()
  @Render('map/index2')
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
    const result = await this.mapsService.getHeatSourcesByDate(date);
    return res.json(result);
  }
  @Get('refreshinformation')
  async loadData(@Res() res: Response) {

    const result = await this.mapsService.saveNewData();
    if (result) {
      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'Informacion actualizada'
      })
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        msg: 'La base de datos ya esta actualizada',
      })
    }
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
