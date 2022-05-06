<template>
  <div class="row">
  <div class="col-12 col-md-7">
    <loading-component :active="isLoading"></loading-component>
  <div class="container">
    <div class="row mt-4 px-2">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
            </td>
            <td>
              <a href="#" class="text-dark">{{ item.title }}</a>
            </td>
            <td>
              <div class="h5" v-if="!item.price">{{ $filters.currency(item.origin_price) }} 元</div>
              <del class="h6" v-if="item.price">原價{{ $filters.currency(item.origin_price) }} 元</del>
              <div class="h5" v-if="item.price">現在特價 {{ $filters.currency(item.price) }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <pagination-bar :pages="pagination"
    @emit-pages="getProducts"></pagination-bar>
  </div>
  <div class="col-12 col-md-5">
    cart
    <template v-if="cart.carts">
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>名稱</th>
          <th style="width:120px">數量</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click.prevent="deleteCart(item.id)">
              <i class="bi bi-x"></i>
            </button>
            </td>
            <td>
              {{item.product.title}}
              <div v-if="item.coupon.code" class="text-success">
                已套用優惠券 {{item.coupon.title}}
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control" v-model="item.qty"
                  min="1"
                  :disabled="item.id === status.loadingItem"
                  @change="updateCart(item)">
                <div class="input-group-text">/ {{ item.product.unit }}</div>
              </div>
            </td>
            <td><small v-if="item.coupon.code" class="text-success">折扣價：</small>{{ $filters.currency(item.final_total) }}</td>
          </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ $filters.currency(cart.total) }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
        </tr>
      </tfoot>
    </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼"
          v-model="voucherCode">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click.prevent="addVoucherCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </template>
  </div>
  </div>
</template>

<script>
import PaginationBar from '../components/PaginationBar.vue'
export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      isLoading: false,
      pagination: {},
      cart: {},
      voucherCode: ''
    }
  },
  components: {
    PaginationBar
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
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.cart = res.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.isLoading = true
      this.status.loadingItem = item.id
      this.$http.put(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.getCart()
        this.status.loadingItem = ''
      })
    },
    deleteCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.getCart()
      })
    },
    addVoucherCode () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const voucherCode = {
        code: this.voucherCode
      }
      this.isLoading = true
      this.$http.post(api, { data: voucherCode }).then((res) => {
        console.log(res)
        this.$httpMessageState(res, '使用優惠券')
        this.isLoading = false
        this.getCart()
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
