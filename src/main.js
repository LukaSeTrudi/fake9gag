import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store/index.js'

import axios from 'axios'

Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(Vuex);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
