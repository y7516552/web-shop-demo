<template>
  <h3 class="section-title">美味推薦</h3>
  <div class="row py-5">
    <div v-for="item in tempProducts" :key="item.id" class="col-6 col-md-4 col-lg-3">
      <div class="card rounded-3 text-white mt-3">
        <div class="product-img rounded-3" :style="{ backgroundImage:`url( ${item.imageUrl} )`}"></div>
        <div  class="card-img-overlay">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-truncate">{{ item.description }}</p>
          <div class="d-flex justify-content-between align-items-center mb-1">
            <button  type="button" class="btn btn-light rounded-pill" @click.prevent="updateLikesList(item.id)">
              <i v-if="isInLikeList(item.id)" class="bi bi-heart-fill likes" ></i>
              <i v-else class="bi bi-heart likes" ></i>
            </button>
            <p class="card-text text-end">$ {{ $filters.currency(item.price) }}</p>
          </div>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-warning"
              @click.prevent="getProduct(item.id)">
                詳細
            </button>
            <button type="button" class="btn btn-success"
              :disabled="this.status.loadingItem === item.id"
                  @click.prevent="addCart(item)">
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
  <message-modal ref="messageModal"
  :msg="msg"></message-modal>
</template>
<style lang="scss">
.row{
  .card{
    box-shadow: 3px 3px 8px 0px #999;
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
      .likes{
        color:(var(--bs-pink));
      }
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
    background-color: #fa0;
    color: #fff;
  }
}
}
</style>
<script>
import emitter from '@/methods/emitter'
import { getLikesIdList, updateLikesList } from '@/methods/likesList'
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
      products: [],
      tempProducts: [],
      likeProduct: false,
      status: {
        loadingItem: ''
      },
      msg: {
        title: '加入購物車',
        product: {},
        success: '',
        qty: 1
      }
    }
  },
  components: {
    MessageModal
  },
  methods: {
    getLikesIdList,
    updateLikesList,
    isInLikeList (id) {
      const likesIdList = this.getLikesIdList()
      return likesIdList.includes(id)
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      const productList = []
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        for (let i = 0; i <= 3; i++) {
          productList.push(this.products[i])
        }
        this.tempProducts = productList
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const messageComponent = this.$refs.messageModal
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.id,
        qty: 1
      }
      this.msg.product = item
      this.$http.post(api, { data: cart }).then((res) => {
        this.msg.success = res.data.success
        this.msg.title = res.data.message
        this.msg.qty = 1
        if (res.data.success) {
          emitter.emit('updateCart')
          this.status.loadingItem = ''
          messageComponent.showModal()
        }
      })
    }
  },
  created () {
    this.getProducts()
    emitter.on('updateLikes', () => {
      this.getProducts()
    })
  }
}
</script>
