<template>
  <div class="map">
    <div class="map__actions">
      <el-radio-group v-model="radio">
        <el-radio size="large" label="Для частных клиентов"/>
        <el-radio size="large" label="Для юридических лиц"/>
        <el-radio size="large" label="Банкоматы"/>
      </el-radio-group>
    </div>
    <YandexMap class="map__yandex" :coordinates="coordinates">
      <YandexMarker type="Point" :marker-id="markerId" :coordinates="coordinates"/>
    </YandexMap>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import { YandexMap, YandexMarker } from 'vue-yandex-maps'

const radio = ref('1');
const coordinates = ref([55.751244, 37.618423]); // Координаты Москвы по умолчанию
const mapStore = useMapStore();
const markerId = ref(1)

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
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