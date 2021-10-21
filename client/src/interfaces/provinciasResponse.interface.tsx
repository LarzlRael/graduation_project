export interface    ProvinciasResponse {
    ok:   boolean;
    resp: Resp[];
}

export interface Resp {
    nombre_provincia: string;
    departamento:     string;
}
