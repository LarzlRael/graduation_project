import { serverAPI } from './serverConfig';
import { ProvinciasResponse } from '../interfaces/provinciasResponse.interface';
import { MunicipiosResponse } from '../interfaces/municipiosResponse.interface';

import { CountDepProMun, CountByDates } from '../interfaces/countProvinceDepartamento.interface';
import { HeatSourcesByPlace, CountInterface } from '../interfaces/provMun.interface';
import { DatesResponse } from '../interfaces/datesResponse';


export const getNombresMunicipios = async (departamento: string) => {
    const resp = await serverAPI.get<MunicipiosResponse>(`/analysis/nombres_municipios/${departamento}`
    );
    return resp.data;
};

export const getNombresProvincias = async (departamento: string) => {
    const resp = await serverAPI.get<ProvinciasResponse>(`/analysis/nombres_provincias/${departamento}`);
    return resp.data;
};


export const getCountByDepartamaments = async (departamentos: HeatSourcesByPlace) => {
    const resp = await serverAPI.post<CountDepProMun>(`/analysis/getcountdepartamentos`, {
        ...departamentos,
    });
    return resp.data;
};

export const getCountByDepPro = async (provincia: HeatSourcesByPlace) => {
    const resp = await serverAPI.post<CountDepProMun>(`/analysis/countdepartamentosprovincias`, {
        ...provincia,
    });
    return resp.data;
};

export const getCountByDeMun = async (municipcio: HeatSourcesByPlace) => {
    const resp = await serverAPI.post<CountDepProMun>(`/analysis/countdepartamentosmunicipios`, {
        ...municipcio,
    });
    return resp.data;
};

export const getAvailableDatesServer = async () => {
    const resp = await serverAPI.get<DatesResponse>(`/analysis/dates`);
    return resp.data;
};

export const getCountHeatSourcesByMonth = async (countInterface: CountInterface) => {
    const resp = await serverAPI.post<CountByDates>(`/analysis/getcountheatsourcesbymonth`, {
        ...countInterface
    });
    return resp.data;
};

export const getCountHeatSourcesByMonths = async (countInterface: CountInterface) => {
    const resp = await serverAPI.post<CountByDates>(`/analysis/getcountheatsourcesbymonths`, {
        ...countInterface
    });
    return resp.data;
};