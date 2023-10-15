import { defineStore } from 'pinia';
import { reactive } from 'vue';
import mapService from '@/services/mapService';

export const useMapStore = defineStore({
    id: 'mapStore',
    state: () => ({
        location: reactive({
            latitude: 0,
            longitude: 0,
            radius: 0,
        }),
        type: 'Atm', // Изначально установленное значение
        markers: [],
    }),
    actions: {
        setLocation(newLocation) {
            this.location = newLocation;
        },
        setType(newType) {
            this.type = newType;
        },
        async findPoints() { // Добавьте метод findPoints
            const points = await mapService.findPoints(this);
            this.markers = points;
        },
    },
});