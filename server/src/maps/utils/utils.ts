import { MapResponse, Feature } from '../interfaces/mapsResponse';
import { extname } from 'path';

export const createFileInfoRequest = (features: Feature[]) => {
  const data: MapResponse = {
    type: 'FeatureCollection',
    name: 'FocosdecalorBolivia_2',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: features,
  };

  return data;
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const cvsFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(
      new Error('Solo son permitidos archivos de tipo .csv'),
      false,
    );
  }
  callback(null, true);
};

export const getCurrentDate = (yesterday?: boolean): string => {
  const date = new Date();
  if (yesterday) {
    date.setHours(date.getHours() - 24);
  } else {
    date.setHours(date.getHours() - 4);
  }
  return date.toISOString().slice(0, 10);
}