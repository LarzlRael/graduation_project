export interface DepartamentResponse {
    type:     string;
    name:     string;
    crs:      CRS;
    features: Feature[];
}

export interface CRS {
    type:       string;
    properties: CRSProperties;
}

export interface CRSProperties {
    name: string;
}

export interface Feature {
    type:       FeatureType;
    geometry:   Geometry;
    properties: FeatureProperties;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: number[];
}

export enum GeometryType {
    Point = "Point",
}

export interface FeatureProperties {
    brightness: number;
    longitude:  number;
    latitude:   number;
}

export enum FeatureType {
    Feature = "Feature",
}
