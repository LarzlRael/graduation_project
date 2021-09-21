import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) { }

  @Get('getreportcvs/:day')
  async getReportCVS(@Res() res: Response, @Param('day') day) {
    console.log(day);
    const report = await this.reportsService.getReportCVSbyOneDate(day);
    if (report.ok) {
      return res.json({
        ok: true,
        csv: report.filename,
      });
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
    return res.json(report);
  }

  @Get('geojsonreportbytwodays/:dateStart/:dateEnd')
  async geoJsonReportByTwoDates(
    @Res() res: Response,
    @Param('dateStart') dateStart: Date,
    @Param('dateEnd') dateEnd: Date,
  ) {
    const report = await this.reportsService.getReportGeoJSONByBetweenDates(
      dateStart,
      dateEnd,
    );
    if (report.ok) {
      return res.json(report.filename);
    } else {
      return res.json({
        ok: false,
        mensaje: 'No se econtraron registro de focos de calor en esa fecha',
      });
    }
  }

  @Get('getreportcvsbytwodates/:dateStart/:dateEnd')
  async geoCVSReportByTwoDates(
    @Res() res: Response,
    @Param('dateStart') dateStart: Date,
    @Param('dateEnd') dateEnd: Date,
  ) {
    const report = await this.reportsService.getReportCVSbyBetweenTwoDates(
      dateStart,
      dateEnd,
    );
    if (report.ok) {
      return res.json({
        ok: true,
        csv: report.filename,
      });
    } else {
      res.json({
        ok: false,
        mensaje: 'No se econtraron registro de focos de calor en esa fecha',
      });
    }
  }
}
