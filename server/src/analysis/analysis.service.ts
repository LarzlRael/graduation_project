import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AnalysisService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }

  async getDateFromDatabase(): Promise<string[]> {
    const queryText =
      'SELECT distinct acq_date from fire_one_year order by acq_date DESC;';
    const res = await this.pool.query(queryText);
    const rowsJson = res.rows;
    const array = [];
    rowsJson.map((row) => {
      array.push(row.acq_date);
    });
    return array;
  }
}
