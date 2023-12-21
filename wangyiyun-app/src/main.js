import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'  //引入vant所有组件样式
import getVant from './plugins'

const app = createApp(App)
getVant(app)
app.use(store).use(router).use(Vant).mount('#app')
