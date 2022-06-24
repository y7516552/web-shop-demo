<template>
  <banner-component
    :msg="msg"></banner-component>
    <section id="story">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-md-6">
            <h3 class="story-title">開車的原因</h3>
            <div class="d-flex align-items-center h-75">
              <p>來台灣交換學生的老闆，有一天非常想念墨西哥阿嬤做的塔可，但是到處都找不到道地的塔可，為了將故鄉塔可的好味道分享給台灣好朋友，老闆拿出自己的畢生積蓄打造塔可餅車車!!</p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="story-img"></div>
          </div>
        </div>
      </div>
    </section>
   <section class="my-5 " id="ingerdients">
    <ingerdients-section></ingerdients-section>
  </section>
</template>

<style lang="scss">

#story{
  .story-title{
    font-weight: 900;
    font-size: 30px;
  }
  .story-img{
    height: 360px;
    width: 100%;
    background-image: url("../img/about/i-11.jpg");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
#ingerdients{
    position: relative;
  }
</style>

<script>
import BannerComponent from '../components/BannerComponent.vue'
import IngerdientsSection from '../components/IngerdientsSection.vue'

export default {
  data () {
    return {
      msg: {
        title: '車車故事'
      }
    }
  },
  components: {
    BannerComponent,
    IngerdientsSection
  }
}
</script>
