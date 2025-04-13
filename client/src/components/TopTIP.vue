<template>
  <div class="Top" :style="{backgroundColor:color}">
    提示框
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color:string,
}>()

</script>

<style scoped lang="scss">
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}
.Top {
  @include flex-center(row);
  width: 12rem;
  height: 3rem;
  border-radius: variable.$sm;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: variable.$shadow;
}
</style>