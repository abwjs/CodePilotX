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
@use "sass:color";
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: .4rem;
  padding: .25rem;
  margin-right: .25rem;
  margin-top: .5rem;
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
.ProseMirror {
  font-size: 16px;
  line-height: 1.6;
  color: #333;

  strong {
    font-weight: 600;
    color: color.adjust(#333, $lightness: -10%);
  }

  pre {
    background: #f8f8f8;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 1.25rem 1.5rem;
    margin: 1rem 0;
    overflow-x: auto;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #333;

    code {
      background: none !important;
      padding: 0 !important;
      font-size: inherit !important;
      color: inherit !important;
    }
  }

  // 行内代码样式
  code:not(pre code) {
    background: #f0f0f0;
    color: #d6336c;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: monospace;
    border: 1px solid #e0e0e0;
  }



  h1, h2, h3 {
    font-weight: 600;
    margin: 1rem 0 0.8rem;
    color: #1a1a1a;

    &::before {
      content: '# ';
      color: #999;
      margin-right: 0.3em;
    }
  }

  h1 { font-size: 1.8em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.3em; }
  blockquote {
    border-left: 4px solid #e0e0e0;
    margin: 1em 0;
    padding: 0.8em 1.2em;
    background: #f8f8f8;
    border-radius: 4px;
    color: #666;

    p:last-child {
      margin-bottom: 0;
    }
  }

  // 列表样式
  ul, ol {
    padding-left: 1.5em;
    margin: 0.8em 0;

    li {
      margin: 0.4em 0;
      &::marker {
        color: #999;
      }
    }
  }

  // 分割线
  hr {
  }

  img {
  }
}
</style>