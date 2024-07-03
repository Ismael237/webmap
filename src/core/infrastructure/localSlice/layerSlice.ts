import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import { createSelectors } from '../../store/helper';

export interface Layer {
    id: number,
    name: string,
    active: boolean,
    type: 'Marker' | 'Polyline' | 'Polygone',
    color: string,
}

interface LayersState {
    layers: Layer[];
    toggleLayer: (id: number) => void,
}

export const useLayersStore = createSelectors(create<LayersState>()(immer((set) => ({
    layers: [
        {
            id: 0,
            name: 'Écoles',
            active: true,
            type: 'Marker',
            color: '#D00000'
        },
        {
            id: 1,
            name: 'Pharmacies',
            active: true,
            type: 'Marker',
            color: '#14591D'
        },
        {
            id: 2,
            name: 'Zones d\'habitations spontanées',
            active: true,
            type: 'Polygone',
            color: '#040414'
        },
        {
            id: 3,
            name: 'Quartiers',
            active: true,
            type: 'Polygone',
            color: '#9EA93F'
        },
        {
            id: 4,
            name: 'Routes',
            active: true,
            type: 'Polyline',
            color: '#3F88C5'
        },
    ],
    toggleLayer: (id) => set((state: LayersState) => {
        const layer = state.layers.find((l) => l.id === id);
        if (layer) {
            layer.active = !layer.active;
        }
    }),
}))));

export const getLayerById = (id: number) => {
    const layers = useLayersStore.use.layers();
    const LayerFound = layers.find(layer => layer.id === id);
    if (LayerFound) {
        return LayerFound;
    }
    return layers[0];
}