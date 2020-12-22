import Vue from 'vue'
import App from './App'
import router from './router'

//引入axios
import axios from "axios"

//引入store
import store from './store'

//引入mint-ui
import mint from "mint-ui"
import 'mint-ui/lib/style.css'
import {Toast} from "mint-ui"
Vue.prototype.$toast = Toast;
Vue.use(mint)

//重置样式表
import '@/assets/reset/reset.css';

//阻止显示生产模式的消息
Vue.config.productionTip = false;

//获取后台地址配置
axios.get('/static/config/ipconfig.json').then((config) => {
  axios.defaults.baseURL = config.data.url;
  Vue.prototype.$axios = axios;
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})



