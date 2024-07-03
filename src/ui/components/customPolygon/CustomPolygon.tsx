import L, { LatLngExpression, PathOptions } from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

type CustomMarkerProps = {
    name?: string,
    onClick?: () => void,
    positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
    pathOptions?: PathOptions,
}

export const CustomPolygon: React.FC<CustomMarkerProps> = ({ name, pathOptions, positions, onClick}) => {
    const center = L.polygon(positions).getBounds().getCenter();
    const text = L.divIcon({ html: name, className: 'polygone-name' });
    let eventHandlers = undefined;

    if (onClick) {
        eventHandlers = {
            click: () => onClick(),
        };
    }
    return (
        <Polygon
            eventHandlers={eventHandlers}
            pathOptions={pathOptions}
            positions={positions}
        >
            {name && (<Marker position={center} icon={text} />)}
        </Polygon>
    );
}
