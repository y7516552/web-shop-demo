<template>
  <navbar-component :isLogin="isLogin"></navbar-component>
  <div class="container-fluid mt-5 px-5">
    <toast-message class="mt-5"></toast-message>
    <router-view></router-view>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
import ToastMessage from '../components/ToastMessages.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
export default {
  components: {
    NavbarComponent,
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then((res) => {
        if (res.data.success) {
          this.isLogin = true
        } else {
          this.$router.push('/login')
        }
      })
  }
}
</script>
