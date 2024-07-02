import { PolygoneGeometry } from "./geometry";

export interface Neighborhood {
    id: number;
    neighborhoodName: string;
    population: number;
    geometry: PolygoneGeometry;
}