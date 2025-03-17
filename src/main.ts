import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'



const app = createApp(App)
app.use(pinia) //使用 Pinia
app.use(router)

import '@/styles/index.scss'

app.mount('#app')
