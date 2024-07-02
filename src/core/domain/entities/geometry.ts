import { LatLngExpression } from "leaflet";

export interface PointGeometry {
    type: 'Point';
    coordinates: LatLngExpression;
}

export interface PolygoneGeometry {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
}

export interface PolyLineGeometry {
    type: 'MultiLineString';
    coordinates: LatLngExpression[] | LatLngExpression[][];
}