<template>
  <div class="map">
    <div class="map__actions">
      <el-radio-group v-model="radio">
        <el-radio label="Для частных клиентов"></el-radio>
        <el-radio label="Для юридических лиц"></el-radio>
        <el-radio label="Банкоматы"></el-radio>
      </el-radio-group>
    </div>
    <div id="map" class="map__ol"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { ElRadioGroup, ElRadio } from 'element-plus';

const radio = ref('1');

onMounted(() => {
  var map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
});
</script>

<style lang="scss" scoped>
@import "ol-map";
</style>