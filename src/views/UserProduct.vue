<template>
  <div class="container mt-3 px-3">
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">首頁</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/user/product">美味精選</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
    </ol>
    </nav>
    <div class="container mb-5">
      <div class="card mb-3 border-0">
        <div class="row g-0">
          <div class="col-md-6">
            <img :src="product.imageUrl" class="product-image" alt="..." >
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div class="card-body">
              <h5 class="card-title h3">{{product.title}}</h5>
              <span class="product-tag">{{product.category}}</span>
              <p class="card-text">{{product.content}}</p>
              <div class="col-12 mb-3">
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價{{ product.origin_price }} 元</del>
                <div class="h4" v-if="product.price">特價 <span class="fs-4 text-danger">{{ product.price }}元</span></div>
              </div>
              <hr>
              <div class="btn-group btn-group-sm mb-3">
                <button type="button" class="btn btn-secondary"
                    @click.prevent="this.likeProduct=true">
                    <i v-if="!this.likeProduct" class="bi bi-suit-heart"></i>
                    <i v-else class="bi bi-suit-heart-fill"></i>
                </button>
              </div>
              <div class="input-group mb-3">
                <input type="number" class="form-control" v-model="qty">
                <span class="input-group-text">{{ product.unit }}</span>
              </div>
              <div class="mb-3 d-flex justify-content-end">
                <button
                  @click.prevent="addCart(product.id)"
                  :disabled="this.status.loadingItem === product.id"
                  class="btn btn-outline-danger" type="button">
                    <div class="spinner-border text-danger spinner-grow-sm" role="status"
                      v-if="this.status.loadingItem === product.id">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <product-card></product-card>
  </div>
  <message-modal ref="messageModal"
  :msg="msg"></message-modal>
</template>

<style lang="scss">
.product-image{
  padding: 10px;
  width: 100%;
}
.card-body{
  border: 5px dashed #fa0;
  border-radius: 20px;
  .product-tag{
    background-color: #fa0;
    border-radius: 15px;
    font-size: 24px;
    padding: 5px;
  }
}
</style>

<script>
import ProductCard from '../components/ProductCard.vue'
import emitter from '@/methods/emitter'
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
      product: {
        imagesUrl: []
      },
      likeProduct: false,
      qty: 1,
      status: {
        loadingItem: ''
      },
      msg: {
        title: '加入購物車',
        product: {},
        success: '',
        qty: ''
      }
    }
  },
  components: {
    ProductCard,
    MessageModal
  },
  methods: {
    getProduct (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.product = res.data.product
        this.msg.product = res.data.product
        this.isLoading = false
      })
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const messageComponent = this.$refs.messageModal
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: this.qty
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res)
        this.msg.success = res.data.success
        this.msg.title = res.data.message
        this.msg.qty = this.qty
        if (res.data.success) {
          emitter.emit('updateCart')
          this.status.loadingItem = ''
          messageComponent.showModal()
        }
      })
    }
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    this.getProduct(this.$route.params.productId)
  }
}
</script>
