<template>
  <navbar-component></navbar-component>
  <section class="banner">
    <div class="img-carousel">
      <ul class="img-carousel-list">
        <li class="bg-1 animate"></li>
        <li class="bg-2 animate"></li>
      </ul>
      <div class="title mb-1">
        <h2>{{ msg.title1 }}</h2>
        <h3>{{ msg.title2 }}</h3>
        <h4>{{ msg.content }}</h4>
        <router-link class="btn btn-success" to="/user/product">{{ msg.btn }}</router-link>
      </div>
      <i class="bi bi-arrow-down-short"></i>
    </div>
  </section>
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
<div class="loading" :class="{ 'none': !isLoading}">
  <div class="loading-icon"></div>
  <p class="fs-1">Loading...</p>
</div>
</template>

<style lang="scss">
html{
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 3s;
    color: #fff;
    animation: fadeOutAni 3s 1 linear ;
    .loading-icon{
      background-image: url('../img/taco.svg');
      background-repeat: no-repeat;
      background-size: cover;
      width: 80px;
      height: 80px;
      animation:  shakeAni  .1s linear infinite;
      &::before{
        content: "";
        position: absolute;
        bottom: 0;
        left: -5px;
        background-color: #333;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: 60px 0px 0px 0px  #333;
      }
      &::after{
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        background-color: #999;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 60px 0px 0px 0px  #999;
      }
      @keyframes shakeAni {
        0%{
          transform: translateY(0);
        }
        50%{
          transform: translateY(5px);
        }
        100%{
          transform: translateY(0);
        }
      }
    }
    &.none{
      display: none;
    }
     @keyframes fadeOutAni {
        0%{
          opacity: 1;
        }
        50%{
          opacity: 0.5;
        }
        100%{
          opacity: 0;
          z-index: -10;
          display: none;
        }
      }
  }
  .banner{
    .img-carousel{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    &.scroll{
      .img-carousel-list{
        width: 1200px;
        height: 300px;
      }
    }
    .img-carousel-list{
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: .5s;
      list-style-type: none;
      padding: 0;
      li{
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 150% auto;
        opacity: 1;
        filter: blur(1px) opacity(.7);
      }
      li.bg-1{
        background-position: 20% 80%;
        background-image: url("../img/banner/b-1.jpg");
      }
      li.bg-2{
        background-position: 50% 50%;
        background-image: url("../img/banner/b-2.jpg");
        animation-delay: 9s;
      }
      li.animate{
        animation-name: carouselAnimate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 18s;
      }
      @keyframes carouselAnimate {
        0%{
          opacity: 0;
          background-size: 130% auto;
        }
        25%{
          opacity: 1;
        }
        50%{
          opacity: 1;
        }
        75%{
          opacity: 0;
        }
        100%{
          opacity: 0;
          background-size: 100% auto;
        }
      }
    }
    .title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(51, 51, 51, 0.63);
      color: #fff;
      border-radius: 10px;
      font-size: 30px;
      padding: 15px;
    }
    .bi.bi-arrow-down-short{
      position: absolute;
      left: 50%;
      bottom: 0px;
      color: #fff;
      font-size: 80px;
      font-weight: 900;
      animation: arrowDown 2s linear infinite;
      &::before{
        transform: translateX(-50%);
      }
    }
    @keyframes arrowDown {
      0%{
        transform: translateY(-10px);
        opacity: 0;
      }
      50%{
        transform: translateY(0px);
        opacity: 0.7;
      }
      75%{
        transform: translateY(10px);
        opacity: 1;
      }
      100%{
        transform: translateY(10px);
        opacity: 1;
      }
    }
    }
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
  .section-title{
    color: #000;
    font-weight: 900;
    font-size: 40px;
    &:hover{
      color: #fa0;
    }
  }
}
</style>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
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
      msg: {
        title1: 'Choo Choo Tacos 塔可餅車車',
        title2: '美墨快餐車',
        content: '美味、方便、快速',
        btn: '趕快上車'
      }
    }
  },
  components: {
    NavbarComponent,
    FooterComponent,
    ProductCard,
    LocationSection,
    NewsSection
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>
