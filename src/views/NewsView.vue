<template>
  <banner-component
    :msg="msg"></banner-component>
  <section>
    <div class="container mb-5 pb-5">
      <div class="row mb-3">
        <div class="col-12 mb-3 d-flex flex-column align-items-center"
          v-for="item in filterNews" :key="item">
          <img :src="item.image" alt="" width="800" height="500">
          <h4 class="voucher">{{ item.description }}</h4>
        </div>
      </div>
      <div class="accordion accordion-flush mb-3" id="accordionFlushExample"
      ref="collapse">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            訂餐須知
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            使用本店線上訂餐系統時，請備註外送或自取。
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            外送須知
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            外送服務為區域限定，限台中市，跨縣市無法外送。
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            取餐須知
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            訂單送出後30分鐘，即可至現場訂單編號取餐。
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.voucher{
  padding: 15px 10px;
  background-color: #fa0;
  border:3px double #000;
}
.accordion-button{
  &:not(.collapsed){
    background-color: #fff;
    color: #000;
  }
  &:focus{
    border-color: #fa0;
    box-shadow: 0 0 0 0.25rem rgb(255 110 0 / 25%);
  }
  &.collapsed{
   background-color: #666;
   color: #fff;
 }
}
.accordion-collapse.collapse.show{
  transition: .5s;
  color: #fff;
  background-color: #fa0;
}
</style>

<script>
import BannerComponent from '../components/BannerComponent.vue'
import CollapseMixin from '@/mixins/CollapseMixin '

export default {
  data () {
    return {
      msg: {
        title: '優惠資訊'
      },
      news: [],
      discount: {},
      vouchers: {},
      cacheSearch: '優惠'
    }
  },
  components: {
    BannerComponent
  },
  mixins: [CollapseMixin],
  computed: {
    filterNews () {
      return this.news.filter(item => {
        return item.tag.match(this.cacheSearch)
      })
    }
  },
  methods: {
    getNews (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.articles)
          this.isLoading = false
          if (res.data.success) {
            this.news = res.data.articles
          }
        })
    }
  },
  created () {
    this.getNews()
  }
}
</script>
