import { create } from 'zustand';
import { SpontaneousHousing } from '../entities/spontaneousHousing';
import { createSelectors } from '../../store/helper';
import spontaneousHousingsTab from '../../infrastructure/localData/spontaneousHousings/spontaneousHousings.json'

interface SpontaneousHousingState {
    spontaneousHousings: SpontaneousHousing[];
}

export const useSpontaneousHousingStore = createSelectors(create<SpontaneousHousingState>()(() => ({
    spontaneousHousings: spontaneousHousingsTab as SpontaneousHousing[],
})));

