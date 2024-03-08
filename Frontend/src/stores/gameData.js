import { defineStore } from 'pinia';
import pinia from './piniaInstance';

const useGameDataStore = defineStore('gameData', {
    state: () => ({
        
    }),
    actions: {

    }
});

export const gameData = useGameDataStore(pinia);