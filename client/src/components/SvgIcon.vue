<!-- 封装icon图标 -->
<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ '--icon-fill': color }"  >
    <use :xlink:href="iconClassName" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    // default: 'rgb(11, 6, 7)'
     default: 'currentColor'
  }
});

// 图标在 iconfont 中的名字
const iconClassName = computed(()=>{
  return `#${props.iconName}`;
})
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>
<style scoped lang="scss">
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  vertical-align: -2px;
  & :deep(use) {
    fill: var(--icon-fill) !important;
  }
}
</style>
