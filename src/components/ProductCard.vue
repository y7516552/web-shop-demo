<template>
  <h2>新品上市</h2>
  <div class="row py-5">
    <div v-for="item in products" :key="item.id" class="col-6 col-md-4 col-lg-3">
      <div class="card  text-white mt-3">
        <div class="product-img" :style="{ backgroundImage:`url( ${item.imageUrl} )`}"></div>
        <div  class="card-img-overlay">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text">$ {{ $filters.currency(item.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.row{
  .product-img{
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .card-img-overlay{
    opacity: 0;
    background-color: #fa0;
    transition: .5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover{
      opacity: 1;
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data.products)
        this.products = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
