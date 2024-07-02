import { create } from 'zustand';
import { School } from '../entities/school';
import { createSelectors } from '../../store/helper';
import schoolsTab from '../../infrastructure/localData/schools/schools.json';
import { produce } from 'immer';
import { isCurrentTimeInRange } from '../../../helpers/utils/datetime';

type SchoolState = {
    schools: School[],
    setFilteredSchools: (filters: { schedulesId: number }) => void,
    visibleSchools: School[],
}

const useSchoolStoreBase = create<SchoolState>()((set) => ({
    schools: schoolsTab as School[],
    visibleSchools: schoolsTab as School[],
    setFilteredSchools: (filters) => set(produce((state: SchoolState) => {
        if(filters.schedulesId === 0){
            state.visibleSchools = state.schools;
        }else if (filters.schedulesId === 1) {
            const startTime: string = '08:00';
            const endTime: string = '16:00';
            state.visibleSchools = state.schools.filter(() => isCurrentTimeInRange(startTime, endTime));
        } else if (filters.schedulesId === 2) {
            const shuffledItems = [...state.schools].sort(() => 0.5 - Math.random());
            const teenPercentCount = Math.ceil(shuffledItems.length * 0);
            state.visibleSchools = shuffledItems.slice(0, teenPercentCount);
        }
    }))
}));

export const useSchoolStore = createSelectors(useSchoolStoreBase);