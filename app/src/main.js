import '@/assets/styles/main.scss'
import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router/routers'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    apiKey: 'd6ed6ec1-ebd0-45b9-87c1-b721c41d4675', // Ваш индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: false, // Режим отладки
    version: '2.1' // Версия Я.Карт
}

const app = createApp(App)

app.use(YmapPlugin, settings)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
