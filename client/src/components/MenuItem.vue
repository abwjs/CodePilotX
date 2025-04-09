<template>
  <div>
    <button class="menu-item" @click="action?.()" :class="{ 'is-active': isActive ? isActive() : null }" :title="title">
      <svg class="remix">
        <use :href="`${iconUrl}#ri-${icon}`" />
      </svg>
    </button>
  </div>
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

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: #fff;
    background-color: #0d0d0d;
  }
}
</style>