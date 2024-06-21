<script setup>
import {RouterLink} from 'vue-router'
import {reactive} from 'vue'
import {useUserStore} from "@/store/user.js";
import {getTickets} from "@/api/tickets.js";
import {searchTickets} from "@/api/tickets.js";
import {formatDate} from "@/util/formatDate.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const store = useUserStore();
//表单数据
let data = reactive({
  from: '',
  to: '',
  date: '',
  startPrice: '',
  endPrice: ''
})

//查询车票
const searchHandle = () => {
  // date可以留空，如果留空则查询所有车票，但是from和to不能为空
  if (data.from === '' || data.to === '') {
    //el-message提示
    ElMessage({
      message: '出发地和目的地不能为空',
      type: 'warning'
    });
    return;
  }
  console.log(data.date);
  //如果不为空，date格式化成yyyy-MM-dd HH:mm:ss
  if (data.date !== '') {
    data.date = formatDate(data.date);
  }
  console.log(data);
  //校验价格区间的格式，如果不为空，必须是数字，并且startPrice小于endPrice
  if (data.startPrice !== '' && data.endPrice !== '') {
    if (isNaN(Number.parseFloat(data.startPrice)) || isNaN(Number.parseFloat(data.endPrice))) {
      ElMessage({
        message: '价格区间必须是数字',
        type: 'warning'
      });
      return;
    }
    if (data.startPrice > data.endPrice) {
      ElMessage({
        message: '最低价格不能大于最高价格',
        type: 'warning'
      });
      return;
    }
  }
  searchTickets(data).then(res => {
    console.log(res);
    store.setTickets(res);
    //跳转到车票列表页
    router.push({name: 'tickets'});
  })
}
</script>

<template>
  <div class="home-container">
    <el-col class="home-inner">
      <el-row>
        <el-card class="home-title">
          <div slot="header">
            <span>欢迎使用简单售票系统</span>
          </div>
          <div>
            <p>这是一个简单的售票系统，你可以在这里查询车票信息，购买车票，查看个人信息等。</p>
            <p>请先完成实名认证方可购票，学生认证可以添加优惠</p>
            <p>请先登录，然后开始你的购票之旅吧！</p>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <!--主页的车票查询-->
        <el-form :model="data" label-width="80px">
          <el-form-item label="出发地">
            <el-input v-model="data.from"></el-input>
          </el-form-item>
          <el-form-item label="目的地">
            <el-input v-model="data.to"></el-input>
          </el-form-item>
          <el-form-item label="出发时间">
            <el-date-picker
                v-model="data.date"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="价格区间">
            <el-input v-model="data.startPrice" placeholder="最低价格"></el-input>
            <span> - </span>
            <el-input v-model="data.endPrice" placeholder="最高价格"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchHandle">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.home-inner {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-title {
  margin: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
}
</style>
