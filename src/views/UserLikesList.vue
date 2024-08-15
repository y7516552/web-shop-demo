<template>
    <banner-component
    :msg="msg"></banner-component>
    <div class="likes-list">
      <div class="row my-3">
       <div class="col-12">
          目前沒有商品
       </div>
      </div>
    </div>
    <div class="container">
      <product-card></product-card>
    </div>
    <message-modal ref="messageModal"
  :msg="msgModal"></message-modal>
</template>

<script>
import emitter from '@/methods/emitter'
import BannerComponent from '../components/BannerComponent.vue'
import ProductCard from '../components/ProductCard.vue'
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
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
    getLikes () {
      console.log('tacos-likesList', JSON.parse(localStorage.getItem('tacos-likesList')))
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
      emitter.emit('updateLikes')
      this.getLikes()
    }
  },
  created () {
    this.getLikes()
  }
}
</script>
