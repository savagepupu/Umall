<template>
  <div>
    <div class="marketBread">
      <button>Home</button>
      <slot name = "Goods"></slot>
      <slot name = "MyCart"></slot>
      <slot name = "Address"></slot>
      <slot name = "OrderConfirm"></slot>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .marketBread{
    width: 200px;
  }
  .marketBread button{
    font-size: 17px;
    border: none;
    cursor: pointer;
    color: green;
  }
</style>
