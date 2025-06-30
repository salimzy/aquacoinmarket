// import './assets/main.css'
import './assets/style.css'
import './assets/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';
import Alpine from 'alpinejs';


window.Alpine = Alpine
Alpine.start()
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');