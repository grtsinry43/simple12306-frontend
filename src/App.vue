<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Banner from "@/components/Banner.vue";
</script>

<template>
  <Banner></Banner>
  <RouterView class="router-view"/>
  <RouterLink>About</RouterLink>
</template>

<style lang="less" scoped>
@import "@/styles/global";
.router-view {
  background: url('@/assets/bg.webp') no-repeat center center fixed;
  background-size: cover;
}
</style>
