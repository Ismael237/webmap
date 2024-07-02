import {create} from 'zustand';
import { createSelectors } from '../../store/helper';
import { SpontaneousHousing } from '../../domain/entities/spontaneousHousing';

export type selectedItemType = SpontaneousHousing | null;

interface MapState {
  selectedItem: selectedItemType;
  setSelectedItem: (item: selectedItemType) => void;
}

export const useSelectedItemStore = createSelectors(create<MapState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
})));
