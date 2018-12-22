<template>
  <div style="overflow:scroll;">
    <MarketHeader></MarketHeader>
    <MarketBread>
      <span slot="Goods">/Goods</span>
    </MarketBread>
    <div class="goodsListPageGoodsListMain">
      <!--价格过滤模块-->
      <div class="goodsListPriceFilterCase">
        <span style="display: block">P R I C E</span>
        <dd @click="allPriceGoods">all</dd>
        <div v-for="(price,index) in priceFilter">
          <dd @click="setPriceFilter(index)">{{price.minPrice}}-{{price.maxPrice}}</dd>
        </div>
        <div class="priceSort-Up"  :class="{'priceSort-Down':!sortFlag}">
          <img @click="priceSort" src="../assets/箭头.png"/>
        </div>
      </div>
      <div class="goodsListPageRecommendCase" style="overflow:scroll;">
        <!--<span>首页推荐板块</span>-->
        <ul class="goodsListPageRecommendCommodityUl" style="position: absolute">
          <li class="goodsListPageRecommendCommodityLi" v-for="item in recommendGoodsList" onmousemove="this.className ='goodsListPageRecommendCommodityLiD1'" onmouseout="this.className='goodsListPageRecommendCommodityLiD2'" style="list-style-type: none">
            <div class="forPosition">
              <div class="goodsListPageRecommendCommodityImg">
                <a href="#">
                  <img :src="item.productImage"/>
                </a>
              </div>
              <div class="goodsListPageRecommendCommodityData">
                <div class="goodsListPageRecommendCommodityName">{{item.productName}}</div>
                <div class="goodsListPageRecommendCommodityPrice">{{item.salePrice}}</div>
                <button class="goodListPageRecommendGoodsAddCartButton" @click="addCart(item.productId)">加入购物车</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--加入购物车提示框遮罩层-->
    <div class="addCartMask" v-show="addCartMaskState">
      <div class="addCartWindow">
        <img class="backArrow" @click="closeAddCartMask" src="../assets/后退箭头.png"/>
        <p class="addFailTips">
          {{resMsg}}
          {{resResult}}
        </p>
        <div class="addCartBtn">
          <button class="addCartConfirmBtn" @click="addCartFailToLogin">确定</button>
        </div>
        <div class="toCartBtn">
          <button class="sureToCartPage" @click="sureToCartPage">前往购物车</button>
        </div>
      </div>
    </div>
    <!--<MarketFooter></MarketFooter>-->
  </div>
</template>

<script>
   import MarketHeader from '.././components/MarketHeader'
   // import MarketFooter from '.././components/MarketFooter'
   import MarketBread from '.././components/MarketBread'
  export default {
    mounted(){
      this.goodsListPageGetRecommendGoods()
    },
    data(){
      return{
        recommendGoodsList:[],
        priceChecked:'all',
        page:1,
        pageSize:6,
        resMsg:'',
        resResult:'',
        sortFlag:true,
        addCartMaskState:false,
        priceFilter: [
          {
            minPrice : 0.00,
            maxPrice : 1000.00
          },
          {
            minPrice : 1000.00,
            maxPrice : 2000.00
          },
          {
            minPrice : 2000.00,
            maxPrice : 5000.00
          },
          {
            minPrice : 5000.00,
            maxPrice : 10000.00
          },
        ],
      }
    },
    components: {
      MarketHeader,
      // MarketFooter,
      MarketBread
    },
    methods: {
      goodsListPageGetRecommendGoods(){
        let param = {
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceChecked
        }
        this.$axios.get('/goods/list',{
          params:param
        }).then(
          (response) => {
            let res = response.data
            if(res.status === "0"){
              this.recommendGoodsList = res.result.list
            }else {
              this.recommendGoodsList = []
            }
          }
        )
      },
      //价格排序
      priceSort(){
        this.sortFlag = !this.sortFlag
        this.page = 1
        this.goodsListPageGetRecommendGoods()
      },
    //  价格过滤
      setPriceFilter(index){
          this.priceChecked = index
          this.page = 1
          this.goodsListPageGetRecommendGoods()
      },
      //浏览所有价格的产品
      allPriceGoods(){
        this.page = 1
        this.priceChecked = 'all'
        this.goodsListPageGetRecommendGoods()
      },
      //加入购物车
      addCart(productId){
        this.$axios.post('/goods/addCart',{
          productId:productId
        }).then(
          (response)=>{
            if(response.data.status = '0'){
              this.resMsg= response.data.msg
              this.resResult = response.data.result
              this.addCartMaskState = true
              this.$store.state.cartCount++
            }else{
              console.log('加入失败')
              this.addCartMaskState = true
            }
          },
        ).catch(
          (err)=>{
            console.log(err.message)
          }
        )
      },
      //关闭加入购物车提示遮罩层
      closeAddCartMask(){
        this.addCartMaskState = false
      },
    //  加入失败,关闭购物车提示框
      addCartFailToLogin(){
        this.addCartMaskState = false
      },
    //  加入成功询问是否跳转购物车页面
      sureToCartPage(){
        this.$router.push('/cart')
      }
    }
  }
</script>
<style>
  .goodsListPageGoodsListMain{
    width: 100%;
  }
  .goodsListPriceFilterCase{
    float: left;
    width: 20%;
    height: 150px;
    border: 1px darkcyan solid;
    margin-left: 9%;
  }
  .goodsListPriceFilterCase dd {
    margin: 1px;
    border: none;
    outline: none;
    font-size: 15px;
  }
  .goodsListPriceFilterCase dd:hover{
    text-decoration: underline;
    cursor: pointer;
    color: red;
  }
  .priceSort-Up{
    float: right;
    margin-right: 20px;
    transition: all .3s ease-out;
  }
  .priceSort-Up:hover{
    cursor: pointer;
  }
  .priceSort-Down{
    float: right;
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
  .priceSort-Down:hover{
    cursor: pointer;
  }
  .cur{
    color: red;
  }
  .goodsListPageGoodsTypeCase button{
    border: none;
    color: orangered;
    cursor: pointer;
  }
  .goodsListPageGoodsTypeCase button:hover{
    text-decoration: underline;
  }
  .goodsListPageAdvertisementBroadcast{
    width: 60%;
    height: 150px;
    border: 1px darkcyan solid;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 31%;
  }
  .VipMemberCenterCase{
    float: left;
    width: 20%;
    height: 260px;
    border: 1px darkcyan solid;
    margin-left: 9%;
  }
  .goodsListPageRecommendCase{
    width: 50%;
    height: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 31%;
  }
  ::-webkit-scrollbar{width:0}
  .goodsListPageRecommendCommodityUl{
    padding-left: 0;
  }
  .goodsListPageRecommendCase ul,li{
    float: left;
    margin: 30px 20px 20px 20px;
  }
  .goodsListPageRecommendCommodityLi{
    width: 150px;
    height: 230px;
    /*border: 1px red solid;*/
  }
  .goodsListPageRecommendCommodityLiD1{
    margin-top: 20px;
    width: 150px;
    height: 230px;
    transition: all .3s ease-out;
  }
  .goodsListPageRecommendCommodityLiD2{
    width: 150px;
    height: 230px;
    transition: all .3s ease-out;
  }
  .forPosition{
    position: absolute;
  }
  .goodsListPageRecommendCommodityName{
    height: 20px;
    width: 100px;
    /*border: 1px red solid;*/
  }
  .goodsListPageRecommendCommodityPrice{
    height: 20px;
    width: 100px;
    /*border: 1px red solid;*/
  }
  .goodsListPageRecommendCommodityData{
    margin-top: 10px;
    margin-left: 23px;
  }
  .goodsListPageRecommendCommodityImg{
    width: 150px;
    height: 140px;
  }
  .goodListPageRecommendGoodsAddCartButton{
    float: left;
    height: 20px;
    width: 100px;
    background-color: white;
    color: red;
    cursor: pointer;
    border: 1px red solid;
  }
  .goodsListPageRecommendCommodityImg img{
    width: 150px;
    height: 140px;
  }
  .addCartMask{
    width:100%;
    height:120%;
    background-color:#000;
    position:fixed;
    top:0;
    left:0;
    z-index:2;
    opacity:0.9;
  }
  .addCartWindow{
    width: 400px;
    height: 200px;
    border: 2px red solid;
    background-color: white;
    margin-left: 35%;
    margin-top: 20%;
  }
  .backArrow{
    float: left;
    width: 25px;
    margin-left: 5%;
    margin-top: 3%;
    cursor: pointer;
  }
  .addFailTips{
    color: black;
    margin-top: 15%;
  }
  .addCartBtn{
    margin-top: 10%;
  }
  .addCartConfirmBtn{
    float: left;
    width: 80px;
    height: 30px;
    color: white;
    background-color: red;
    border: 1px red solid;
    margin-left: 20%;
    border-radius: 4px;
  }
  .sureToCartPage {
    width: 80px;
    height: 30px;
    color: red;
    background-color: white;
    border: 1px red solid;
    border-radius: 4px;
    font-weight: bold;
  }
</style>
