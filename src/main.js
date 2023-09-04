import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import handleAxios from './utils/handleAxios'
import axios from 'axios'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
handleAxios()

app.use(pinia)
app.use(router)
app.mount('#app')
