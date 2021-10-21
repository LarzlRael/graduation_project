import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { departamentos, fire_history, municipios, provincias } from 'src/tables';
import { AnalysisDto } from './dto/analysis.dto';

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
    and b.nombre_departamento in ($3)) ORDER BY a.brightness ${analysisDto.orderBy} limit $4`;

    const res = await this.pool.query(query, [
      analysisDto.dateStart,
      analysisDto.dateEnd,
      analysisDto.departamento,
      analysisDto.limit,
    ]);
    return res.rows;
  }

  async getNamesProvincias(nombreDepartamento: string) {
    const query = `select nombre_provincia,departamento from provincias
    where departamento = $1 order by nombre_provincia ASC`;

    const res = await this.pool.query(query, [nombreDepartamento]);
    return res.rows;
  }
  async getNamesMunicipios(nombreDepartamento: string) {
    const query = `select nombre_municipio, provincia, departamento from ${municipios}
    where departamento = $1`;

    const res = await this.pool.query(query, [nombreDepartamento]);
    return res.rows;
  }

  async getHeatSourcesByProvincia(analysisDto: AnalysisDto) {
    const query = `
    select a.longitude,a.latitude,a.brightness,b.nombre_provincia,b.departamento
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom) 
    where (a.acq_date BETWEEN $1
    and $2 and b.departamento in ($3))
    `;
    const res = await this.pool.query(query, [
      analysisDto.dateStart,
      analysisDto.dateEnd,
      analysisDto.departamento,
    ]);
    return res.rows;
  }
  async getCountDepartamentosProvincias(analysisDto: AnalysisDto) {
    const query = `
    select b.nombre_provincia, count(b.nombre_provincia) as focos_calor
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom) 
    where (a.acq_date BETWEEN $1
    and $2 and b.departamento in ($3)) GROUP by(b.nombre_provincia) order by b.nombre_provincia
    `;
    const res = await this.pool.query(query, [
      analysisDto.dateStart,
      analysisDto.dateEnd,
      analysisDto.departamento,
    ]);
    return res.rows;
  }
}

/* select a.geometry, a.longitude as lng, a.latitude as lat, a.brightness
    from fire_history as a
    join provincias as b
    on ST_WITHIN(a.geometry, b.geom) where (a.acq_date BETWEEN '2021-08-01'
  and '2021-08-01'
    and b.nombre_provincia in ('Cordillera')); */

/* select a.geometry, a.longitude as lng, a.latitude as lat, a.brightness
from fire_history as a
join municipios as b
on ST_WITHIN(a.geometry, b.geom) where (a.acq_date BETWEEN '2021-08-01'
and '2021-08-01'
and b.nombre_municipio in ('Warnes')); */

