<!--此文件用于显式网站头部-->
<template>
  <div>
    <div class="marketHeader">
      <div class="marketHeaderTitle">
        <span>UMALL</span>
      </div>
      <div class="marketHeaderFuncList">
        <p class="loginNickName" v-if="nickName">{{nickName}}</p>
        <button class="marketHeaderLoginButton" v-if="!nickName" @click="login">Login</button>
        <button class="marketHeaderLoginOutButton" v-if="nickName" @click="logout">Logout</button>
        <!--购物车图案-->
        <img class="shoppingCarIcon" src=".././assets/gwc.png" @click="toCartPage"/>
        <p class="shoppingCartCount" v-if="count>0">{{count}}</p>
        <!--登录遮罩层-->
        <div class="loginMask" v-show="loginMaskState">
          <div class="loginWindow">
            <img class="backArrow" @click="closeMask" src="../assets/后退箭头.png"/>
            <p class="loginWindowTitle">LOGIN</p>
            <input class="loginUserName" placeholder="请输入用户名" v-model="userName"/>
            <input class="loginUserPwd" placeholder="请输入密码" v-model="userPwd"/>
            <div class="loginButtonCase">
              <button class="loginButton" :disabled="!userName || !userPwd" @click="loginTo">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.checkLogin()
      this.getCartCount()
    },
    data(){
      return{
        loginMaskState:false,
        userName:'',
        userPwd:'',
        nickName:''
      }
    },
    computed:{
      count(){
        return this.$store.state.cartCount
      }
    },
    methods:{
      //检查当前用户是否登录
      checkLogin(){
        this.$axios.get('/users/checkLogin').then(
          (response)=>{
            let res = response.data
            if(res.status === '0'){
              //如果userId存在 那么后台会把用户自动登录
              this.nickName = res.result
            }
          }
        )
      },
      //点击登录按钮打开登录窗口(遮罩层)
      login(){
        this.loginMaskState = true
      },
      //关闭遮罩层
      closeMask(){
        this.loginMaskState = false
      },
      // 登录
      loginTo(){
        this.$axios.post('/users/login',{
          userName:this.userName,
          userPwd:this.userPwd
        }).then(
          (response)=>{
            let res = response.data
            if(res.status === '0'){
              console.log('登录成功')
              this.userName = ''
              this.userPwd = ''
              this.loginMaskState = false
              this.nickName = res.result.userName
              this.getCartCount()
            }else {
              console.log('登录失败')
            }
          }
        ).catch((err)=>{
          console.log(err.message)
        })
      },
      //登出
      logout(){
        this.$axios.post('/users/logout').then(
          (response)=>{
            let res = response.data
            if(res.status === '0'){
              this.nickName = ''
              this.$store.commit('updateCartCount','')
            }
          }).catch(
          (err)=>{
            console.log(err.message)
          })
      },
      toCartPage(){
        this.$router.push('/cart')
      },
      //获取购物车数量
      getCartCount(){
        this.$axios.get('/users/getCartCount').then(
          (response)=>{
            let res = response.data
            console.log(res.result)
            this.$store.commit('updateCartCount',res.result)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .marketHeader{
    width: 100%;
    height: 80px;
    line-height: 20px;
    border: 1px darkcyan solid;
    background-color: red;
    color:white;
  }
  .marketHeaderTitle{
    float: left;
    padding-left: 100px;
    padding-top: 30px;
    font-size: 30px;
  }
  .marketHeaderFuncList{
    float: right;
    width: 300px;
    /*padding-top: 25px;*/
  }
  .loginNickName{
    width: 50px;
    float: left;
    margin-top: 10%;
    cursor: pointer;
  }
  .marketHeaderLoginButton{
    float: left;
    width: 80px;
    height: 20px;
    border: none;
    color: red;
    margin-top: 10%;
    font-size: 10px;
    font-style: initial;
    cursor: pointer;
    border-radius: 5px;
  }
  .marketHeaderLoginOutButton{
    float: left;
    width: 80px;
    height: 20px;
    border: none;
    color: red;
    margin-top: 10%;
    font-size: 10px;
    font-style: initial;
    cursor: pointer;
    border-radius: 5px;
  }
  .shoppingCarIcon{
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 10%;
    margin-left: 5%;
    cursor: pointer;
  }
  .shoppingCartCount{
    float: left;
    font-size: 14px;
  }
  .loginMask{
    width:100%;
    height:120%;
    background-color:#000;
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    opacity:0.8;
  }
  .loginWindow{
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
  .loginWindowTitle{
    color: red;
    font-size: 20px;
    margin-right: 5%;
  }
  .loginUserName{
    width: 200px;
    height: 25px;
    border-radius: 3px;
  }
  .loginUserPwd{
    width: 200px;
    height: 25px;
    border-radius: 3px;
    margin-top: 4%;
  }
  .loginButtonCase{
    margin-top: 4%
  }
  .loginButton{
    width: 100px;
    height: 25px;
    background-color: red;
    color: white;
  }
</style>
