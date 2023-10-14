import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useMapStore = defineStore({
    id: 'mapStore',
    state: () => ({
        location: reactive({
            latitude: 0,
            longitude: 0,
            radius: 0,
        }),
        type: 'Atm', // Изначально установленное значение
    }),
    actions: {
        setLocation(newLocation) {
            this.location = newLocation;
        },
        setType(newType) {
            this.type = newType;
        },
    },
});