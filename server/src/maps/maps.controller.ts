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
import {
  readFile,
  writeFile,
  createReadStream,
  unlink,
  createWriteStream,
  readFileSync,
  writeFileSync,
} from 'fs';
/* import parse from 'csv-parse/lib/sync'; */
import * as csv from 'csv/lib/sync';
import { Report } from 'src/reports/interfaces/report.interface';
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

  @Get('getdepartamento/:departamento')
  async getDepartamentPolygon(
    @Res() res: Response,
    @Param('departamento') departamento,
  ) {
    const result = await this.mapsService.getDepartamentPolygon(departamento);
    return res.json(result);
  }

  @Post('getheatsourcesbydeparment')
  async getHeatSourcesByDeparment(
    @Res() res: Response,
    @Body() mapDto: MapDto,
  ) {
    const result = await this.mapsService.getHeatSourcesByDeparment(mapDto);
    return res.json(result);
  }
  @Post('getheatsourcesbyprovincia')
  async getHeatSourcesByProvincia(
    @Res() res: Response,
    @Body() mapDto: MapDto,
  ) {
    console.log(mapDto);
    const result = await this.mapsService.getHeatSourcesByProvincia(mapDto);
    return res.json(result);
  }

  @Post('uploadcsvupdate')
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
    console.log('loading.....');
    const pathIn = join(__dirname, '../../', `files/${file.filename}`);

    // Load
    const strcsv = readFileSync(pathIn, 'utf-8');
    const data: Report[] = (csv.parse as any)(strcsv, {
      bom: true,
      cast: false,
      columns: true,
    });
    data.forEach((simpleData) => {
      if (simpleData.type) {
        delete simpleData.type;
      }
      if (parseInt(simpleData.daynight) === 0) {
        simpleData.daynight = 'N';
      } else if (parseInt(simpleData.daynight) === 1) {
        simpleData.daynight = 'D';
      }
      if (typeof simpleData.confidence !== 'number') {
        simpleData.confidence = 0;
      }
    });
    //Save
    const pathOut = join(__dirname, '../../', `files/cvsconvertido.csv`);
    writeFileSync(
      pathOut,
      (csv.stringify as any)(data, { header: true, quoted: false }),
      'utf-8',
    );

    readFile(pathOut, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      }
      const linesExceptFirst = data.split('\n').slice(1).join('\n');
      writeFile(pathOut, linesExceptFirst, function (e) {
        console.log(e);
      });
    });

    const response = await this.mapsService.saveNewData(pathOut);

    unlink(pathOut, (err) => {
      console.log(err);
    });

    if (response) {
      res.json({
        ok: true,
        msg: 'datos actualizados correctamente',
      });
    } else {
      res.json({
        ok: false,
        msg: 'Los datos ya fueron actualizados',
      });
    }
  }
}
