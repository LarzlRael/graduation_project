export interface DepartamentProvinciaResponse {
    ok:   boolean;
    resp: Resp[];
}

export interface Resp {
    longitude:        number;
    latitude:         number;
    brightness:       number;
    nombre_provincia: string;
    departamento:     string;
}
