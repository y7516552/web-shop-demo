import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filters'
import 'bootstrap-icons/font/bootstrap-icons.css'
import $httpMessageState from './methods/pushMessageState'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency,
  date
}
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.component('LoadingComponent', Loading)
app.mount('#app')
