<script setup>
import {reactive, toRefs} from 'vue';
import {login} from "@/api/user.js";
import {useUserStore} from "@/store/user.js";
const store = useUserStore();
let data = reactive({
  username: '',
  password: ''
})

const loginHandle = () => {
  console.log(data);
  login(data).then(res => {
    console.log(res);
    store.login(res);
  })
}
</script>

<template>
  <div class="login-container">
    <el-form :model="data" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="data.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="data.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandle">登录</el-button>
      </el-form-item>
      <span>还没有帐号？<RouterLink :to="{
        name: 'register'
      }">注册一个</RouterLink></span>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  .el-form {
    width: 300px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(20px);
    padding: 60px 40px 40px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    width: 100%;
  }

  .el-input {
    width: 100%;
  }
}
</style>
