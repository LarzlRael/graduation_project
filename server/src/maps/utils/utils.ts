import { appendFile, truncate } from 'fs';
import { MapResponse, Feature } from '../interfaces/mapsResponse';

export const createFileInfoRequest = (features: Feature[]) => {
  /* truncate('public/data/FocosdecalorBolivia_2.js', 0, function () {
    console.log('done');
  }); */

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
  /* appendFile(
    'public/data/FocosdecalorBolivia_2.js',
    `var json_FocosdecalorBolivia_2 = {
    "type": "FeatureCollection",
    "name": "FocosdecalorBolivia_2",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": 
          ${json}
        }`,
    (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    },
  ); */
};
