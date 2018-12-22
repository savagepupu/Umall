import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '.././view/GoodsList.vue'
import Cart from '.././view/Cart'
import Address from '.././view/Address'
import OrderConfirm from '../view/OrderConfirm'
import OrderComplete from '../view/OrderComplete'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path:'/cart',
      name: 'Cart',
      component:Cart
    },
    {
      path:'/address',
      name: 'Address',
      component:Address
    },{
      path:'/orderConfirm/:selectedAddressId',
      name: 'OrderConfirm',
      component:OrderConfirm
    },{
      path:'/orderComplete',
      name: 'OrderComplete',
      component:OrderComplete
    }
  ]
})
