import { serverAPI } from './serverConfig';
import { ProvinciasResponse } from '../interfaces/provinciasResponse.interface';
import { MunicipiosResponse } from '../interfaces/municipiosResponse.interface';
import { DepartamentProvinciaResponse } from '../interfaces/departamensProvincia.interface';
import { CountDepartamentProvinciaResponse } from '../interfaces/countProvinceDepartamento.interface';


export const getNombresMunicipios = async (departamento: string) => {
    const resp = await serverAPI.get<MunicipiosResponse>(`/analysis/nombres_municipios/${departamento}`
    );
    return resp.data;
};

export const getNombresProvincias = async (departamento: string) => {
    const resp = await serverAPI.get<ProvinciasResponse>(`/analysis/nombres_provincias/${departamento}`);
    return resp.data;
};
interface Provincias {
    dateStart: string;
    dateEnd: string;
    departamento: string;
    provincia?: string;
}
export const getHottesSourcesByDepartamentProvince = async (provincia: Provincias) => {
    const resp = await serverAPI.post<DepartamentProvinciaResponse>(`/analysis/getheatsourcesbyprovincia`, {
        ...provincia,
    });
    return resp.data;
};
export const getCountByDepPro = async (provincia: Provincias) => {
    const resp = await serverAPI.post<CountDepartamentProvinciaResponse>(`/analysis/countdepartamentosprovincias`, {
        ...provincia,
    });
    return resp.data;
};