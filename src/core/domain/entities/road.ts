import { PolyLineGeometry } from "./geometry";

export interface Road {
    osmId: string;
    code: number;
    class_: string;
    name: string;
    reference: string | null;
    oneWay: string;
    maxSpeed: number;
    layer: number;
    bridge: string;
    tunnel: string;
    geometry: PolyLineGeometry;
}