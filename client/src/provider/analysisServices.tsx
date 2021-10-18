import { serverAPI } from './serverConfig';

export const getNombresMunicipios = async (departamento: string) => {
    const resp = await serverAPI.post('/analysis/nombres_municipios/',
        { params: { departamento } }
    );
    return resp.data;
};

export const getNombresProvincias = async (departamento: string) => {
    const resp = await serverAPI.post('/analysis/nombres_provincias/',
        { params: { departamento } }
    );
    return resp.data;
};