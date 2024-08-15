<template>
<div class="btn-group dropdown cart-menu ms-auto me-2">
  <router-link  class="btn  rounded"
    :class="active?'btn-dark':''"
    to="/user/likes"
    >
      <i class="bi bi-heart"></i>
      <span v-if="likesLength > 0" class=" badge rounded-pill bg-danger">
        {{ likesLength }}
      </span>
  </router-link>
  <ul class="dropdown-menu mt-5 me-5 cart-list py-0"  :class="{'show':  dropdownBtn }">
    <template v-if="!likesShow">
      <li class="dropdown-item d-flex justify-content-center">
        目前購物車是空的喔!
      </li>
    </template>
    <template v-else>
      <li class="dropdown-item d-flex justify-content-center border-bottom bg-warning text-white">
        <i class="bi bi-heart me-2"></i>
        購物車
        </li>
      <li v-for="item in likes" :key="item.id">
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
        <p>{{$filters.currency(likes.total)}}</p>
        <p>元</p>
      </li>
      <router-link class="btn btn-dark w-100 mt-2" to="/user/cart" @click.prevent="dropdown">前往結帳</router-link>
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
      likes: [],
      likesShow: false,
      likesLength: 0
    }
  },
  props: {
    active: {
      type: Boolean,
      default () { return false }
    }
  },
  watch: {
    likesLength () {
      this.likesShow = false
      if (this.likesLength > 0) {
        this.likesShow = true
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
    getLikes () {
      const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
      const likes = []
      if (likesIdList.length > 0) {
        likesIdList.forEach(id => {
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
          this.$http.get(api).then((res) => {
            likes.push(res.data.product)
          })
        })
      }
      this.likes = likes
      this.likesLength = likes.length
    },
    updateLikes (item) {
      const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
      if (likesIdList.includes(item.id)) {
        likesIdList.splice(likesIdList.indexOf(item.id), 1)
      } else {
        likesIdList.push(item.id)
      }
      localStorage.setItem('tacos-likesList', likesIdList)
      this.getLikes()
    },
    deleteLikes (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.getLikes()
      })
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
