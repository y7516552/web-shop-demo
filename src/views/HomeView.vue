<template>
  <div v-if="isLoading" class="loading">Loading...</div>
  <navbar-component></navbar-component>
  <banner-component></banner-component>
  <section class="my-5" id="product-card">
    <div class="container">
      <product-card></product-card>
    </div>
  </section>
  <section class="my-5 " id="ingerdients">
    <ingerdients-section></ingerdients-section>
  </section>
  <section class="my-5" id="article">
    <div class="container">
      <h3>最新消息</h3>
      <div class="row"></div>
    </div>
  </section>
  <section class="my-5 py-5" id="location">
    <div class="container">
      <h3>發車資訊</h3>
      <div class="row"></div>
    </div>
  </section>
  <footer-component></footer-component>
</template>

<style lang="scss">
html{
  overflow-x: hidden;
  .loading{
    position: fixed;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  #ingerdients{
    position: relative;
    color: #fff;
    background-image: linear-gradient(150deg, rgba(255, 255, 255, 0.733) 50%, transparent 50%);
    &::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url(../img/about/alora-1.jpg);
      background-size: cover;
    }
  }
  #location{
    height: 135vh;
    background-image: url(../img/about/car.jpg);
    background-repeat: no-repeat;
    background-position: 50 0;
    background-size: 100%;
    opacity: .6;
    color: #fff;
  }
}
</style>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import BannerComponent from '../components/BannerComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProductCard from '../components/ProductCard.vue'
import IngerdientsSection from '../components/IngerdientsSection.vue'
// @ is an alias to /src
export default {
  data () {
    return {
      isLogin: false,
      isLoading: true
    }
  },
  components: {
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    ProductCard,
    IngerdientsSection
  },
  mounted () {
    this.isLoading = false
  }
}
</script>
