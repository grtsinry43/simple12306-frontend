//记录用户信息，登录状态，token，使用pinia
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isLogin: false,
        token: '',
        userName: '',
        userInfo: {}
    }),
    actions: {
        login(data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.isLogin = true;
                    this.userName = data.username;
                    this.userInfo = data;
                    resolve();
                }, 1000);
            });
        },
        logout() {
            this.isLogin = false;
            this.token = '';
            this.userName = null;
            this.userInfo = {};
        },
        setToken(token) {
            this.token = token;
        },
    }
});
