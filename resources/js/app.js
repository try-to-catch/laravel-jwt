import './bootstrap';
import {createApp} from 'vue';
import router from "./router";


const app = createApp({});

import App from './App.vue'
app.component('app', App);

app.use(router)
    .mount('#app');
