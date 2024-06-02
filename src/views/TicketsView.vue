<script setup>
//页面创建时获取车票信息
import {onMounted, reactive} from "vue";
import {useUserStore} from "@/store/user.js";
import {newOrder} from "@/api/order.js";

const store = useUserStore();

const state = reactive({
  tickets: [],
  dialogVisible: false,
  form: {
    userId: null,
    ticketId: null,
    type: null,
    userInfo: {
      name: "",
      phone: "",
      idCard: "",
    }
  }
});
onMounted(async () => {
  //从store中获取车票信息
  state.tickets = store.tickets;
});

//购买车票
const buyTicketHandle = () => {
  console.log("购买车票");
  console.log(state.form);
  //提交订单
  newOrder(state.form).then(res => {
    console.log(res);
    //关闭弹窗
    state.dialogVisible = false;
  });
}

//打开购买车票的弹窗
const openOrderView = (id) => {
  console.log(store.tickets)
  console.log("打开购买车票的弹窗");
  console.log(id);
  state.form.ticketId = id;
  state.form.userId = store.userInfo.userId;
  state.dialogVisible = true;
}

</script>


<template>
  <div class="tickets-container">
    <div class="tickets-inner">
      <h2>车票信息</h2>
      <el-table :data="state.tickets">
        <el-table-column prop="title" label="车次"></el-table-column>
        <el-table-column prop="from" label="始发"></el-table-column>
        <el-table-column prop="to" label="到达"></el-table-column>
        <el-table-column prop="start_date" label="发车时间"></el-table-column>
        <el-table-column prop="end_date" label="到达时间"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="train_type" label="类型">
          <template v-slot="{row}">
            <span v-if="row.train_type === 1">高铁</span>
            <span v-else-if="row.train_type === 2">动车</span>
            <span v-else-if="row.train_type === 3">普快</span>
          </template>
        </el-table-column>
        <el-table-column prop="type_1">
          <template v-slot="{row}">
            <!--车票类型，受车辆类型影响-->
            <span v-if="row.train_type === 1">商务座</span>
            <span v-else-if="row.train_type === 2">商务座</span>
            <span v-else-if="row.train_type === 3">硬座</span>
            <!--显示type_1值-->
            <span>剩余：{{ row.type_1 }}</span>
            <!--如果type_1大于0，显示el-button(primary)-->
            <el-button @click="openOrderView(row.id)" v-if="row.type_1 > 0" type="primary">购买</el-button>
            <!--否则显示el-button(禁用)-->
            <el-button v-else disabled>售罄</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type_2">
          <template v-slot="{row}">
            <span v-if="row.train_type === 1">一等座</span>
            <span v-else-if="row.train_type === 2">一等座</span>
            <span v-else-if="row.train_type === 3">硬卧</span>
            <span>剩余：{{ row.type_2 }}</span>
            <el-button @click="openOrderView(row.id)" v-if="row.type_2 > 0" type="primary">购买</el-button>
            <el-button v-else disabled>售罄</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type_3">
          <template v-slot="{row}">
            <span v-if="row.train_type === 1">二等座</span>
            <span v-else-if="row.train_type === 2">二等座</span>
            <span v-else-if="row.train_type === 3">软卧</span>
            <span>剩余：{{ row.type_3 }}</span>
            <el-button @click="openOrderView(row.id)" v-if="row.type_3 > 0" type="primary">购买</el-button>
            <el-button v-else disabled>售罄</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type_4">
          <template v-slot="{row}">
            <span v-if="row.train_type === 1">无座</span>
            <span v-else-if="row.train_type === 2">无座</span>
            <span v-else-if="row.train_type === 3">无座</span>
            <span>剩余：{{ row.type_4 }}</span>
            <el-button @click="openOrderView(row.id)" v-if="row.type_4 > 0" type="primary">购买</el-button>
            <el-button v-else disabled>售罄</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--创建订单的弹窗表单-->
    <el-dialog title="购买车票" v-model="state.dialogVisible">
      <el-form :model="state.form" label-width="80px">
        <el-form-item label="车次">
          <el-input v-model="state.form.ticketId" disabled></el-input>
        </el-form-item>
        <el-form-item label="车票类型">
          <el-radio-group v-model="state.form.type">
            <el-radio :label="1">商务座</el-radio>
            <el-radio :label="2">一等座</el-radio>
            <el-radio :label="3">二等座</el-radio>
            <el-radio :label="4">无座</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="乘客信息">
          <el-input v-model="state.form.userInfo.name" placeholder="姓名"></el-input>
          <el-input v-model="state.form.userInfo.phone" placeholder="电话"></el-input>
          <el-input v-model="state.form.userInfo.idCard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="buyTicketHandle">购买</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<style scoped lang="less">
.text {
  width: 100px;
  height: 100px;
  background-color: red;
}

.tickets-container {
  display: flex;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 5px 1px #ccc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tickets-inner {
  width: 80%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 5px 1px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10em;
}
</style>
