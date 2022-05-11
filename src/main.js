import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filters'
import 'bootstrap-icons/font/bootstrap-icons.css'
import $httpMessageState from './methods/pushMessageState'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'
import store from './store'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

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
app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
