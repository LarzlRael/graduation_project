import { Controller, Get, Res } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { Response } from 'express';

@Controller('analysis')
export class AnalysisController {
  constructor(private analysisService: AnalysisService) { }
  @Get('dates')
  async getAllDates(@Res() res: Response) {
    const getAllDates = await this.analysisService.getDateFromDatabase();
    res.json({
      ok: true,
      dates: getAllDates,
    });
  }
}
