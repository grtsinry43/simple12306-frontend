import 'element-plus/dist/index.css';
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import ElementMessage from 'element-plus';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(createPinia()) // use Pinia

app.mount('#app')
