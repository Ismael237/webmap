import { Marker } from 'react-leaflet';
import L from 'leaflet';

type CustomMarkerProps = {
    id: number,
    children: React.ReactNode,
    onClick: () => void,
    position: L.LatLngExpression,
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ onClick, position, children, id }) => {
    const customIcon = L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 39],
        className: `custom-marker-${id}`,
        html: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8.28003C17 8.95785 16.8651 9.60417 16.6207 10.1936L12.0058 21L7.43472 10.3222C7.15536 9.6987 7 9.00751 7 8.28003C7 5.51861 9.23858 3.28003 12 3.28003C14.7614 3.28003 17 5.51861 17 8.28003Z" fill="currentColor" />
                <ellipse cx="12" cy="8.28131" rx="3.57581" ry="3.52142" fill="#f5f9e9" />
            </svg>`
    });

    const eventHandlers = {
        click: () => onClick(),
    };

    return (
        <>
            <Marker 
                position={position} 
                icon={customIcon}
                eventHandlers={eventHandlers}
            >
                {children}
            </Marker>
        </>
    );
};