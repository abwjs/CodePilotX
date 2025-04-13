<template>
  <button class="menu-item" @click="action?.()" :class="{ 'is-active': isActive ? isActive() : null }" :title="title">
    <svg class="remix">
      <use :href="`${iconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg?url'

defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  action: {
    type: Function,
  },
  isActive: {
    type: Function,
    default: null
  }
})
const iconUrl = ref(remixiconUrl)
</script>

<style lang="scss">
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: .4rem;
  padding: .25rem;
  margin-right: .25rem;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }


  &:hover {
    background-color: variable.$bold-color;
  }

  &.is-active {
    color: variable.$primary-text-color;
    background-color: variable.$primary-color;
  }
}

// 代码块
code {
  display: block; 
  width: 100%;    
  white-space: pre-wrap; /* 允许内容换行 */
  background-color: variable.$bold-color;
  border-radius: variable.$sm;
  font-size: 0.85rem;
  padding: 1.5rem; /* 增加内边距 */
}
// 高亮块
mark {
  display: block; 
  width: 100%;    
  white-space: pre-wrap; /* 允许内容换行 */
  background-color: variable.$bold-color;
  border-radius: variable.$sm;
  box-decoration-break: clone;
  padding: 0.8rem;
}
 /* Heading styles */
 h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: pretty;
  }

 
  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }
</style>