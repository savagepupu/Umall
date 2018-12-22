<template>
    <div class="cart">
      <div class="MyCart">
        <p class="cartPage">我的购物车 MY CART<button class="cartPageBackBtn" @click="backToMainPage">back</button></p>
      </div>
      <MarketBread>
        <span slot="MyCart">/ MyCart</span>
      </MarketBread>
      <div class="cartTitle">
        <div class="goods">商品</div>
        <div class="price">价格</div>
        <div class="Num">数量</div>
        <div class="totalPrice">总价</div>
        <div class="delete">删除</div>
      </div>
      <ul class="cartUl" v-for="(item,index) in cartList">
        <input  type="radio" :checked='item.checked === "1"' class="productCheckedButton" @click="cartListChecked(item)"/>
        <img class="productName" :src="item.productImage"/>
        <div class="productPrice">{{item.salePrice}}</div>
        <div class="productNum">{{item.productNum}}</div>
        <div class="productNumChange">
          <button class="productNumIncrease" @click="productNumIncrease(item)">+</button>
          <button class="productNumReduce" @click="productNumReduce(item)">-</button>
        </div>
        <div class="productTotalPrice">{{item.productNum*item.salePrice}}</div>
        <button class="productDelete" @click="cartListDelete(item,index)">移除</button>
      </ul>
      <div class="selectAllProduct">
        <input class="selectAllProductRadio" type="radio" @click="toggleCheckAll" :checked="checkAllFlag === true">select All
      </div>
      <div class="totalPriceCase">
        <p class="totalPriceTips">总金额:</p>
      </div>
      <div class="totalPriceNumCase">
        <p class="totalPriceNum">{{totalPrice}}</p>
      </div>
      <div class="Settlement">
        <button class="SettlementBtn" @click="Settlement">购物车确认</button>
      </div>
      <!--订单确认遮罩-->
      <div class="settlementConfirm" v-show="settlementConfirmState">
        <div class="settlementConfirmWindow">
          <img class="backArrow" @click="closeMask" src="../assets/后退箭头.png"/>
          <p class="loginWindowTitle">Settlement</p>
          <p>是否跳转到确认订单页面</p>
          <div class="toOderConFirmPage">
            <button class="toOderConFirmPageBtn" @click="toAddressPage">立即前往</button>
          </div>
          <div class="backToCartList">
            <button class="backToCartListBtn" @click="backToCartList">修改订单</button>
          </div>
        </div>
      </div>
      <!--未勾选商品提示遮罩层-->
      <div class="settlementChecked" v-show="settlementCheckedState">
        <div class="settlementCheckedWindow">
          <img class="backArrow" @click="closeSettlementCheckedMask" src="../assets/后退箭头.png"/>
          <p class="loginWindowTitle">Tips</p>
          <p>请勾选需要购买的商品</p>
          <div class="settlementCheckedConfirmCase">
            <button class="settlementCheckedConfirmBtn" @click="closeSettlementCheckedMask">知道了</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import MarketBread from '.././components/MarketBread'

    export default {
        mounted(){
          this.cartListFind()
        },
        data(){
          return{
            cartList:[
              {
                productImage:'',
                salePrice:'',
                productNum:'',
              }
            ],
            settlementConfirmState:false,
            settlementCheckedState:false
          }
        },
      // 时时计算,处理selectAll，以及结算总金额
      computed:{
        //  全选的标志
        checkAllFlag(){
          //选中商品数量等于商品列表的长度，则为全选,此标志触发
          return this.checkedCount === this.cartList.length
        },
        //返回选中的商品的数量
        checkedCount(){
          let i = 0
          this.cartList.forEach(
            (item)=>{
              if(item.checked === '1')i++
            }
          )
          return i
        },
        totalPrice(){
          let money = 0
          this.cartList.forEach(
            (item)=>{
              if(item.checked === '1'){
                money += parseFloat(item.salePrice)*parseInt(item.productNum)
              }
            }
          )
          return money
        }
      },
      components:{
        MarketBread
      },
      methods:{
          // 返回主页面
        backToMainPage(){
          this.$router.push('/')
        },
      //  展示购物车列表
        cartListFind(){
          this.$axios.get('/users/cartList').then(
            (response)=>{
              let res = response.data
              if(res.status === '0'){
                this.cartList = res.result
              }
            },
          ).catch((err)=>{
            console.log(err.message)
          })
        },
        //商品选中标识
        cartListChecked(item){
          item.checked = item.checked === "1"?"0":"1"
          this.$axios.post('/users/cartEdit',{
            productId:item.productId,
            productNum:item.productNum,
            checked:item.checked
          }).then(
            (response)=>{
              let res = response.data
            }
          )
        },
      //  商品数量的增加
        productNumIncrease(item){
          item.productNum++
          this.$axios.post('/users/cartEdit',{
            productId:item.productId,
            productNum:item.productNum
          }).then(
            (response)=>{
              let res = response.data
              console.log(res.result)
            }
          )
        },
        //商品数量的减少
        productNumReduce(item){
          if(item.productNum<=1){
            return;
          }else{
            item.productNum--
          }
          this.$axios.post('/users/cartEdit',{
            productId:item.productId,
            productNum:item.productNum
          }).then(
            (response)=>{
              let res = response.data
              console.log(res.result)
            }
          ).catch(
            (err)=>{
              console.log(err.message)
            }
          )
        },
        //删除商品
        cartListDelete(item,index){
          this.cartList.splice(index,1)
          this.$axios.post('/users/cartDel',{
            productId:item.productId
          }).then(
            (response)=>{
              let res = response.data
              if(res.status === '0'){
                  console.log(res.result)
              }
            }
          )
        },
        //结算按钮，打开遮罩层
        Settlement(){
          if(this.checkedCount > 0){
            this.settlementConfirmState = true
          }else{
            this.settlementCheckedState = true
          }
        },
      //  关闭订单确认遮罩层
        closeMask(){
          this.settlementConfirmState = false
        },
        // 继续修改订单
        backToCartList(){
          this.settlementConfirmState = false
        },
        //前往地址栏页面
        toAddressPage(){
          this.$router.push('/address')
        },
        //全选
        toggleCheckAll(){
          var flag = !this.checkAllFlag
          this.cartList.forEach(
            (item)=>{
              item.checked = flag?'1':'0'
            }
          )
          this.$axios.post('/users/cartCheckAll',{
            checkAll:flag
          }).then(
            (response)=>{
              let res = response.data
              if(res.status === '0'){
                console.log('全选成功')
              }
            }
          )
        },
        closeSettlementCheckedMask(){
          this.settlementCheckedState = false
        }
      }
    }
</script>

<style scoped>
  body{
    text-align: center;
  }
  .MyCart{

  }
  .cartPage{
    width: 300px;
    font-size: 20px;
    background-color: red;
    color: white;
    margin-left: 2.5%;
  }
  .cartPageBackBtn{
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
  .delete{
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
  .productCheckedButton{
    float: left;
    position: absolute;
    width: 20px;
    height: 20px;
    margin-top:53px;
    margin-left: -11%;
    border-radius: 10px;
    z-index: 1;
  }
  .ifChecked{

  }
  .productName{
    position: absolute;
    float: left;
    width: 80px;
    height: 80px;
    padding-top: 2%;
    margin-left: -5%;
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
  .productNumChange{
    position: absolute;
    width: 80px;
    margin-left: 43%;
    z-index: 2;
  }
  .productNumIncrease{
    color: red;
    font-weight: bolder;
  }
  .productNumReduce{
    color: red;
    font-weight: bolder;
  }
  .productTotalPrice{
    position: absolute;
    padding-left: 59%;
    z-index: 0;
  }
  .productDelete{
    width: 50px;
    height: 45px;
    margin-left: 72%;
    margin-top: 3%;
    border: none;
    color: red;
    cursor: pointer;
  }
  .selectAllProduct{
    width: 100px;
    margin-left: 4.5%;
  }
  .totalPriceCase{
    position: absolute;
    float: left;
    margin-left: 55%;
  }
  .totalPriceTips{
    color: black;
    font-size: 18px;
    font-weight: bolder;
  }
  .totalPriceNumCase{
    float: left;
    position: absolute;
    margin-left: 61%;
  }
  .totalPriceNum{
    color: red;
    font-weight: bolder;
    font-size: 18px;
  }
  .Settlement{
    width: 250px;
    height: 40px;
    float: right;
    margin-right: 10%;
    margin-top: 0.6%;
  }
  .SettlementBtn{
    width: 250px;
    height: 40px;
    background-color: red;
    color: white;
    font-size: 18px;
    font-weight: bolder;
  }
  .SettlementBtn:focus{
    outline: 0;
  }
  .settlementConfirm{
    width:100%;
    height:120%;
    background-color:#000;
    position:fixed;
    top:0;
    left:0;
    z-index:2;
    opacity:0.9;
  }
  .settlementConfirmWindow{
    position: absolute;
    width: 400px;
    height: 200px;
    border: 2px red solid;
    background-color: white;
    left: 50%;
    top: 40%;
    margin-left: -200px;
    margin-top: -100px;
  }
  .backArrow{
    float: left;
    width: 25px;
    margin-left: 5%;
    margin-top: 3%;
    cursor: pointer;
  }
  .loginWindowTitle{
    color: red;
    font-size: 20px;
    margin-right: 9%;
  }
  .toOderConFirmPage{
    float: left;
    margin-top: 8%;
    margin-left: 20%;
  }
  .toOderConFirmPageBtn{
    position: absolute;
    background-color: red;
    color: white;
    font-size: 15px;
    font-weight: bolder;
    border-radius: 5px;
  }
  .toOderConFirmPageBtn:hover{
    outline: 0;
  }
  .backToCartList{
    margin-top: 12%;
    margin-left: 40%;
  }
  .backToCartListBtn{

    background-color: white;
    color: red;
    font-size: 15px;
    font-weight: bolder;
    border-radius: 5px;
  }
  .backToCartListBtn:hover{
    outline: 0px;
  }
  .settlementChecked{
    width:100%;
    height:120%;
    background-color:#000;
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    opacity:0.9;
  }
  .settlementCheckedWindow{
    position: absolute;
    width: 400px;
    height: 200px;
    border: 2px red solid;
    background-color: white;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
  }
  .settlementCheckedConfirmBtn{
    width: 80px;
    color: white;
    background-color: red;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bolder;
  }
  .productDelete:focus{outline: 0}
  ::-webkit-scrollbar{width:0}
</style>
