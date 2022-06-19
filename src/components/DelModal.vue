<template>
  <div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal"
  >
  <div class="modal-dialog modal-sm" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-danger text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span v-if="item.author">刪除文章 {{ item.title }} </span>
        <span v-else-if="item.code">刪除優惠券 {{ item.title }} </span>
        <span v-else-if="item.category">刪除產品 {{ item.title }} </span>
        <span v-else>刪除訂單 {{ item.id }} </span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <span v-if="item.author">是否要刪除文章<strong class="text-danger">{{ item.title }}</strong>?</span>
      <span v-else-if="item.code">是否要刪除優惠券<strong class="text-danger">{{ item.title }}</strong>?</span>
      <span v-else-if="item.category">是否要刪除產品<strong class="text-danger">{{ item.title }}</strong>?</span>
      <span v-else>是否要刪除訂單<strong class="text-danger">{{ item.title }}</strong>?</span>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click.prevent="hideModal">取消
      </button>
      <button type="button" class="btn btn-primary"
        v-if="item.author"
        @click.prevent="$emit('delete-article', tempArticle)">確認</button>
      <button type="button" class="btn btn-primary"
        v-else-if="item.code"
        @click.prevent="$emit('delete-voucher', tempVoucher)">確認</button>
      <button type="button" class="btn btn-primary"
        v-else-if="item.category"
        @click.prevent="$emit('delete-product', tempProduct)">確認</button>
      <button type="button" class="btn btn-primary"
        v-else
        @click.prevent="$emit('delete-order', tempOrder)">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    item () {
      if (this.item.author) {
        this.tempArticle = this.item
      } else if (this.item.code) {
        this.tempVoucher = this.item
      } else if (this.item.category) {
        this.tempProduct = this.item
      } else {
        this.tempOrder = this.item
      }
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {},
      tempOrder: {},
      tempVoucher: {},
      tempArticle: {}
    }
  },
  mixins: [modalMixin]
}
</script>
