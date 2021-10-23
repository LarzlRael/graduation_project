import { serverAPI } from './serverConfig';
import { DatesResponse } from '../interfaces/datesResponse';
import { HottestByDeparament } from '../interfaces/hottestByDepartament';
import { ProvMun } from '../interfaces/provMun.interface';
import { GeoJSONResponse } from '../interfaces/HottestSourceResponse';


export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const consultByDeparments = async (dateEnd: string, dateStart: string, departamentSelected: string):Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<Promise<GeoJSONResponse>>('/maps/getheatsourcesbydeparment', {
        dateStart,
        dateEnd,
        departament: departamentSelected,
    });

    return resp.data;
};

export const getnHeatSourceByDepartament = async (hottestbydeparament: HottestByDeparament): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<Promise<GeoJSONResponse>>('/analysis/getnheatsourcebydepartament', {
        ...hottestbydeparament
    });
    return resp.data;
};

export const getHotSourcesByDepMun = async (provincia: ProvMun): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<GeoJSONResponse>(`/maps/getheatsourcesbymunicipio`, {
        ...provincia,
    });
    return resp.data;
};

export const getHotSourcesByDepProv = async (provincia: ProvMun): Promise<GeoJSONResponse> => {
    const resp = await serverAPI.post<GeoJSONResponse>(`/maps/getheatsourcesbyprovincia`, {
        ...provincia,
    });
    return resp.data;
};
