import { serverAPI } from './serverConfig';
import { DatesResponse } from '../interfaces/datesResponse';
import { HeatSourcesByDeparament } from '../interfaces/hottestByDepartament';
import { HeatSourcesByPlace } from '../interfaces/provMun.interface';
import { GeoJSONResponse } from '../interfaces/HottestSourceResponse';
import { LatLngInt } from '../interfaces/countProvinceDepartamento.interface';


export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}
export const getHeatSourcesByDepartament = async (consulHeatSources: HeatSourcesByPlace): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<Promise<GeoJSONResponse>>('/maps/getheatsourcesbydeparment', {
        ...consulHeatSources,
    });

    return resp.data;
};

export const getnHeatSourceByDepartament = async (hottestbydeparament: HeatSourcesByDeparament): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<Promise<GeoJSONResponse>>('/analysis/getnheatsourcebydepartament', {
        ...hottestbydeparament
    });
    return resp.data;
};

export const getHotSourcesByDepMun = async (provincia: HeatSourcesByPlace): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<GeoJSONResponse>(`/maps/getheatsourcesbymunicipio`, {
        ...provincia,
    });
    return resp.data;
};

export const getHotSourcesByDepProv = async (provincia: HeatSourcesByPlace): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<GeoJSONResponse>(`/maps/getheatsourcesbyprovincia`, {
        ...provincia,
    });
    return resp.data;
};
export const getMidPoint = async (location: string, name: string): Promise<LatLngInt> => {
    const resp = await serverAPI.get<LatLngInt>(`/maps/getMidPoint/${location}/${name}`);
    return resp.data;
};
