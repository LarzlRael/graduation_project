export interface CountDepartamentProvinciaResponse {
    ok: boolean;
    resp: Resp[];
}

export interface Resp {
    nombre_provincia: string;
    focos_calor: string;
}