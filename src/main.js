import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store/'
import { Lazyload } from 'vant';

import api from './utils/api'
Vue.prototype.$api = api

import img from './utils/img'
Vue.prototype.$img = img

Vue.use(Lazyload);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
