import { create } from 'zustand';
import { Road } from '../entities/road';
import { createSelectors } from '../../store/helper';
import roadsTab from '../../infrastructure/localData/roads/roads.json'

interface RoadState {
    roads: Road[];
}

export const useRoadStore = createSelectors(create<RoadState>()(() => ({
    roads: roadsTab as Road[],
})));