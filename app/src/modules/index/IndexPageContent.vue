<template>
  <base-content>

    <base-header class="header">
      <nav class="header__nav">
        <router-link to="/">
          <icon-v-t-b class="header__icon"/>
        </router-link>
      </nav>
    </base-header>

    <base-wrapper>
      <ol-map/>
    </base-wrapper>

  </base-content>
</template>

<script setup>
import BaseWrapper from "@/components/base/wrapper/BaseWrapper.vue";
import OlMap from "@/components/Map/OlMap.vue";
import BaseHeader from "@/components/base/header/BaseHeader.vue";
import IconVTB from "@/components/icons/IconVTB.vue";
import BaseContent from "@/components/base/content/BaseContent.vue";
</script>

<style lang="scss" scoped>
@import "index-page-content";
</style>