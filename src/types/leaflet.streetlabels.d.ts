import L from 'leaflet';

// leaflet.streetlabels.d.ts
declare module 'leaflet' {
    type StreetLabelsOptions = {
        propertyName: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        showLabelIf?: (feature: any) => boolean;
        interactive?: boolean;
        fontStyle: {
            dynamicFontSize: boolean;
            fontSize: number;
            fontSizeUnit: string;
            lineWidth: number;
            fillStyle: string;
            strokeStyle: string;
        };
        collisionFlg: boolean;
    };

    export class StreetLabels extends Renderer {
        constructor(options?: StreetLabelsOptions): L.Renderer;

        options: StreetLabelsOptions;

        // Ajoutez d'autres méthodes et propriétés spécifiques ici si nécessaire
        _handleMouseOut(e: MouseEvent): void;
        _handleMouseHover(e: MouseEvent, point: L.Point): void;
        _fireEvent(layers: L.Layer[], e: MouseEvent, type?: string): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _initContainer(options?: any): void;
        _text(ctx: CanvasRenderingContext2D, layer: L.Layer): void;
        _getBearing(startCoords: L.LatLng, stopCoords: L.LatLng): number;
        _getLineStringReverse(polyline: L.Polyline): L.Polyline;
        _getDynamicFontSize(): number;
        _getCentroid(layer: L.Layer): L.Point | undefined;
    }
}