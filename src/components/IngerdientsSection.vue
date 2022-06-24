<template>
  <div class="container">
      <h3 class="section-title">食材選用</h3>
      <div class="row py-5">
        <div class="col-12 col-md-6 col-lg-8  px-0">
          <div class="ingerdient-img" id="img-1"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-4  px-0">
          <div class="ingerdient-text right">
            <h3 class="text-center">優質肉品</h3>
            <p class="text-center">
              本店使用肉品來源為，台灣國產溫體豬肉，大成安心雞、澳洲進口優質牛肩肉。
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4  px-0">
          <div class="ingerdient-text left">
            <h3 class="text-center">道地風味</h3>
            <p class="text-center">
              本店使用店長自己栽種的11種墨西哥辣椒，當天現場製作秘製辣醬，絕不含化學添加劑。
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-8  px-0">
          <div class="ingerdient-img" id="img-2"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-8  px-0">
          <div class="ingerdient-img " id="img-3"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-4  px-0">
          <div class="ingerdient-text right">
            <h3 class="text-center">當地小農</h3>
            <p class="text-center">
              與當地小農合作，有機蔬果農場直送，無農藥無化學肥料，健康又安心。
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4  px-0">
          <div class="ingerdient-text left">
            <h3 class="text-center">堅守品質</h3>
            <p class="text-center">
              傳承自老闆墨西哥阿嬤的堅持，客人就像家人，永遠給家人吃最棒的!
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-8  px-0">
          <div class="ingerdient-img" id="img-4"></div>
        </div>
      </div>
    </div>
</template>
<style lang="scss">
.ingerdient-img{
  padding: 0;
  margin-bottom: 80px;
  background-color: #333;
  height: 360px;
  &#img-1{
    background-image: url("../img/about/i-1.jpg");
    background-size: cover;
  }
  &#img-2{
    background-image: url("../img/about/i-2.jpg");
    background-size: cover;
  }
  &#img-3{
    background-image: url("../img/about/i-3.jpg");
    background-position: 0 50%;
    background-size: cover;
  }
  &#img-4{
    background-image: url("../img/about/i-4.jpg");
    background-size: cover;
  }
}
.ingerdient-text{
  background-color: rgb(153, 153, 153);
  padding: 30px;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  &.right{
    margin: -50px 0 0 -50px;
  }
  &.left{
    margin: 50px -50px 0 0;
    position: relative;
    z-index: 2;
  }
}
</style>
