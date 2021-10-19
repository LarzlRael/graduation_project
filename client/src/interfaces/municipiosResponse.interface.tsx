export interface MunicipiosResponse {
    ok:   boolean;
    resp: Resp[];
}

export interface Resp {
    nombre_municipio: string;
    departamento:     string;
    provincia:        string;
}
