<template>
  <div class="product-banner">
    <h2 class="banner-title">{{msgProduct.title1}}</h2>
  </div>
  <div class="row mt-3">
    <div class="col-12 col-md-3">
      <div class="sticky-top mt-5 pt-5">
        <div class="d-flex flex-column align-items-center justify-content-center">
        <button class="btn tag-btn" @click.prevent="this.cacheSearch = ''">全部商品</button>
        <button class="btn tag-btn" @click.prevent="changeTag('taco')">Taco</button>
        <button class="btn tag-btn" @click.prevent="changeTag('quesadilla')">Quesadilla</button>
        <button class="btn tag-btn" @click.prevent="changeTag('nachos')">Nachos</button>
        <button class="btn tag-btn" @click.prevent="changeTag('Pizza')">Pizza</button>
        <button class="btn tag-btn" @click.prevent="changeTag('沙拉')">沙拉</button>
        <button class="btn tag-btn" @click.prevent="changeTag('炸物')">炸物</button>
        <button class="btn tag-btn" @click.prevent="changeTag('主餐')">主餐</button>
        <button class="btn tag-btn" @click.prevent="changeTag('飲料')">飲料</button>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-9">
      <loading-component :active="isLoading"></loading-component>
      <div class="row mt-5">
              <div class="row filter-product" v-if="cacheSearch">
                <div class="col-6 col-md-4 mb-4" v-for="item in filterProduct" :key="item.id">
                  <div class="product-card">
                    <div class="product-img" :style="{backgroundImage:`url(${item.imageUrl})`}">
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
                      <button type="button" class="btn btn-outline-danger"
                        :disabled="this.status.loadingItem === item.id"
                        @click.prevent="addCart(item.id)">
                        <div class="spinner-border text-danger spinner-grow-sm" role="status"
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
                    <div class="product-img" :style="{backgroundImage:`url(${item.imageUrl})`}">
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
                      <button type="button" class="btn btn-outline-danger"
                        :disabled="this.status.loadingItem === item.id"
                        @click.prevent="addCart(item.id)">
                        <div class="spinner-border text-danger spinner-grow-sm" role="status"
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
</template>

<style lang="scss">
.product-banner{
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
.filter-product{
  min-height: 80vh;
}
.product-card{
  background-color: #fff;
  position: relative;
  transition: .5s;
  &:hover{
    z-index: 2;
    transform: scale(1.1);
  }
  .product-img{
    background-position: center;
    position: relative;
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
.tag-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 30px;
  width: 120px;
  background-color: #000;
  color: #fff;
  border-radius: 15px;
  font-weight: 700;
  transition: .5s;
  &:hover{
    background-color: #fa0;
    color: #000;
  }
}
</style>

<script>
import emitter from '@/methods/emitter'
import PaginationBar from '../components/PaginationBar.vue'

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
      msgProduct: {
        title1: '精選美味',
        title2: '美墨快餐車',
        content: '美味、方便、快速',
        link: '趕快上車',
        router: 'product'
      }
    }
  },
  components: {
    PaginationBar
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
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        this.$httpMessageState(res, '加入購物車')
        emitter.emit('updateCart')
        this.status.loadingItem = ''
        this.getCart()
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
