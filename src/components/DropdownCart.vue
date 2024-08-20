<template>
<div class="btn-group dropdown cart-menu me-2">
  <button type="button" class="btn rounded"
    :class="active?'btn-dark':''"
    @click.prevent="dropdown">
      <i class="bi bi-cart-fill"></i>
      <span v-if="cartLength > 0" class=" badge rounded-pill bg-danger">
        {{ cartLength }}
      </span>
  </button>
  <ul class="dropdown-menu mt-5 me-5 cart-list py-0"  :class="{'show':  dropdownBtn }">
    <template v-if="!cartShow">
      <li class="dropdown-item d-flex justify-content-center">
        目前購物車是空的喔!
      </li>
    </template>
    <template v-else>
      <li class="dropdown-item d-flex justify-content-center border-bottom bg-warning text-white">
        <i class="bi bi-cart-fill me-2"></i>
        購物車
        </li>
      <li v-for="item in cart.carts" :key="item.id">
        <div class="dropdown-item d-flex justify-content-between align-items-center">
          <button class="btn btn-outline-danger" type="button" @click.prevent="deleteCart(item.id)">X</button>
          <p class="fs-7 m-0">{{ item.product.title }}</p>
          <div class="input-group w-50">
            <input class="form-control" min="1" type="number" v-model="item.qty" @change="updateCart(item)">
            <div class="input-group-text">/ {{ item.product.unit }}</div>
          </div>
        </div>
      </li>
      <hr>
      <li class="dropdown-item d-flex justify-content-between">
        <p>小計</p>
        <p>{{$filters.currency(cart.total)}}</p>
        <p>元</p>
      </li>
      <router-link class="btn w-100 mt-2" :class="active?'btn-dark':'btn-light'" to="/user/cart" @click.prevent="dropdown">前往結帳</router-link>
    </template>
  </ul>
</div>
</template>

<style lang="scss">
  .cart-menu{
    position: relative;
    .cart-list{
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(25%);
      width: 400px;
    }
  }
</style>

<script>
import emitter from '@/methods/emitter'
export default {
  data () {
    return {
      dropdownBtn: false,
      cart: {},
      cartShow: false,
      cartLength: 0
    }
  },
  watch: {
    cartLength () {
      this.cartShow = false
      if (this.cartLength > 0) {
        this.cartShow = true
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default () { return false }
    }
  },
  methods: {
    dropdown () {
      if (this.dropdownBtn) {
        this.dropdownBtn = false
      } else {
        this.dropdownBtn = true
      }
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.cart = res.data.data
        this.cartLength = res.data.data.carts.length
        this.$emit('emit-cartlength', this.cartLength)
        this.isLoading = false
        this.cartShow = false
        if (res.data.data.carts.length > 0) {
          this.cartShow = true
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.isLoading = true
      this.$http.put(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.getCart()
      })
    },
    deleteCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.getCart()
      })
    }
  },
  created () {
    this.getCart()
    emitter.on('updateCart', () => {
      this.getCart()
    })
  }
}
</script>
