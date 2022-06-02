<template>
  <!-- Default dropstart button -->
<div class="btn-group dropdown cart-menu">
  <button type="button" class="btn  btn-secondary rounded"
    @click.prevent="dropdown">
      <i  class="bi bi-basket3"></i>
      <span v-if="cartLength > 0" class=" badge rounded-pill bg-danger">
        {{ cartLength }}
      </span>
  </button>
  <ul class="dropdown-menu mt-5 me-5 cart-list" :class="{'show':  dropdownBtn }">
    <template v-if="!cartShow">
      <li class="dropdown-item d-flex justify-content-center">
        目前購物車是空的喔!
      </li>
    </template>
    <template v-else>
      <li class="dropdown-item d-flex justify-content-center border-bottom">購物車</li>
      <li v-for="item in cart.carts" :key="item.id">
        <div class="dropdown-item d-flex justify-content-between">
          <button class="btn btn-outline-danger" type="button" @click.prevent="deleteCart(item.id)">X</button>
          <router-link to="">{{ item.product.title }}</router-link>
          <div class="input-group w-50">
            <input class="form-control" min="1" type="number" v-model="item.qty" @change="updateCart(item)">
            <div class="input-group-text">/ {{ item.product.unit }}</div>
          </div>
        </div>
      </li>
      <li class="dropdown-item d-flex justify-content-center">
        <router-link class="btn btn-info" to="">前往結帳</router-link>
      </li>
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
        // if (res.data.data.carts.length > 0) {
        //   this.cartShow = true
        // }
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
