export interface ReportResponse {
    ok:     boolean;
    report: Report[];
}

export interface Report {
    latitude:   number;
    longitude:  number;
    brightness: number;
    acq_date:   Date;
    acq_time:   number;
    satellite:  Satellite;
    instrument: Instrument;
    version:    Version;
    bright_t31: number;
    confidence: number;
    frp:        number;
}

export enum Instrument {
    Modis = "MODIS",
}

export enum Satellite {
    Aqua = "Aqua",
    Terra = "Terra",
}

export enum Version {
    The61Nrt = "6.1NRT",
}
