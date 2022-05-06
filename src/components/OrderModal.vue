<template>
  <div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal"
  >
  <div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>訂單詳細</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          用戶資料
          <div class="mb-3">
            姓名
          </div>
          <div class="mb-3">
              Email
          </div>
          <div class="mb-3">
              電話
          </div>
          <div class="mt-5">
            地址
          </div>
        </div>
        <div class="col-sm-8">
          訂單細節
          <div class="mb-3">
          </div>
          <div class="row gx-2">
          </div>
          <hr>
          選購商品
          <div class="mb-3">
          </div>
          <div class="mb-3">
          </div>
          <div class="mb-3">
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click.prevent="hideModal">取消
      </button>
      <button type="button" class="btn btn-primary"
        @click.prevent="hideModal">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    order: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    product () {
      this.tempOrder = this.order
    }
  },
  data () {
    return {
      modal: {},
      tempOrder: {}
    }
  },
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mixins: [modalMixin]
}
</script>
