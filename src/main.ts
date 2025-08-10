import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import App from './App.vue'
import './index.css'

const app = createApp(App)
app.use(ToastPlugin)
app.use(createPinia())

app.mount('#app')
