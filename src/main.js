import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store/index.js'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
