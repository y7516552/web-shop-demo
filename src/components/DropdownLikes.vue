<template>
<div class="btn-group dropdown cart-menu ms-auto me-2">
  <router-link  class="btn  rounded"
    :class="active?'btn-dark':''"
    to="/user/likes"
    >
    <i  v-if="likesLength == 0" class="bi bi-heart"></i>
    <template v-else>
      <i class="bi bi-heart-fill likes" ></i>
      <span class=" badge rounded-pill bg-danger">
        {{ likesLength }}
      </span>
    </template>
  </router-link>
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
import { getLikesIdList } from '@/methods/likesList'
export default {
  data () {
    return {
      dropdownBtn: false,
      likes: [],
      likesLength: 0
    }
  },
  props: {
    active: {
      type: Boolean,
      default () { return false }
    }
  },
  methods: {
    getLikesIdList,
    dropdown () {
      if (this.dropdownBtn) {
        this.dropdownBtn = false
      } else {
        this.dropdownBtn = true
      }
    },
    getLikes () {
      const likesIdList = this.getLikesIdList()
      this.likes = likesIdList
      this.likesLength = likesIdList.length
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
