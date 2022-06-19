<template>
  車車故事
   <section class="my-5 " id="ingerdients">
    <ingerdients-section></ingerdients-section>
  </section>
</template>

<style lang="scss">
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
      background-image: url(../img/about/a-1.jpg);
      background-size: cover;
    }
  }
</style>

<script>
import IngerdientsSection from '../components/IngerdientsSection.vue'

export default {
  components: {
    IngerdientsSection
  }
}
</script>
