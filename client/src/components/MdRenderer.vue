<template>
  <MdPreview noIconfont editorId="preview-only" :modelValue="source" class="klb-md" />
</template>
<script setup lang="ts">
import { config } from 'md-editor-v3'
import MdPreview from './MdPreview.vue'
import 'md-editor-v3/lib/style.css'
config({
  markdownItConfig(md) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      tokens[idx].attrSet('style', 'display:inline-block;min-height:33px;padding:0;margin:0')
      if (tokens[idx].content) {
        tokens[idx].attrSet('title', tokens[idx].content)
      }
      tokens[idx].attrSet(
        'onerror',
        'this.src="/ui/assets/load_error.png";this.onerror=null;this.height="33px"',
      )
      return md.renderer.renderToken(tokens, idx, options)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      tokens[idx].attrSet('target', '_blank')
      return md.renderer.renderToken(tokens, idx, options)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.appendChild
  },
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  source: String,
})
</script>
<style lang="scss" scoped>
.problem-button {
  width: 100%;
  border: none;
  border-radius: 8px;
  background: var(--app-layout-bg-color);
  height: 46px;
  padding: 0 12px;
  line-height: 46px;
  box-sizing: border-box;
  color: var(--el-text-color-regular);
  word-break: break-all;

  &:hover {
    background: var(--el-color-primary-light-9);
  }

  &.disabled {
    &:hover {
      background: var(--app-layout-bg-color);
    }
  }

  :deep(.el-icon) {
    color: var(--el-color-primary);
  }
}
</style>
