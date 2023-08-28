import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import handleAxios from './utils/handleAxios'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000/api'
handleAxios()

app.use(router)
app.mount('#app')
