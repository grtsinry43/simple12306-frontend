<script setup>
//页面创建时获取车票信息
import {onMounted, reactive} from "vue";
import {getTickets} from "@/api/tickets.js";

const state = reactive({
  tickets: []
});
onMounted(async () => {
  const res = await getTickets();
  console.log(res);
  state.tickets = res;
});
</script>


<template>
  <div class="text"></div>
  <div class="tickets-container">

    <el-table :data="state.tickets">
      <el-table-column prop="title" label="车次"></el-table-column>
      <el-table-column prop="from" label="始发"></el-table-column>
      <el-table-column prop="to" label="到达"></el-table-column>
      <el-table-column prop="start_date" label="发车时间"></el-table-column>
      <el-table-column prop="end_date" label="到达时间"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="train_type" label="类型"></el-table-column>
      <el-table-column prop="type_1" label="Type 1"></el-table-column>
      <el-table-column prop="type_2" label="Type 2"></el-table-column>
      <el-table-column prop="type_3" label="Type 3"></el-table-column>
      <el-table-column prop="type_4" label="Type 4"></el-table-column>
    </el-table>
  </div>
</template>


<style scoped lang="less">
.text {
  width: 100px;
  height: 100px;
  background-color: red;
}

.tickets-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  display: flex;
  box-shadow: 0 0 5px 1px #ccc;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
