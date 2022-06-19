<template>
  <h3>美味推薦</h3>
  <div class="row py-5">
    <div v-for="item in tempProducts" :key="item.id" class="col-6 col-md-4 col-lg-3">
      <div class="card rounded-3 text-white mt-3">
        <div class="product-img rounded-3" :style="{ backgroundImage:`url( ${item.imageUrl} )`}"></div>
        <div  class="card-img-overlay">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-truncate">{{ item.description }}</p>
          <p class="card-text text-end">$ {{ $filters.currency(item.price) }}</p>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-warning"
              @click.prevent="getProduct(item.id)">
                詳細
            </button>
            <button type="button" class="btn btn-success"
              :disabled="this.status.loadingItem === item.id"
                  @click.prevent="addCart(item.id)">
              <div class="spinner-border text-danger spinner-grow-sm" role="status"
                v-if="this.status.loadingItem === item.id">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i class="bi bi-cart-plus"></i>
              </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-end mt-5">
      <router-link class="btn-more" to="/user/product">更多選擇?</router-link>
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
    background-color: rgba(102, 102, 102, 0.699);
    transition: .5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover{
      opacity: 1;
    }
    .card-title{
      font-weight: 900;
    }
  }
  .btn-more{
  border-radius: 15px;
  background-color: rgb(255, 219, 148);
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  &:hover{
    background-color: #000;
    color: #fff;
  }
}
}
</style>
<script>
import emitter from '@/methods/emitter'
export default {
  data () {
    return {
      products: [],
      tempProducts: [],
      likeProduct: false,
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data.products)
        this.products = res.data.products
        for (let i = 0; i <= 3; i++) {
          this.tempProducts.push(this.products[i])
        }
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res)
        emitter.emit('updateCart')
        this.status.loadingItem = ''
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
