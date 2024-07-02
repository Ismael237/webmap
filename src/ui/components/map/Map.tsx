import L, { LatLngExpression, MarkerCluster } from 'leaflet';
import { LayerGroup, MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet';
import Control from 'react-leaflet-custom-control'
import { CustomMarker } from '../customMarker/CustomMarker';
import { useSchoolStore } from '../../../core/domain/usecases/schoolSlice';
import { usePharmacyStore } from '../../../core/domain/usecases/pharmacySlice';
import { useSpontaneousHousingStore } from '../../../core/domain/usecases/spontaneousHousingSlice';
import { useNeighborhoodStore } from '../../../core/domain/usecases/neighborhoodSlice';
import { useRoadStore } from '../../../core/domain/usecases/roadSlice';
import { CustomPolygon } from '../customPolygon/CustomPolygon';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomZoomControl } from '../customZoomControl/CustomZoomControl.js';
import { SearchBar } from '../searchBar/SearchBar.js';
import '../../../assets/css/leaflet.css';
import { LayerSelector } from '../layerSelector/LayerSelector.js';
import { getLayerById, useLayersStore } from '../../../core/infrastructure/localSlice/layerSlice.js';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { capitalizeFirstLetter, splitPhraseIntoLines } from '../../../helpers/utils/string.js';
import { CustomPolyline } from '../customPolyline/CustomPolyline.js';

const createMarkerClusterCustomIcon = function (cluster: MarkerCluster, id: number) {
    return L.divIcon({
        html: `<div>
                ${cluster.getChildCount()}
            </div>`,
        className: `custom-marker-cluster custom-marker-cluster-${id}`,
        iconSize: L.point(33, 33, true),
    })
}

export function Map() {
    const initialZoom = 16;
    const initialPosition: LatLngExpression = [3.902790, 11.490127];
    const visibleSchools = useSchoolStore.use.visibleSchools();
    const visiblePharmacies = usePharmacyStore.use.visiblePharmacies();
    const spontaneousHousings = useSpontaneousHousingStore.use.spontaneousHousings();
    const neighborhoods = useNeighborhoodStore.use.neighborhoods();
    const roads = useRoadStore.use.roads();
    const layers = useLayersStore.use.layers();

    const spontaneousHousingsOptions = { color: getLayerById(2).color };
    const neighborhoodsOptions = { color: getLayerById(3).color };
    const roadsOptions = { color: getLayerById(4).color };

    const generateMarkerStyle = () => {
        const ids = [0, 1];
        let css = '';
        for (const id of ids) {
            css += `.custom-marker-${id}{color: ${getLayerById(id).color}}`;
            css += `.custom-marker-cluster-${id}{background-color: ${getLayerById(id).color}}`;
            css += `.shape-tooltip-${id}{color: ${getLayerById(id).color}}`;
        }
        return css;
    }

    return (
        <>
            <style>{generateMarkerStyle()}</style>
            <MapContainer
                center={initialPosition}
                zoom={initialZoom}
                maxZoom={25}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {layers.find(layer => layer.id === 0 && layer.active) && (
                    <LayerGroup>
                        <MarkerClusterGroup
                            iconCreateFunction={(c) => createMarkerClusterCustomIcon(c, 0)}
                            chunkedLoading
                        >
                            {visibleSchools.map((school, i) => (<CustomMarker
                                key={i} id={0}
                                position={school.geometry.coordinates}
                            >
                                <Tooltip offset={[8, 2]} interactive permanent className={`shape-tooltip shape-tooltip-${0}`}>
                                    <Flex direction='column' gap={0}>
                                        {splitPhraseIntoLines(capitalizeFirstLetter(school.schoolName), 20)
                                            .map((lines) => (<Text>{lines}</Text>))}
                                    </Flex>
                                </Tooltip>
                            </CustomMarker>))}
                        </MarkerClusterGroup>
                    </LayerGroup>
                )}
                {layers.find(layer => layer.id === 1 && layer.active) && (
                    <LayerGroup>
                        <MarkerClusterGroup
                            iconCreateFunction={(c) => createMarkerClusterCustomIcon(c, 1)}
                            chunkedLoading
                        >
                            {visiblePharmacies.map((pharmacy, i) =>
                            (<CustomMarker
                                key={i} id={1}
                                position={pharmacy.geometry.coordinates}
                            >
                                <Tooltip
                                    offset={[8, 2]}
                                    interactive
                                    permanent
                                    className={`shape-tooltip shape-tooltip-${1}`}
                                >
                                    <Flex minH='24px' alignItems='flex-start' direction='column' gap={0}>
                                        {splitPhraseIntoLines(capitalizeFirstLetter(pharmacy.name), 20)
                                            .map((lines) => (<Text>{lines}</Text>))}
                                    </Flex>
                                </Tooltip>
                            </CustomMarker>)
                            )}
                        </MarkerClusterGroup>
                    </LayerGroup>
                )}
                {layers.find(layer => layer.id === 2 && layer.active) && (
                    <LayerGroup>
                        {spontaneousHousings.map((spontaneousHousing) =>
                        (<Polygon
                            key={spontaneousHousing.id}
                            pathOptions={spontaneousHousingsOptions}
                            positions={spontaneousHousing.geometry.coordinates}
                        ></Polygon>))}
                    </LayerGroup>
                )}
                {layers.find(layer => layer.id === 3 && layer.active) && (
                    <LayerGroup>
                        {neighborhoods.map((neighborhoods) =>
                        (<CustomPolygon
                            key={neighborhoods.id}
                            pathOptions={neighborhoodsOptions}
                            positions={neighborhoods.geometry.coordinates}
                            name={neighborhoods.neighborhoodName}
                        ></CustomPolygon>))}
                    </LayerGroup>
                )}
                {layers.find(layer => layer.id === 4 && layer.active) && (
                    <LayerGroup>
                        {roads.map((road) =>
                        (<CustomPolyline
                            key={road.osmId}
                            pathOptions={roadsOptions}
                            positions={road.geometry.coordinates}
                        ></CustomPolyline>))}
                    </LayerGroup>
                )}
                <Control prepend position='topleft'>
                    <Box pt='12px' pl='16px'>
                        <SearchBar />
                    </Box>
                </Control>
                <Control prepend position='bottomright'>
                    <Box pb='12px' pr='16px' pos='absolute' bottom='0' right='0'>
                        <CustomZoomControl />
                    </Box>
                </Control>
                <Control prepend position='topright'>
                    <LayerSelector />
                </Control>
            </MapContainer>
        </>
    )
}