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
        {{tempOrder.id}}
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          用戶資料
          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <input type="text" class="form-control" id="name"
                    required
                    v-model="tempOrder.user.name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email"
                    required
                    v-model="tempOrder.user.email">
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">電話</label>
            <input type="text" class="form-control" id="phone"
                    required
                    v-model="tempOrder.user.tel">
          </div>
          <div class="mt-5">
            <label for="address" class="form-label">地址</label>
            <input type="text" class="form-control" id="address"
                    required
                    v-model="tempOrder.user.address">
          </div>
        </div>
        <div class="col-sm-8">
          訂單細節
          <div class="row gx-2" v-for="item in tempOrder.products" :key="item">
            <div class="mb-3 d-flex justify-content-between">
              {{item.product.title }}
              <div class="border">{{ item.qty }} / {{ item.product.unit }}</div>
              {{ $filters.currency(item.product.price) }} 元
            </div>
          <hr>
          </div>
          總金額
          <div class="mb-3">
            {{$filters.currency(tempOrder.total)}} 元
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
    order () {
      this.tempOrder = this.order
    }
  },
  data () {
    return {
      modal: {},
      tempOrder: {
        user: {
          name: ''
        },
        products: {}
      },
      products: []
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
