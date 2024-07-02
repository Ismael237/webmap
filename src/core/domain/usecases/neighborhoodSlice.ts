import { create } from 'zustand';
import { Neighborhood } from '../entities/neighborhood';
import neighborhoodsTab from '../../infrastructure/localData/neighborhoods/neighborhoods.json'
import { createSelectors } from '../../store/helper';

interface NeighborhoodState {
    neighborhoods: Neighborhood[],
}

export const useNeighborhoodStore = createSelectors(create<NeighborhoodState>(() => ({
    neighborhoods: neighborhoodsTab as Neighborhood[],
})));