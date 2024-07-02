import L, { LatLngExpression, PathOptions } from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

type CustomMarkerProps = {
    name: string,
    positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
    pathOptions?: PathOptions,
}

export const CustomPolygon: React.FC<CustomMarkerProps> = ({ name, pathOptions, positions }) => {
    const center = L.polygon(positions).getBounds().getCenter();
    const text = L.divIcon({ html: name, className: 'polygone-name' });

    return (
        <Polygon pathOptions={pathOptions} positions={positions}>
            <Marker position={center} icon={text} />
        </Polygon>
    );
}
