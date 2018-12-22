<template>
  <div>
    <div class="GlobalModalFrame" v-if="mdShow">
      <div class="GlobalModalFrameWindow" v-bind:class="{'md-show':mdShow}">
        <img class="backArrow" @click="mdShow===false" src="../assets/后退箭头.png"/>
        <div class="msgSlot">
          <slot name="message"></slot>
        </div>
        <div class="btnSlot">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props:["mdShow"],
        data(){
          return{

          }
        }
    }
</script>

<style scoped>
  .GlobalModalFrame{
    width:100%;
    height:106.5%;
    background-color:#000;
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    opacity:0.8;
  }
  .GlobalModalFrameWindow{
    width: 400px;
    height: 200px;
    border: 2px red solid;
    background-color: white;
    margin-left: 35%;
    margin-top: 12%;
  }
</style>
