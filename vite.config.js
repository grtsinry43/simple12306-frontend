import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        // //用来配置跨域
        // host: '127.0.0.1',
        // port: 5173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5555',//目标服务器地址
                changeOrigin: true,
            },
        }
    },
    base: './',
})
