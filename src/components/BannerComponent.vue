<template>
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
        <button class="btn btn-success" @click.prevent="getRoter(msg.router)">{{ msg.link }}</button>
      </div>
      <i class="bi bi-arrow-down-short"></i>
    </div>
  </section>
</template>
<style lang="scss">
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
</style>
<script>
export default {
  props: ['msg'],
  methods: {
    getRoter (router) {
      this.$router.push(`/user/${router}`)
    }
  }
}
</script>
