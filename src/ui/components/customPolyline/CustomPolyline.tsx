import L, { PathOptions } from 'leaflet';
import { Polyline } from 'react-leaflet';

type CustomPolylineProps = {
    positions: L.LatLngExpression[] | L.LatLngExpression[][],
    pathOptions?: PathOptions,
}

export const CustomPolyline: React.FC<CustomPolylineProps> = ({ pathOptions, positions }) => {
    return (
        <Polyline pathOptions={pathOptions} positions={positions}>
        </Polyline>
    );
}
