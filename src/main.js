import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI);

import './assets/css.css'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem("token");
    return config;
})
Vue.prototype.myaxios = axios;
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')