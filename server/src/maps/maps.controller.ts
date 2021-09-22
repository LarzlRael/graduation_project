import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';
import { MapDto } from './dto/mapDto';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { cvsFilter, editFileName } from './utils/utils';
import { diskStorage } from 'multer';
import { readFile, writeFile, truncate, unlink } from 'fs';

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

  @Get('uploadcsvupdated')
  @UseInterceptors(
    FileInterceptor('csv', {
      fileFilter: cvsFilter,
      storage: diskStorage({
        filename: editFileName,
        destination: './files',
      }),
    }),
  )
  async uploadcsvupdated(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const path = join(__dirname, '../../', `files/${file.filename}`);
    readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      }
      const linesExceptFirst = data.split('\n').slice(1).join('\n');
      writeFile(path, linesExceptFirst, function (e) {
        console.log(e);
      });
    });

    const response = await this.mapsService.saveNewData(path);

    unlink(path, (err) => {
      console.log(err);
    });

    if (response) {
      res.json({
        ok: true,
        msg: 'datos actualizados',
      });
    } else {
      res.json({
        ok: false,
        msg: 'Los datos ya fueron actualizados',
      });
    }
  }
}
