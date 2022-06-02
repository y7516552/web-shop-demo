<template>
  <section class="banner">
    <div class="img-carousel">
      <ul class="img-carousel-list">
        <li></li>
      </ul>
      <div class="title">
        <h2>Choo Choo Tacos 塔可餅車車</h2>
        <h3>美墨速食餐車</h3>
        <h4>美味、方便、快速</h4>
        <button class="btn btn-success">趕快上車</button>
      </div>
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
        background-image: url("../img/banner/banner-1.jpg");
        background-position: 20% 80%;
        background-repeat: no-repeat;
        background-size: 150% auto;
        opacity: 1;
        filter: blur(1px) opacity(.7);
      }
      li.animate{
        animation-name: carouselAnimate;
        animation-timing-function: linear;
      }
      @keyframes carouselAnimate {
        0%{
          opacity: 0;
          background-size: 150% auto;
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
          background-size: 120% auto;
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
  }
}
</style>
<script>

</script>
