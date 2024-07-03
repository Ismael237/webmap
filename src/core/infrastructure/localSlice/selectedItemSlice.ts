import { create } from 'zustand';
import { createSelectors } from '../../store/helper';
import { SpontaneousHousing } from '../../domain/entities/spontaneousHousing';
import { School } from '../../domain/entities/school';
import { Pharmacy } from '../../domain/entities/pharmacy';

export type SelectedItemName = 'Marker' | 'Polygone';
export type SelectedItemData = SpontaneousHousing | School | Pharmacy;
export type SelectedItemType = { type: SelectedItemName, data: SelectedItemData } | null;

interface MapState {
	selectedItem: SelectedItemType,
	setSelectedItem: (type: SelectedItemName, data: SelectedItemData) => void,
	resetSelectedItem: () => void,
}

export const useSelectedItemStore = createSelectors(create<MapState>((set) => ({
	selectedItem: null,
	setSelectedItem: (type, data) => set({ selectedItem: { type, data } }),
	resetSelectedItem: () => set({ selectedItem: null }),
})));
