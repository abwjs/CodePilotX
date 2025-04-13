<!-- CopyButton.vue -->
<template>

  <div type="primary" size="small" @click="copyToClipboard"  :title="`复制${label}`"> </div>
</template>

<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '文本',
  },
})

const copyToClipboard = () => {
  if (props.text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(props.text)
        .then(() => {
          console.log('复制成功');
          
        })
        .catch((err) => {
          console.log(err);
          
        })
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = props.text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)

    }
  } else {
    console.log('失败');
    
  }
}
</script>
