import { Controller, Get, Res, Param } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { Response } from 'express';

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
}
