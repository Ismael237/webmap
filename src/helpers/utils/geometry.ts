import * as turf from '@turf/turf';
import { LatLngExpression } from 'leaflet';

export function calculatePolygonCentroid(coordinates: number[][][]): LatLngExpression {
    const polygonTurf = turf.polygon(coordinates);
    const centroid = turf.centroid(polygonTurf);
    const center: [number, number] = [
        centroid.geometry.coordinates[0],
        centroid.geometry.coordinates[1]
    ];

    return center;
}
