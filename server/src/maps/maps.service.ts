import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MapDto } from './dto/mapDto';
import {
  createFileInfoRequest,
  getCurrentDate,
  convertDepartmentsToString,
} from './utils/utils';
import { MapResponse } from './interfaces/mapsResponse';
import { departamentos, fire_history } from 'src/tables';
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
    const query = `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat  FROM ${fire_history} WHERE acq_date = '${date}' `;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getHeatSourcesByBetweenDate(mapdto: MapDto): Promise<MapResponse> {
    const query = `
    SELECT distinct latitude ,longitude,brightness, longitude as lng, latitude as lat 
    FROM ${fire_history}
    WHERE acq_date BETWEEN '${mapdto.dateStart}' AND '${mapdto.dateEnd}'
    order by brightness`;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getHeatSourcesByDeparment(mapdto: MapDto): Promise<MapResponse> {
    /*     mapdto.departaments = convertDepartmentsToString(mapdto.departaments); */
    console.log(mapdto);
    const query = `
    select a.longitude as lng, a.latitude as lat, a.brightness, a.longitude, a.latitude
    from ${fire_history} as a
    join ${departamentos} as b
    on ST_WITHIN(a.geometry, b.geom) where (a.acq_date BETWEEN '${mapdto.dateStart}' and '${mapdto.dateEnd}' 
    and b.departament_name in ('${mapdto.departament}' ));
    `;
    return this.saveJsonAndParseAsGeoJson(query);
  }

  async getDepartamentPolygon(nombre_departamento: string) {
    const query = `
        SELECT jsonb_build_object(
          'type',     'FeatureCollection',
          'features', jsonb_agg(feature)
      )
      FROM (
        SELECT jsonb_build_object(
          'type',       'Feature',
          'id',         id,
          'geometry',   ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(row) - 'gid' - 'geom'
        ) AS feature
        FROM (SELECT * FROM departamentos where departament_name='${nombre_departamento}') row) features;
    `;
    const res = await this.pool.query(query);
    return res.rows[0].jsonb_build_object;
  }


  async saveNewData(path: string): Promise<boolean> {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const verifyData = await this.pool.query(
        `SELECT * FROM public.${fire_history} where acq_date ='${today}' limit 1;`,
      );

      const query = `
        copy public.${fire_history} (latitude, longitude, brightness, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_t31, frp, daynight) FROM '${path}' CSV ENCODING 'UTF8' QUOTE '\"' ESCAPE '''';
        `;
      await this.pool.query(query);
      await this.pool.query(`
          UPDATE ${fire_history} SET geometry = ST_GeomFromText('POINT(' || longitude || ' ' || latitude || ')',4326) WHERE geometry IS null;
        `);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
