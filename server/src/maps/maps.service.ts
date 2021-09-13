import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MapDto } from './dto/mapDto';
import { createFileInfoRequest } from './utils/utils';

import { QueryResult } from 'typeorm';
import { MapResponse } from './interfaces/mapsResponse';
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
    const query = `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat  FROM fire_one_year WHERE acq_date = '${date}' `;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getHeatSourcesByBetweenDate(mapdto: MapDto): Promise<MapResponse> {
    const query = `
    SELECT *, st_x(geometry) as lng, st_y(geometry) as lat 
    FROM fire_one_year
    WHERE acq_date BETWEEN '${mapdto.dateStart}' AND '${mapdto.dateEnd}'
    order by brightness ${mapdto.orderBy};`;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getHighestOrLowestHeatSources(mapdto: MapDto): Promise<MapResponse> {
    const query = `
    SELECT *, st_x(geometry) as lng, st_y(geometry) as lat 
    FROM fire_one_year
    WHERE acq_date BETWEEN '${mapdto.dateStart}' AND '${mapdto.dateEnd}'
    order by brightness ${mapdto.orderBy};`;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getHeatSourcesToday() {
    const today = new Date().toISOString().slice(0, 10);
    const query = `
    SELECT *, st_x(geometry) as lng, st_y(geometry) as lat 
    FROM fire_one_year
    WHERE acq_date = '${today}'`;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async saveJsonAndParseAsGeoJson(query: string): Promise<MapResponse> {
    try {
      const res = await this.pool.query(query);
      const geojson: MapResponse = await GeoJSON.parse(res.rows, {
        Point: ['lat', 'lng'],
      });
      const data = await createFileInfoRequest(geojson.features);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
