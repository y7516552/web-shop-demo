<template>
  <div v-if="isLoading" class="loading">Loading...</div>
  <navbar-component></navbar-component>
  <banner-component
    :msg="msgHome"></banner-component>
  <section class="my-5" id="product-card">
    <div class="container">
      <product-card></product-card>
    </div>
  </section>
  <section class="my-5 py-5" id="news">
    <div class="container">
      <news-section></news-section>
    </div>
  </section>
  <section class="my-5 py-5" id="location">
    <div class="container">
      <location-section></location-section>
    </div>
  </section>
  <footer-component></footer-component>
</template>

<style lang="scss">
html{
  overflow-x: hidden;
  scroll-behavior: smooth;
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
  #news{
    min-height: 70vh;
    background-color: #999;
    background-image: url("../img/news/i-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  #location{
    color: #fff;
  }
}
</style>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import BannerComponent from '../components/BannerComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProductCard from '../components/ProductCard.vue'
import LocationSection from '../components/LocationSection'
import NewsSection from '../components/NewsSection.vue'
// @ is an alias to /src
export default {
  data () {
    return {
      isLogin: false,
      isLoading: true,
      msgHome: {
        title1: 'Choo Choo Tacos 塔可餅車車',
        title2: '美墨快餐車',
        content: '美味、方便、快速',
        link: '趕快上車',
        router: 'product'
      }
    }
  },
  components: {
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    ProductCard,
    LocationSection,
    NewsSection
  },
  mounted () {
    this.isLoading = false
  }
}
</script>
