<template>
  <div class="MydocumentBox">
    <NavIgation></NavIgation>
    <ul>
      <li>创建的文档</li>
      <li>协同的文档</li>
      <li></li>
    </ul>
</div>
</template>

<script setup lang="ts">
import NavIgation from '../components/NavIgation.vue';
</script>

<style scoped>
.MydocumentBox {
  border-bottom: 1.5px solid rgb(238, 238, 240);
}
</style>