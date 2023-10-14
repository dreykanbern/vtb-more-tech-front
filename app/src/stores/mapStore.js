import { defineStore } from 'pinia';

export const useMapStore = defineStore({
    id: 'mapStore',
    state: () => ({
        location: {
            latitude: 0,
            longitude: 0,
            radius: 0,
        },
    }),
    actions: {
        setLocation(newLocation) {
            this.location = newLocation;
        },
    },
});