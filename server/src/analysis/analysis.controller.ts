import { Controller, Get, Res, Param, Body, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { Response } from 'express';
import { AnalysisDto } from './analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private analysisService: AnalysisService) { }
  @Get('dates')
  async getFirstAndLastDate(@Res() res: Response) {
    const dates = await this.analysisService.getFirstAndLastDate();
    res.json({
      ok: true,
      dates,
    });
  }

  @Post('getnheatsourcebydepartament')
  async getNHeatSourceByDepartament(
    @Res() res: Response,
    @Body() analysisDto: AnalysisDto,
  ) {
    console.log(analysisDto)
    const resp = await this.analysisService.getNHeatSourceByDepartament(
      analysisDto,
    );
    return res.json({
      ok: true,
      resp,
    });
  }
}
