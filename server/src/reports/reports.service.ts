/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { fire_history } from 'src/tables';
import { GeoJsonResponse } from './interfaces/geoJson.interface';
import { Report } from './interfaces/report.interface';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

const convertirFecha = (date: string, multi: boolean): string => {
  console.log('date from convertir fecha function ' + date);
  const newDate = date.split('-');
  if (multi) { return `${newDate[2]}${newDate[1]}${newDate[0]}` }
  else {
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  }
}

@Injectable()
export class ReportsService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) { }

  async getReportCVS(dateStart: string, dateEnd?: string): Promise<{ ok: boolean, filename: string }> {
    let queryText: string;
    if (dateEnd != null) {
      queryText = `SELECT latitude, longitude ,brightness,acq_date,acq_time,satellite, instrument, version, bright_t31,confidence,frp  from ${fire_history}
    WHERE acq_date  BETWEEN '${dateStart}' AND '${dateEnd}' order by brightness DESC;`;
    } else {
      queryText = `SELECT latitude, longitude ,brightness,acq_date,acq_time,satellite, instrument, version, bright_t31,confidence,frp  from ${fire_history}
    WHERE acq_date  BETWEEN '${dateStart}' AND '${dateStart}' order by brightness DESC;`;
    }

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
      filename: cvs,
    }
  }


  async getReportGeoJSON(dateStart: string, dateEnd?: string) {
    let query: string;
    if (dateEnd != null) {
      query = `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat FROM ${fire_history} WHERE acq_date BETWEEN '${dateStart}' AND '${dateEnd}' order by brightness DESC; `;
    } else {
      query = `SELECT *, st_x(geometry) as lng, st_y(geometry) as lat FROM ${fire_history} WHERE acq_date BETWEEN '${dateStart}' AND '${dateStart}' order by brightness DESC; `;
    }
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
    return geojson;
  }


  /*  generateReport(dataContent: string, format: keyof typeof ReportFormatENUM, startDate: string, endDate?: string): string {
 
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
     if (endDate !== undefined) {
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
   } */
}
