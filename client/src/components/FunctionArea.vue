<template>
  <div class="FunctionArea">

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: center;
}

.FunctionArea {
  @include flex-center(row);
  width: 100%;
  
}
</style>