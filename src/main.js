// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from '@tygr/vue-infinite-scroll'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueLazyLoad)
Vue.use(infiniteScroll)
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state){
      // state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount = cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
