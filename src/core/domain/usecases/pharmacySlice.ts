import { create } from 'zustand';
import { Pharmacy } from '../entities/pharmacy';
import { createSelectors } from '../../store/helper';
import  pharmaciesTab from '../../infrastructure/localData/pharmacies/pharmacies.json'
import { isCurrentTimeInRange } from '../../../helpers/utils/datetime';
import { produce } from 'immer';

interface PharmacyState {
    pharmacies: Pharmacy[],
    setFilteredPharmacies: (filters: { schedulesId: number }) => void,
    visiblePharmacies: Pharmacy[],
}

export const usePharmacyStore = createSelectors(create<PharmacyState>()((set) => ({
    pharmacies: pharmaciesTab as Pharmacy[],
    visiblePharmacies: pharmaciesTab as Pharmacy[],
    setFilteredPharmacies: (filters) => set(produce((state: PharmacyState) => {
        if(filters.schedulesId === 0){
            state.visiblePharmacies = state.pharmacies;
        }else if (filters.schedulesId === 1) {
            const startTime: string = '09:00';
            const endTime: string = '18:00';
            state.visiblePharmacies = state.pharmacies.filter(() => isCurrentTimeInRange(startTime, endTime));
        } else if (filters.schedulesId === 2) {
            const shuffledItems = [...state.pharmacies].sort(() => 0.5 - Math.random());
            const teenPercentCount = Math.ceil(shuffledItems.length * 0.1);
            state.visiblePharmacies = shuffledItems.slice(0, teenPercentCount);
        }
    }))
})));
