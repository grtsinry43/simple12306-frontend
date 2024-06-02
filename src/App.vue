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
@import "@/styles/global.css";
.router-view {
  background: url('@/assets/bg.webp') no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
