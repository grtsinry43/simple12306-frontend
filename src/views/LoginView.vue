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
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;

  .el-form {
    width: 300px;
    margin-top: 100px;
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
