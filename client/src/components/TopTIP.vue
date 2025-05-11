<template>
  <div class="Top" v-if="isFocus" :style="{backgroundColor:color}">
    <!-- <p>{{ msg }}</p> -->
     <p>111111111</p>
    <span class="close" @click="close">X</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  color:string,
  msg:string,
  isFocus:boolean
}>()
const close = ()=>{
  console.log(props);
  
}
</script>

<style scoped lang="scss">
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}
@keyframes move{
  from{
    transform: translate(-50%,-200px)
  }
  to {
    transform: translate(-50%)
  }
}
.Top {
  @include flex-center(row);
  animation:  move 1s;
  border-radius: variable.$sm;
  padding: 0.8rem 1rem;
  min-width: 12rem;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: variable.$shadow;
  .close {
    position: absolute;
    right: 0.5rem;
    top: 0.1rem;
  }
}
</style>