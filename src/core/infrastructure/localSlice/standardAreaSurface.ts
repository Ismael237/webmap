import { create } from 'zustand';
import { createSelectors } from '../../store/helper';

export interface standardAreaSurface {
    id: number,
    name: string,
    surface: number,
    color: string,
}

interface StandardAreaSurfaceState {
    standardAreaSurfaces: standardAreaSurface[];
}

export const useStandardAreaSurfaceStore = createSelectors(create<StandardAreaSurfaceState>()(() => ({
    standardAreaSurfaces: [
        {
            id: 0,
            name: 'pharmacy',
            surface: 300,
            color: 'red'
        },
        {
            id: 1,
            name: 'preschool',
            surface: 2500,
            color: 'blue'
        },
        {
            id: 2,
            name: 'primarySchool',
            surface: 5000,
            color: 'green'
        },
    ],
})));
