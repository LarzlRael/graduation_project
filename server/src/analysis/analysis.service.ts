import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { fire_history } from 'src/tables';

@Injectable()
export class AnalysisService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }

  async getFirstAndLastDate(): Promise<string[]> {

    const from = `select acq_date from ${fire_history} order by acq_date DESC limit 1 ;`;
    const to = `select acq_date from ${fire_history} order by acq_date ASC limit 1 ;`;

    const res1 = await this.pool.query(from);
    const res2 = await this.pool.query(to);
    return [res2.rows[0].acq_date, res1.rows[0].acq_date];
  }

  async getDateFromDatabase(count: number, from: number): Promise<string[]> {
    const queryText = `SELECT distinct acq_date from ${fire_history} order by acq_date DESC limit $1 offset $2;`;
    const res = await this.pool.query(queryText, [count, from]);
    const rowsJson = res.rows;
    const array = [];
    rowsJson.map((row) => {
      array.push(row.acq_date);
    });
    return array;
  }

}
