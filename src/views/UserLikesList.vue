<template>
    <banner-component
    :msg="msg"></banner-component>
    <div class="likes-list mt-5">
      <div v-if="likes.length == 0" class="row my-3">
        <div  class="col-12 d-flex flex-column justify-content-center align-items-center border border-5 border-warning rounded"  style="height: 30vw;">
          <h3>
            目前沒有商品喔...
          </h3>
          <router-link class="btn btn-success" to="/user/product">來去逛逛</router-link>
        </div>
      </div>
      <div v-else class="row my-3">
        <div class="col-12 col-xl-4 col-md-6 col-sm-12 mb-4" v-for="item in likes" :key="item.id">
                  <div class="product-card">
                    <div class="products-img" :style="{backgroundImage:`url(${item.imageUrl})`}">
                      <div class="product-tag">{{ item.category }}</div>
                      <button  type="button" class="btn  rounded-pill product-likes" @click.prevent="updateLikesList(item.id)">
                        <i v-if="isInLikeList(item.id)" class="bi bi-heart-fill likes" ></i>
                        <i v-else class="bi bi-heart likes" ></i>
                      </button>
                    </div>
                    <div class="product-title ">{{ item.title }}</div>
                    <div class="product-price px-2">
                      <div class="h5" v-if="!item.price">{{ $filters.currency(item.origin_price) }} 元</div>
                      <del class="h6" v-if="item.price">{{ $filters.currency(item.origin_price) }} 元</del>
                      <div class="h5 text-end" v-if="item.price">{{ $filters.currency(item.price) }} 元</div>
                    </div>
                    <div class="btn-group btn-group-sm w-100">
                      <button type="button" class="btn btn-outline-secondary"
                        @click.prevent="getProduct(item.id)">查看更多</button>
                      <button type="button" class="btn btn-outline-success"
                        :disabled="this.status.loadingItem === item.id"
                        @click.prevent="addCart(item)">
                        <div class="spinner-border text-success spinner-grow-sm" role="status"
                          v-if="this.status.loadingItem === item.id">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        加入購物車
                        </button>
                    </div>
                  </div>
          </div>
      </div>
      <div v-if="isLoading" class="d-flex justify-content-center align-items-center flex-column loading-block">
        <strong>Loading...</strong>
        <div class="spinner-border text-center" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></div>
      </div>
    </div>
    <div class="container">
      <product-card></product-card>
    </div>
    <message-modal ref="messageModal"
  :msg="msgModal"></message-modal>
</template>

<style lang="scss">
.likes-list{
  position: relative;
  .product-card{
    background-color: #fff;
    position: relative;
    transition: .5s;
    box-shadow: 3px 1px 3px #666;
    &:hover{
      z-index: 2;
      transform: scale(1.05);
    }
    .products-img{
      background-size: cover;
      position: relative;
      height:200px;
      .product-tag{
        position: absolute;
        top: 0;
        left: 0;
        padding: 3px;
        background-color: #fa0;
        color:#fff;
        font-weight: 500;
        border-radius: 10px;
      }
      .product-likes{
        position: absolute;
        top: 0;
        right: 0;
        color:#fff;
        font-size: 1.5em;
      }
    }
    .product-title{
      color: #000;
      font-size: 22px;
      font-weight: 700;
    }
    .product-price{
      .h6{
        color:#666;
      }
      .h5{
        color:#f00;
        font-weight: 700;
      }
    }
  }
  .loading-block{
    position: absolute;
    top:0;
    background-color: #797979;
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
import emitter from '@/methods/emitter'
import { getLikesIdList, updateLikesList } from '@/methods/likesList'
import BannerComponent from '../components/BannerComponent.vue'
import ProductCard from '../components/ProductCard.vue'
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
      isLoading: false,
      status: {
        loadingItem: ''
      },
      products: [],
      likes: [],
      msg: {
        title: '我的最愛'
      },
      orderSearch: '',
      orderShow: false,
      order: {
        user: {}
      },
      msgModal: {
        title: '找不到訂單...',
        success: ''
      }
    }
  },
  components: {
    BannerComponent,
    ProductCard,
    MessageModal
  },
  methods: {
    getLikesIdList,
    updateLikesList,
    isInLikeList (id) {
      const likesIdList = this.getLikesIdList()
      return likesIdList.includes(id)
    },
    getLikes () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        console.log('items', res.data.products)
        const products = JSON.parse(JSON.stringify(res.data.products))
        const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
        const likes = []
        if (likesIdList.length > 0) {
          likesIdList.forEach(id => {
            console.log(id)
            products.forEach(item => {
              if (item.id === id) likes.push(item)
            })
          })
          this.likes = [...likes]
          this.isLoading = false
        }
      })
    },
    updateLikes (item) {
      this.isLoading = true
      const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
      if (likesIdList.includes(item.id)) {
        likesIdList.splice(likesIdList.indexOf(item.id), 1)
      } else {
        likesIdList.push(item.id)
      }
      localStorage.setItem('tacos-likesList', likesIdList)
      emitter.emit('updateLikes')
      this.getLikes()
    },
    addCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const messageComponent = this.$refs.messageModal
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.msgModal.product = item
        this.$httpMessageState(res, '加入購物車')
        this.msgModal.success = res.data.success
        this.msgModal.title = res.data.message
        emitter.emit('updateCart')
        this.status.loadingItem = ''
        messageComponent.showModal()
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    }
  },
  created () {
    this.getLikes()
    emitter.on('updateLikes', () => {
      this.getLikes()
    })
  }
}
</script>
