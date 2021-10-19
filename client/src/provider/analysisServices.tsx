import { serverAPI } from './serverConfig';
import { ProvinciasResponse } from '../interfaces/provinciasResponse.interface';
import { MunicipiosResponse } from '../interfaces/municipiosResponse.interface';


export const getNombresMunicipios = async (departamento: string) => {
    const resp = await serverAPI.get<MunicipiosResponse>(`/analysis/nombres_municipios/${departamento}`
    );
    return resp.data;
};

export const getNombresProvincias = async (departamento: string) => {
    const resp = await serverAPI.get<ProvinciasResponse>(`/analysis/nombres_provincias/${departamento}`);
    return resp.data;
};