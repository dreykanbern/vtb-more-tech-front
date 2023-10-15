<template>
  <div class="map">
    <div class="map__actions">
      <el-radio-group v-model="mapStore.type">
        <el-radio size="large" label="Individual">Для частных клиентов</el-radio>
        <el-radio size="large" label="LegalEnity">Для юридических лиц</el-radio>
        <el-radio size="large" label="Atm">Банкоматы</el-radio>
      </el-radio-group>
    </div>
    <YandexMap class="map__yandex" :coordinates="coordinates" @created="initMap">
      <YandexMarker type="Point" :marker-id="'user'" :coordinates="coordinates"/>
      <YandexObjectManager :features="features"/>
      <YandexMarker type="Point"  :marker-id="features[0].id" :coordinates="features[0].geometry.coordinates" />
    </YandexMap>
  </div>
</template>

<script setup>
import { YandexMap, YandexMarker, YandexObjectManager } from "vue-yandex-maps";
import { onMounted, ref, watch } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import mapService from '@/services/mapService';

const coordinates = ref([55.751244, 37.618423]); // Координаты Москвы по умолчанию
const mapStore = useMapStore();
const features = ref([])

async function initMap() {
  const points = await mapService.findPoints(mapStore);
  features.value = mapService.convertPointsToFeatures(points);
}

watch(() => mapStore.type, async () => {
  const points = await mapService.findPoints(mapStore);
  features.value = mapService.convertPointsToFeatures(points);
});

onMounted(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      coordinates.value = [position.coords.latitude, position.coords.longitude];
      mapStore.location.latitude = position.coords.latitude;
      mapStore.location.longitude = position.coords.longitude;
      mapStore.location.radius = 3000; // радиус в метрах
    }, () => {
      console.log('Геолокация не разрешена пользователем');
    });
  } else {
    console.log('Геолокация не поддерживается этим браузером');
  }
});
</script>

<style lang="scss" scoped>
@import "my-map";
</style>