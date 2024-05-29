import axios from "axios";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/user.js";


// 统一封装，便于调用
const ins = axios.create();
ins.interceptors.response.use(
    function (resp) {
        if (resp.data.code !== 200) {
            ElMessage.error(resp.data.msg);
            return null;
        }

        //将返回的token存储到state中
        if (resp.data.data.token) {
            const userStore = useUserStore();
            userStore.setToken(resp.data.data.token);
        }

        // 成功则直接返回数据
        return resp.data.data;
    },
    function (error) {
        // 错误的响应处理
        ElMessage.error(`获取数据失败：${error}`);
        return null;
    });

export default ins;
