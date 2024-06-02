<script setup>
import {useUserStore} from "@/store/user.js";
import {onMounted, reactive} from "vue";
import {getInfo, updateInfo, verify, verifyEdu} from "@/api/user.js";

const store = useUserStore();
const state = reactive({
  dialogVisible: false, // 控制弹窗的显示或隐藏
  form: {
    username: store.userName,
    email: store.userInfo.email ? store.userInfo.email : '',
    phone: store.userInfo.phone ? store.userInfo.phone : '',
    region: store.userInfo.region ? store.userInfo.region : '',
    gender: store.userInfo.gender ? store.userInfo.gender : '',
  }
});
//页面创建时，获取用户信息
onMounted(() => {
  console.log("获取用户信息");
  getInfo().then(res => {
    console.log(res)
    store.setUserInfo(res);
  })
  console.log(store.userInfo);
});
const editInfoHandle = () => {
  state.dialogVisible = !state.dialogVisible;
  console.log(state.dialogVisible);
  console.log("修改用户信息");
}
const updateInfoHandle = () => {
  console.log("提交用户信息");
  console.log(state.form);
  state.dialogVisible = false;
  store.setUserInfo({
    ...store.userInfo,
    email: state.form.email,
    phone: state.form.phone,
    region: state.form.region,
    gender: state.form.gender,
  });
  updateInfo(state.form).then(res => {
    console.log(res);
  })
}
const verifyEduHandle = () => {
  console.log("验证学生身份");
  verifyEdu(store.userName).then(res => {
    console.log(res);
  })
  store.setUserInfo({
    ...store.userInfo,
    isStudent: true
  });
}
const verifyHandle = () => {
  console.log("实名认证");
  verify(store.userName).then(res => {
    console.log(res);
  });
  store.setUserInfo({
    ...store.userInfo,
    isVerified: true
  });
}
</script>

<template>
  <div class="userinfo-container">
    <div class="user-inner">
      <div class="title">用户中心</div>
      <div class="userinfo-inner">
        <div class="key">用户id（系统生成）：</div>
        <span>{{ store.userInfo.userId }}</span>
        <div class="key">用户名：</div>
        <span>{{ store.userName }}</span>
        <div class="key">用户信息：</div>
        <div class="info-item" v-for="(value, key) in store.userInfo" :key="key">
          <div>{{ key }}: {{ value }}</div>
        </div>
      </div>
      <div class="action">
        <ElButton type="primary" @click="editInfoHandle">修改用户信息</ElButton>
        <ElButton type="primary" v-if="!store.userInfo.isStudent" @click="verifyEduHandle">验证学生身份</ElButton>
        <ElButton type="primary" v-if="!store.userInfo.isVerified" @click="verifyHandle">实名认证</ElButton>
      </div>
    </div>
    <ElDialog v-model="state.dialogVisible" title="修改用户信息">
      <ElForm :model="state.form" label-width="80px">
        <ElFormItem label="用户名">
          <ElInput v-model="store.userName" disabled></ElInput>
        </ElFormItem>
        <ElFormItem label="邮箱">
          <ElInput v-model="state.form.email"></ElInput>
        </ElFormItem>
        <ElFormItem label="电话">
          <ElInput v-model="state.form.phone"></ElInput>
        </ElFormItem>
        <ElFormItem label="性别">
          <ElRadioGroup v-model="state.form.gender">
            <ElRadioButton label="男"></ElRadioButton>
            <ElRadioButton label="女"></ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="地区">
          <ElInput v-model="state.form.region"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="updateInfoHandle">提交</ElButton>
        </ElFormItem>
      </ElForm>
    </ElDialog>
  </div>

</template>

<style scoped lang="less">
.userinfo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 40px;
}
.user-inner {
  width: 60%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.userinfo-inner {
  padding: 20px;
  width: 60%;
}
.userinfo-inner .key{
  font-weight: bold;
}
.userinfo-inner div{
  margin-bottom: 5px;
}
.title{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.action{
  display: flex;
}
</style>
