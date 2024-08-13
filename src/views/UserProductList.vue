<template>
  <banner-component
    :msg="msg"></banner-component>
  <div class="row mt-3">
    <div class="col-12 col-md-3">
      <div class="side-bar mt-5">
        <div class="d-flex flex-column align-items-center justify-content-center">
        <button class="btn tag-btn" @click.prevent="changeTag('')"
          :class="{'active':cacheSearch == ''}">全部商品</button>
        <button class="btn tag-btn" @click.prevent="changeTag('taco')"
          :class="{'active':cacheSearch == 'taco'}">Taco</button>
        <button class="btn tag-btn" @click.prevent="changeTag('quesadilla')"
          :class="{'active':cacheSearch == 'quesadilla'}">Quesadilla</button>
        <button class="btn tag-btn" @click.prevent="changeTag('nachos')"
        :class="{'active':cacheSearch == 'nachos'}">Nachos</button>
        <button class="btn tag-btn" @click.prevent="changeTag('pizza')"
          :class="{'active':cacheSearch == 'pizza'}">Pizza</button>
        <button class="btn tag-btn" @click.prevent="changeTag('沙拉')"
          :class="{'active':cacheSearch == '沙拉'}">沙拉</button>
        <button class="btn tag-btn" @click.prevent="changeTag('炸物')"
          :class="{'active':cacheSearch == '炸物'}">炸物</button>
        <button class="btn tag-btn" @click.prevent="changeTag('主餐')"
          :class="{'active':cacheSearch == '主餐'}">主餐</button>
        <button class="btn tag-btn" @click.prevent="changeTag('飲料')"
          :class="{'active':cacheSearch == '飲料'}">飲料</button>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-9">
      <loading-component :active="isLoading"></loading-component>
      <div class="row mt-5">
        <div class="row filter-product" v-if="cacheSearch">
          <div class="col-6 col-md-4 mb-4" v-for="item in filterProduct" :key="item.id">
            <div class="product-card">
              <div class="product-img" :style="{backgroundImage:`url(${item.imageUrl})`}" style="height: 200px;">
                <div class="product-tag">{{ item.category }}</div>
              </div>
              <div class="product-title ">{{ item.title }}</div>
              <div class="product-price">
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
        <div class="row" v-else>
          <div class="col-6 col-md-4 mb-4" v-for="item in products" :key="item.id">
                  <div class="product-card">
                    <div class="products-img" :style="{backgroundImage:`url(${item.imageUrl})`}">
                      <div class="product-tag">{{ item.category }}</div>
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
      </div>
    </div>
    <div class="col-12" v-if="!cacheSearch">
      <pagination-bar :pages="pagination"
        @emit-pages="getProducts"></pagination-bar>
    </div>
  </div>
  <message-modal ref="messageModal"
  :msg="msgModal"></message-modal>
</template>

<style lang="scss">
.filter-product{
  min-height: 80vh;
  .product-card{
    .product-img{
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
    }
  }
}
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
.side-bar{
  position: sticky;
  top: 60px;
}
.tag-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 45px;
  width: 200px;
  background-color: #000;
  color: #fff;
  border-radius: 15px;
  font-weight: 700;
  transition: .5s;
  &:hover{
    background-color: #fa0;
    color: #000;
    transition: .5s;
  }
  &.active{
    background-color: #fff;
    color: #000;
    border:1px solid #000;
    transition: .5s;
  }
}
</style>

<script>
import BannerComponent from '../components/BannerComponent.vue'
import emitter from '@/methods/emitter'
import PaginationBar from '../components/PaginationBar.vue'
import MessageModal from '../components/MessageModal.vue'

export default {
  data () {
    return {
      allProducts: [],
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      isLoading: false,
      pagination: {},
      cacheSearch: '',
      msg: {
        title: '精選美味'
      },
      msgModal: {
        title: '加入購物車',
        product: {},
        success: '',
        qty: 1
      }
    }
  },
  components: {
    BannerComponent,
    PaginationBar,
    MessageModal
  },
  provide () {
    return {
      emitter
    }
  },
  computed: {
    filterProduct () {
      return this.allProducts.filter(item => {
        return item.category.match(this.cacheSearch)
      })
    }
  },
  methods: {
    getAllProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.allProducts = res.data.products
        this.isLoading = false
      })
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
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
      this.$http.post(api, { data: cart }).then((res) => {
        this.msgModal.product = item
        this.$httpMessageState(res, '加入購物車')
        this.msgModal.success = res.data.success
        this.msgModal.title = res.data.message
        emitter.emit('updateCart')
        this.status.loadingItem = ''
        this.getCart()
        messageComponent.showModal()
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.cart = res.data.data
        this.isLoading = false
        this.cartShow = false
        if (res.data.data.carts.length > 0) {
          this.cartShow = true
        }
      })
    },
    changeTag (tag) {
      this.cacheSearch = tag
    }
  },
  created () {
    this.getAllProducts()
    this.getProducts()
  }
}
</script>
