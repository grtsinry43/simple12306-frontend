<script setup>
import {useUserStore} from "@/store/user.js";

const store = useUserStore();
const logoutHandle = () => {
  store.logout();
}
</script>

<template>
  <div class="banner-container">
    <span class="title">简单售票系统</span>

    <ul class="banner-item-container">
      <li class="banner-item">
        <RouterLink :to="{
          name: 'home'
        }" class="banner-link">首页</RouterLink>
        <RouterLink :to="{
          name: 'order'
        }" class="banner-link">订单管理</RouterLink>
      </li>
    </ul>
    <ul class="banner-profile-container">
      <li v-if="store.userName" class="banner-profile-username">当前登录的用户：{{ store.userName }}</li>
      <RouterLink v-if="store.userName" :to="{ name: 'user'}">
        <el-button type="primary">用户中心</el-button>
      </RouterLink>
      <li class="banner-profile-action">
        <el-button v-if="store.userName" type="primary" plain @click="logoutHandle">退出登录</el-button>
        <RouterLink v-else :to="{ name: 'login'}">
          <el-button type="primary">登录</el-button>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.banner-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 20px;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.3);
  z-index: 99;

  .banner-profile-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .banner-profile-username {
    margin-right: 10px;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.banner-link{
  margin-right: 20px;
  text-decoration: none;
  color: inherit;
}
</style>
