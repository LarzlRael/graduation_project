import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';
import { join } from 'path';
import { truncate } from 'fs';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) { }

  @Get('getreportcvs/:day')
  async getReportCVS(@Res() res: Response, @Param('day') day) {
    console.log(day);
    const report = await this.reportsService.getReportCVSbyOneDate(day);
    if (report.ok) {
      const pathFile = join(__dirname, '../../public', report.filename);
      res.download(pathFile);
    } else {
      return res.json({
        ok: false,
        mensaje: 'No se econtraron registro de focos de calor en esa fecha',
      });
    }
  }

  @Get('geojsonreport/:day')
  async geoJsonReport(@Res() res: Response, @Param('day') day) {
    console.log(day);
    const report = await this.reportsService.getReportGeoJSONByOneDate(day);
    if (report.ok) {
      const pathFile = join(__dirname, '../../public', report.filename);
      res.download(pathFile);
    } else {
      res.json({
        ok: false,
        mensaje: 'No se econtraron registro de focos de calor en esa fecha',
      });
      /* truncate(join(__dirname, '../../public', report.filename)) */
    }
  }
}
