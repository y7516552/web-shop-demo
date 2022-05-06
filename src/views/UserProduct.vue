<template>
  <div class="container px-3">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
    </ol>
  </nav>
  <div class="container">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-8">
          <img :src="product.imageUrl" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">{{product.content}}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <hr>
            <div class="col-12">
              <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價{{ product.origin_price }} 元</del>
              <div class="h5" v-if="product.price">現在特價 <span class="fs-4 text-danger">{{ product.price }}元</span></div>
            </div>
            <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-secondary"
                  @click.prevent="this.likeProduct=true">
                  <i v-if="!this.likeProduct" class="bi bi-suit-heart"></i>
                  <i v-else class="bi bi-suit-heart-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">加入購物車</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      likeProduct: false
    }
  },
  methods: {
    getProduct (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.product = res.data.product
        this.isLoading = false
      })
    }
  },
  created () {
    this.getProduct(this.$route.params.productId)
  }
}
</script>
