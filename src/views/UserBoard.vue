<template>
  <navbar-component></navbar-component>
  <div class="container-fluid mt-5 pt-2 position-relative">
    <toast-message class="mt-5"></toast-message>
    <div class="container router-view">
      <router-view></router-view>
    </div>
  </div>
  <footer-component></footer-component>
</template>

<script>
import emitter from '@/methods/emitter.js'
import NavbarComponent from '../components/NavbarComponent.vue'
import ToastMessage from '../components/ToastMessages.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: {
    ToastMessage,
    NavbarComponent,
    FooterComponent
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
