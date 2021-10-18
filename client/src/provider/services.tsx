import { serverAPI } from './serverConfig';
import { DatesResponse } from '../interfaces/datesResponse';
import { HottestByDeparament } from '../interfaces/hottestByDepartament';

export const getDates = async () => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const getHigherOrLowerByDate = async (): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const consultByDeparments = async (dateEnd: string, dateStart: string, departamentSelected: string) => {
    const resp = await serverAPI.post('/maps/getheatsourcesbydeparment', {
        dateEnd,
        dateStart,
        departament: departamentSelected,
    });

    return resp.data;
};

export const getnHeatSourceByDepartament = async (hottestbydeparament: HottestByDeparament) => {
    const resp = await serverAPI.post('/analysis/getnheatsourcebydepartament', {
        ...hottestbydeparament
    });
    return resp.data;
};



