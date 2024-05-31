import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { storeS } from './storeS'
import { Start } from '@/API.js'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

let apiServe = new Start();

apiServe.getToken().then(result => {
    if(result.success === true) {
        storeS.token = result.token
        if(location.hash) {
            location.hash = ''
        }
        createApp(App)
            .use(router)
            .use(ToastPlugin)
            .use(storeS)
            .mount('#app')
    } else {
        alert('Failed to get Token')
    }
})

