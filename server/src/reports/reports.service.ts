/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { appendFile } from 'fs';
import { GeoJsonResponse } from './interfaces/geoJson.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

enum ReportFormatENUM {
  GEOJSON,
  CVS,
  SHAPEFILE,
}
export interface Report {
  latitude: number;
  longitude: number;
  brightness: number;
  acq_date: Date;
  acq_time: number;
  satellite: Satellite;
  instrument: Instrument;
  version: Version;
  bright_t31: number;
  confidence: number;
  frp: number;
}
export enum Instrument {
  Modis = 'MODIS',
}

export enum Satellite {
  Aqua = 'Aqua',
  Terra = 'Terra',
}

export enum Version {
  The61Nrt = '6.1NRT',
}

const convertirFecha = (date: string, multi: boolean): string => {
  console.log('date from convertir fecha function ' + date);
  const newDate = date.split('-');
  if (multi) { return `${newDate[2]}-${newDate[1]}-${newDate[0]}` }
  else {
    return `${newDate[2]}${newDate[1]}${newDate[0]}`;
  }

}

@Injectable()
export class ReportsService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }

  async getReportCVSbyOneDate(date): Promise<{ ok: boolean, filename: string }> {
    const queryText = `SELECT latitude, longitude ,brightness,acq_date,acq_time,satellite, instrument, version, bright_t31,confidence,frp  from fire_one_year
    WHERE acq_date  = '${date}' order by brightness DESC;`;
    const getReport = await this.pool.query(queryText);
    const format: Report[] = getReport.rows;
    if (format.length == 0) {
      return {
        ok: false,
        filename: '',
      }
    }

    let cvs = '';
    cvs +=
      'latitude,longitude,brightness,acq_date,acq_time,satellite,instrument,version,bright_t31,confidence,frp,vcs\n';

    format.map((report) => {
      cvs += `${report.latitude},${report.longitude},${report.brightness},${report.acq_date.toISOString().slice(0, 10)},${report.acq_time},${report.satellite},${report.instrument},${report.version},${report.bright_t31},${report.confidence},${report.frp}` + '\n';
    });

    return {
      ok: true,
      filename: this.generateReport(cvs, 'CVS', date,),
    }


  }
  async getReportGeoJSONByOneDate(date: string): Promise<{ ok: boolean, filename: string }> {
    const query = `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat  FROM fire_one_year WHERE acq_date = '${date}' `;
    const res = await this.pool.query(query);
    if (res.rows.length == 0) {
      return {
        ok: false,
        filename: '',
      }
    };
    const geojson: GeoJsonResponse = await GeoJSON.parse(res.rows, {
      Point: ['lat', 'lng'],
    });
    return {
      ok: true,
      filename: this.generateReport(JSON.stringify(geojson), 'GEOJSON', date),
    };
  }

  generateReport(dataContent: string, format: keyof typeof ReportFormatENUM, startDate: string, endDate?: string): string {

    let filename = '';
    let extension = '';
    switch (format) {
      case 'GEOJSON':
        extension = 'geojson';
        break;
      case 'CVS':
        extension = 'csv';
        break;
      default:
        extension = 'geojson';
        break;
    }
    if (endDate !== null || endDate !== undefined) {
      //TODO : revisar esta parte, error al generar filename
      console.log('date 2 paramteres ' + startDate);
      console.log('date 2 paramteres ' + endDate);
      filename = `reporte ${convertirFecha(startDate, true)}-${convertirFecha(endDate, true)}.${extension}`
    } else {
      console.log('date 1 parameter ' + startDate);
      filename = `reporte ${convertirFecha(startDate, false)}.${extension}`
    }
    appendFile(`public/${filename}`, dataContent, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
    return filename;
  }
}
