<template>
  <div class="banner-small">
    <h2 class="banner-title">{{msg.title}}</h2>
  </div>
</template>
<style lang="scss">
.banner-small{
  margin-top: 0;
  position: relative;
  width: 100%;
  height: 50vh;
  background-color: #999;
  background-image: url("../img/banner/b-2.jpg");
  background-size: cover;
  overflow: hidden;
  .banner-title{
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    font-size: 120px;
    font-weight: 900;
  }
}
@media (max-width: 767.98px) {
  .banner-small {
    width: 100vw;
  }
}
</style>
<script>
export default {
  props: ['msg']
}
</script>
