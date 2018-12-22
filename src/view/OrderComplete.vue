<template>
  <div>
    <div class="orderComplete">
      <div class="orderCompleteTips">
        <p><img class="orderCompleteImg" src="../assets/勾.png"/>创建订单成功</p>
      </div>
      <p class="orderNumber">订单编号:103557466993</p>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{

          }
        }
    }
</script>

<style scoped>
  .orderComplete{
    position: absolute;
    width: 450px;
    height: 250px;
    border: 2px red solid;
    margin-top: 12%;
    margin-left: 30%;
  }
  .orderCompleteTips{
    width: 150px;
    margin-top: 20%;
    margin-left: 30%;
  }
  .orderCompleteImg{
    float: left;
    height: 25px;
  }
  .orderNumber{
    color: gray;
  }
</style>
