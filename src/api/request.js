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

        //将返回的token（响应头中）存储到state中
        const token = resp.headers.authorization;
        if (token) {
            const userStore = useUserStore();
            userStore.setToken(token);
            console.log(userStore.token)
        }


        // 成功则直接返回数据
        return resp.data.data;
    },
    function (error) {
        // 错误的响应处理
        ElMessage.error(`获取数据失败：${error}`);
        return null;
    });

//每次需要携带token的请求都在这里统一处理
ins.interceptors.request.use(
    function (config) {
        const userStore = useUserStore();
        console.log(userStore.token);
        if (userStore.token) {
            config.headers.Authorization = `Bearer ${userStore.token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    });

export default ins;
