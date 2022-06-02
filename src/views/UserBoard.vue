<template>
  <navbar-component></navbar-component>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">購物車</router-link>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <toast-message class="mt-5"></toast-message>
    <router-view></router-view>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
import NavbarComponent from '../components/NavbarComponent.vue'
import ToastMessage from '../components/ToastMessages.vue'

export default {
  components: {
    ToastMessage,
    NavbarComponent
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
