<template>
  <div>
    <div class="MyOrderConfirm">
      <p class="orderConfirm">订单确认 Order Confirm<button class="orderConfirmPageBackBtn" @click="backToAddressPage">back</button></p>
    </div>
    <MarketBread class="MarketBread">
      <span slot="OrderConfirm">/ OrderConfirm</span>
    </MarketBread>
    <div class="cartTitle">
      <div class="goods">商品</div>
      <div class="price">价格</div>
      <div class="Num">数量</div>
      <div class="totalPrice">总价</div>
    </div>
    <ul class="cartUl" v-for="(item,index) in cartList" v-if="item.checked === '1'">
      <img class="productName" :src="item.productImage"/>
      <div class="productPrice">{{item.salePrice}}</div>
      <div class="productNum">{{item.productNum}}</div>
      <div class="productTotalPrice">{{item.productNum*item.salePrice}}</div>
    </ul>
    <div>
      <div class="sendOrder">
        <div class="sendOrderTips">
          <p>商品总金额: {{totalPrice}}</p>
          <p>运费: {{freight}}</p>
          <p>折扣: {{discount}}</p>
          <p>合计: {{totalPrice-freight-discount}}</p>
        </div>
        <div class="sendOrderBtn">
          <button @click="toOrderConfirmPage()">前往支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MarketBread from '.././components/MarketBread'

    export default {
      mounted(){
        this.orderConfirmPageFind()
      },
        data(){
          return{
            cartList:[],
            productImage:'',
            salePrice:'',
            productNum:'',
            totalPrice:0,
            freight:30,
            discount:0
          }
        },

        components:{
          MarketBread
        },
        methods:{
          backToAddressPage(){
            this.$router.push('/address')
          },
          orderConfirmPageFind(){
            this.$axios.get('/users/cartList').then(
              (response)=>{
                let res = response.data
                if(res.status === '0'){
                  this.cartList = res.result
                  this.cartList.forEach(
                    (item)=>{
                      if(item.checked === '1'){
                        this.totalPrice += item.salePrice*item.productNum
                      }
                    }
                  )
                }
              }
            )
          },
          toOrderConfirmPage(){
            this.$router.push('/orderComplete')
          }
        },
    }
</script>

<style scoped>
  .MarketBread{
    margin-left: 1.5%;
  }
  .orderConfirm{
    width: 300px;
    font-size: 20px;
    background-color: red;
    color: white;
    margin-left: 2.5%;
  }
  .orderConfirmPageBackBtn{
    position: absolute;
    margin-left: 6%;
    margin-top: 0.3%;
    border: none;
    color: red;
    font-size: 15px;
    cursor: pointer;
  }
  .cartTitle{
    width: 95%;
    height: 60px;
    border: 2px grey solid;
    background-color: darkslategray;
    color: white;
    margin: 2.5% 2.5% 0  2.5%;
  }
  .cartTitle div{
    padding-top: 20px;
    float: left;
  }
  .goods{
    padding-left: 10%;
  }
  .price{
    padding-left: 16%;
  }
  .Num{
    padding-left: 16%;
  }
  .totalPrice{
    padding-left: 16%;
  }
  .cartUl{
    width: 91.7%;
    height: 120px;
    /*border: 2px grey solid;*/
    background-color: white;
    margin-top: 0;
    margin-left: 2.5%;
  }
  .cartUl div{
    color: black;
    float: left;
    margin-top:4%;
  }
  .productName{
    position: absolute;
    float: left;
    width: 80px;
    height: 80px;
    padding-top: 2%;
    margin-left: -41%;
    z-index: 0;
  }
  .productPrice{
    position: absolute;
    padding-left: 24%;
    z-index: 0;
  }
  .productNum{
    position: absolute;
    padding-left: 42%;
    z-index: 0;
  }
  .productTotalPrice{
    position: absolute;
    padding-left: 59%;
    z-index: 0;
  }
  .sendOrder{
    float: right;
    width: 50%;
    height: 200px;
    border: red 2px dashed;
    margin-right: 2%;
  }
  .sendOrderTips{
    float: left;
    margin-left: 10%;
  }
  .sendOrderTips{
    color: gray;
  }
  .sendOrderBtn{
    float: right;
    width: 200px;
    margin-right: 8%;
    margin-top: 22%;
  }
  .sendOrderBtn button{
    width: 200px;
    height: 50px;
    color: white;
    background-color: red;
    font-size: 18px;
    border-radius: 6px;
    cursor: pointer;
  }
  .sendOrderBtn button:focus{
    outline: none;
  }
</style>
