export interface CountDepProMun {
    ok: boolean;
    resp: Resp[];
}
export interface Resp {
    nombre: string;
    focos_calor: string;
}

export interface CountByDates {
    ok: boolean;
    resp: DatesHeatSources[];
}
export interface DatesHeatSources {
    acq_date:    Date;
    focos_calor: string;
}
