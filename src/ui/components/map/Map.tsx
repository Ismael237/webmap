import L, { LatLngExpression, MarkerCluster } from 'leaflet';
import { LayerGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import Control from 'react-leaflet-custom-control'
import { CustomMarker } from '../customMarker/CustomMarker';
import { useSchoolStore } from '../../../core/domain/usecases/schoolSlice';
import { usePharmacyStore } from '../../../core/domain/usecases/pharmacySlice';
import { useSpontaneousHousingStore } from '../../../core/domain/usecases/spontaneousHousingSlice';
import { useNeighborhoodStore } from '../../../core/domain/usecases/neighborhoodSlice';
import { useRoadStore } from '../../../core/domain/usecases/roadSlice';
import { CustomPolygon } from '../customPolygon/CustomPolygon';
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { CustomZoomControl } from '../customZoomControl/CustomZoomControl';
import { SearchBar } from '../searchBar/SearchBar';
import '../../../assets/css/leaflet.css';
import { LayerSelector } from '../layerSelector/LayerSelector';
import { getLayerById, useLayersStore } from '../../../core/infrastructure/localSlice/layerSlice';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { capitalizeFirstLetter, splitPhraseIntoLines } from '../../../helpers/utils/string';
import { CustomPolyline } from '../customPolyline/CustomPolyline';
import { SelectedItemData, useSelectedItemStore } from '../../../core/infrastructure/localSlice/selectedItemSlice';
import { MyDrawer } from '../myDrawer/MyDrawer';
import { SpontaneousHousingInfo } from '../spontaneousHousing/SpontaneousHousingInfo';
import { CircleAreaGroup } from '../circleAreaGroup/CircleAreaGroup';
import { SelectedItemCircle } from '../selectedItemCircle/SelectedItemCircle';
import { BurgerIcon } from '../icons/burgerIcon/BurgerIcon';
import { SchoolInfo } from '../schoolInfo/SchoolInfo';
import { PharmacyInfo } from '../phamarcyInfo/PharmacyInfo';

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

    const neighborhoods = useNeighborhoodStore.use.neighborhoods();
    const roads = useRoadStore.use.roads();
    const layers = useLayersStore.use.layers();
    const visibleSchools = useSchoolStore.use.visibleSchools();
    const visiblePharmacies = usePharmacyStore.use.visiblePharmacies();
    const spontaneousHousings = useSpontaneousHousingStore.use.spontaneousHousings();
    const setSelectedItem = useSelectedItemStore.use.setSelectedItem();
    const resetSelectedItem = useSelectedItemStore.use.resetSelectedItem();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: legendIsOpen,
        onOpen: legendOnOpen,
        onClose: legendOnClose
    } = useDisclosure();

    const spontaneousHousingsOptions = {
        color: getLayerById(2).color
    };
    const neighborhoodsOptions = { color: getLayerById(3).color };
    const roadsOptions = { color: getLayerById(4).color };

    const handlePolygonClick = (polygon: SelectedItemData) => {
        setSelectedItem('Polygone', polygon);
        onOpen();
    };

    const handleMarkerClick = (marker: SelectedItemData) => {
        setSelectedItem('Marker', marker);
        onOpen();
    };

    const onDrawerClose = () => {
        resetSelectedItem();
        onClose()
    }

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
                minZoom={13}
                maxZoom={maxZoom}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SelectedItemCircle />
                {layers.find(layer => layer.id === 0 && layer.active) && (
                    <LayerGroup>
                        <MarkerClusterGroup
                            iconCreateFunction={(c) => createMarkerClusterCustomIcon(c, 0)}
                            chunkedLoading
                        >
                            {visibleSchools.map((school, i) => (<CustomMarker
                                key={i} id={0}
                                position={school.geometry.coordinates}
                                onClick={() => handleMarkerClick(school)}
                            >
                                <Tooltip offset={[8, -14]} interactive permanent className={`shape-tooltip shape-tooltip-${0}`}>
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
                                onClick={() => handleMarkerClick(pharmacy)}
                            >
                                <Tooltip
                                    offset={[16, 2]}
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
                {layers.find(layer => layer.id === 2 && layer.active) && (
                    <LayerGroup>
                        <CircleAreaGroup />
                        {spontaneousHousings.map((spontaneousHousing) =>
                        (<CustomPolygon
                            key={spontaneousHousing.id}
                            pathOptions={spontaneousHousingsOptions}
                            positions={spontaneousHousing.geometry.coordinates}
                            onClick={() => handlePolygonClick(spontaneousHousing)}
                        ></CustomPolygon>))}
                    </LayerGroup>
                )}
                <Control prepend position='topleft'>
                    <Box pt='12px' px={['12px', null, '16px']}>
                        <SearchBar />
                    </Box>
                </Control>
                <Control prepend position='bottomright'>
                    <Box pb='12px' px={['12px', null, '16px']} pos='absolute' bottom='0' right='0'>
                        <CustomZoomControl />
                    </Box>
                </Control>
                <Control prepend position='topright'>
                    {!legendIsOpen && (<IconButton
                        display={['none', null, 'inline-flex']}
                        w='40px'
                        h='40px'
                        colorScheme='teal'
                        icon={<BurgerIcon />}
                        aria-label='Open the legend card'
                        pos='absolute'
                        top='16px'
                        right='16px'
                        onClick={legendOnOpen}
                    />)}
                    <LayerSelector isOpen={legendIsOpen} onClose={legendOnClose} />
                </Control>
            </MapContainer>
            <MyDrawer isOpen={isOpen} onClose={onDrawerClose}>
                <SpontaneousHousingInfo />
                <SchoolInfo />
                <PharmacyInfo />
            </MyDrawer>
        </>
    )
}