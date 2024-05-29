<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Banner from "@/components/Banner.vue";
</script>

<template>
  <Banner></Banner>
  <RouterView/>
  <RouterLink>About</RouterLink>
</template>

<style lang="less" scoped>
@import "@/styles/global";
</style>
