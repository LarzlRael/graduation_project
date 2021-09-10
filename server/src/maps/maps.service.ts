import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ORDER_BY } from './dto/orderBy';
import { MapDto } from './dto/mapDto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');
@Injectable()
export class MapsService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }

  async executeQuery(queryText: string) {
    const res = await this.pool.query(queryText);
    const geojson = await GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
    return geojson;
  }
  async getHeatSourcesByDate(date: string) {
    const query = `SELECT geom,acq_date, brightness,longitude,latitude
      FROM  fire_one_year WHERE acq_date = '${date}' `;
    const res = await this.pool.query(query);
    const geojson = await GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
    return geojson;
  }
  async getHeatSourcesByBetweenDate(mapdto: MapDto) {
    const query = `SELECT 
    geom,acq_date, brightness,longitude,latitude 
    FROM fire_one_year
    WHERE acq_date BETWEEN '${mapdto.dateStart}' AND '${mapdto.dateEnd}'; `;
    const res = await this.pool.query(query);
    const geojson = await GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
    return geojson;
  }

  async getHighestOrLowestHeatSources(
    mapdto: MapDto,
    orderBy: keyof typeof ORDER_BY,
  ) {
    const query = `SELECT 
    geom,acq_date, brightness,longitude,latitude 
    FROM fire_one_year
    WHERE acq_date BETWEEN '${mapdto.dateStart}' AND '${mapdto.dateEnd}''
    order by brightness ${orderBy};`;
    const res = await this.pool.query(query);
    const geojson = await GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });
    return geojson;
  }
}
