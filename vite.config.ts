import { fileURLToPath, URL } from 'node:url'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcssNesting from 'postcss-nesting'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), VueSetupExtend(),

  ],
  css: {
    postcss: {
     plugins: [postcssNesting(),],

    },
    preprocessorOptions: {
      scss: {
        // 可以在这里添加全局 SCSS 变量等
        additionalData: `@use "@/styles/variable.scss";`
      },
    },

  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
