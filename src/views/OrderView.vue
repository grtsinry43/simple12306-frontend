<script setup>
import {onMounted, reactive} from "vue";
import {useUserStore} from "@/store/user.js";
import {ElMessage} from "element-plus";
import {cancelOrder, getOrders, payOrder} from "@/api/order.js";
import {getTickets} from "@/api/tickets.js";

const store = useUserStore();
const state = reactive({
  orders: [],
});

const fetchOrders = () => {
  console.log("获取订单信息");
  //获取订单信息
  getOrders(store.userInfo.userId).then(res => {
    console.log(res);
    state.orders = res;
  })
  //这里要根据返回的ticketId获取车票信息
  //首先请求所有车票信息，然后根据ticketId获取车票信息
  getTickets().then(res => {
    console.log(res);
    state.orders.forEach(order => {
      res.forEach(ticket => {
        if (order.ticket_id === ticket.id) {
          order.title = ticket.title;
          order.from = ticket.from;
          order.to = ticket.to;
          order.price = ticket.price;
        }
      })
    })
  })
}

onMounted(() => {
  fetchOrders();
});

const payOrderHandle = (id) => {
  console.log("支付订单");
  console.log(id);
  payOrder(id).then(res => {
    console.log(res);
  });
  fetchOrders();
  ElMessage({
    message: '支付成功',
    type: 'success'
  });
}

const cancelOrderHandle = (id) => {
  console.log("取消订单");
  console.log(id);
  cancelOrder(id).then(res => {
    console.log(res);
  });
  fetchOrders();
  ElMessage({
    message: '取消成功',
    type: 'success'
  });
}
</script>

<template>
<div class="order-container">
  <div class="order-inner">
    <h2>订单信息</h2>
    <el-table :data="state.orders">
      <el-table-column prop="title" label="车次"></el-table-column>
      <el-table-column prop="from" label="始发"></el-table-column>
      <el-table-column prop="to" label="到达"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{row}">
          <span v-if="row.status === 0">未支付</span>
          <span v-else-if="row.status === 1">已支付</span>
          <span v-else-if="row.status === 2">已取消</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" v-if="row.status !== 1 && row.status !== 2" @click="payOrderHandle(row.id)">支付订单</el-button>
          <el-button type="danger" v-if="row.status !== 2" @click="cancelOrderHandle(row.id)">取消订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<style scoped lang="less">
.order-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.order-inner {
  width: 90%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  padding: 20px;
}

.order-inner h2 {
  margin-bottom: 20px;
}
</style>
