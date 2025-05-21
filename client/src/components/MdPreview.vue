<template>
  <MdPreview noIconfont noPrettier :codeFoldable="false" v-bind="$attrs" />
</template>

<script setup lang="ts">
import 'md-editor-v3/lib/style.css'
import { MdPreview } from 'md-editor-v3'
</script>
