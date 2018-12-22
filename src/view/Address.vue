<template>
  <div class="address">
    <div class="MyAddress">
      <p class="addressPage">地址确认 MY ADDRESS<button class="addressPageBackBtn" @click="backToCartPage">back</button></p>
    </div>
    <MarketBread>
      <span slot="Address">/ Address</span>
    </MarketBread>
    <div class="userAddressList">
      <div class="userInformation">
        <p>收件人信息</p>
      </div>
      <ul v-for="item in addressList">
        <li class="addressListLi" style="list-style-type: none" v-bind:class="{'addressChecked':item.isDefault === true}" @click="selectedAddressId=item.adressId">
            <div class="userName">
              <span>{{item.userName}}</span>
            </div>
            <div class="streetName">
              <span>{{item.streetName}}</span>
            </div>
            <div class="tel">
              <span>{{item.tel}}</span>
            </div>
            <div class="postCode">
              <span>{{item.postCode}}</span>
            </div>
            <div class="default">
              <button>默认</button>
            </div>
            <div class="deleteAddress">
              <img src=".././assets/删除地址.png"/>
            </div>
        </li>
        <li class="createAddressListLi" style="list-style-type: none">
          <div class="createAddressTips">
            <p>Add</p>
            <p>新增地址</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="payBy">
      <p>支付方式</p>
      <div class="chooseToPay">
        <button>银行卡支付</button>
        <button>微信支付</button>
        <button>支付宝支付</button>
      </div>
    </div>
    <div class="sendOrder">
      <p>订单提交</p>
      <!--<div class="orderInformation">-->
        <!--<p>商品名称</p>-->
        <!--<p>件商品 总金额:</p>-->
        <!--<p>运费:</p>-->
      <!--</div>-->
      <!--<div class="sendTotalPrice">-->
        <!--<p>总金额:</p>-->
      <!--</div>-->
      <div class="sendOrderBtn">
        <button @click="toOrderConfirmPage(selectedAddressId)">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
    import MarketBread from '.././components/MarketBread'

    export default {
      mounted(){
        this.addressListFind()
      },
      data(){
        return{
          addressList:[
            {
              userName:'',
              streetName:'',
              tel:'',
              postCode:'',
              adressId:'',
            }
          ],
          selectedAddressId:''
        }
      },
      components:{
        MarketBread
      },
      methods:{
        //地址列表查询
        addressListFind(){
          this.$axios.get('/users/addressList').then(
            (response)=>{
              let res = response.data
              if(res.status === '0'){
                this.addressList = res.result
              }
            }
          )
        },
        //返回上一级
        backToCartPage(){
          this.$router.push('/cart')
        },
        // 前往订单确认支付页面
        toOrderConfirmPage(selectedAddressId){
          this.$router.push({
            path:`/orderConfirm/${selectedAddressId}`
          })
        }
      }
    }
</script>

<style scoped>
  .MyAddress{

  }
  .addressPage{
    width: 300px;
    font-size: 20px;
    background-color: red;
    color: white;
    margin-left: 2.5%;
  }
  .addressPageBackBtn{
    position: absolute;
    margin-left: 6%;
    margin-top: 0.3%;
    border: none;
    color: red;
    font-size: 15px;
    cursor: pointer;
  }
  .userInformation{
    width: 170px;
  }
  .userAddressList{
    width: 96%;
    height: 275px;
    border: 1px red dashed;
    margin-left: 2%;
  }
  .addressListLi{
    margin: 0;
    float: left;
    width: 250px;
    height: 200px;
    border: 1px gray dashed;
  }
  .addressListLi span{
    font-weight: bolder;
    font-size: 20px;
  }
  .addressListLi:hover{
    border: 2px goldenrod solid;
  }
  .addressChecked{
    border: 2px goldenrod solid;
  }
  .userName{
    margin-top: 12%;
  }
  .default{
    position: absolute;
    margin-left: 3%;
    margin-top: 2%;
  }
  .default button{
    width: 40px;
    border: none;
    color: red;
  }
  .deleteAddress{
    position: absolute;
    margin-left: 14%;
    margin-top: 1.5%;
  }
  .createAddressListLi{
    margin-top: 0;
    float: left;
    width: 250px;
    height: 200px;
    border: 1px gray dashed;
    margin-left: 5%;
  }
  .createAddressListLi:hover{
    border: 2px goldenrod solid;
  }
  .createAddressTips{
    margin-top: 20%;
  }
  .payBy{
    width: 96%;
    height: 100px;
    border: 1px red dashed;
    margin-left: 2%;
    margin-top: 1%;
  }
  .payBy p{
    width: 170px;
  }
  .chooseToPay{
    width: 300px;
    margin-left: 20px;
  }
  .chooseToPay button{
    color: black;
    border: 1px red solid;
    margin-left: 20px;
  }
  .orderInformation{
    margin-left: 15%;
  }
  .orderInformation p{
    font-size: 10px;
  }
  .sendTotalPrice{
    width: 200px;
    float: left;
    margin-left: 35%;
    margin-top: -3%;
  }
  .sendOrder{
    float: right;
    width: 60%;
    height: 180px;
    border: 3px red solid;
    margin-left: 2%;
    margin-top: 1%;
    margin-right: 2%;
  }
  .sendOrder p{
    width: 170px;
  }
  .sendOrderBtn{
    float: right;
    width: 200px;
    margin-right: 10%;
    margin-top: 6%;
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
