import { MapResponse, Feature } from '../interfaces/mapsResponse';

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
