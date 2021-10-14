import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { departamentos, fire_history } from 'src/tables';
import { AnalysisDto } from './analysis.dto';

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

  async getNHeatSourceByDepartament(analysisDto: AnalysisDto) {

    const query = `select a.longitude as lng, a.latitude as lat, a.brightness
    from ${fire_history} as a
    join ${departamentos} as b
    on ST_WITHIN(a.geometry, b.geom) where (a.acq_date BETWEEN $1 and $2
    and b.departament_name in ($3)) ORDER BY a.brightness ${analysisDto.orderBy} limit $4`;

    const res = await this.pool.query(query, [
      analysisDto.dateStart,
      analysisDto.dateEnd,
      analysisDto.departamento,
      analysisDto.limit,
    ]);
    return res.rows;
  }
}
