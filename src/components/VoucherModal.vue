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
        <span>新增優惠券</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="mb-3">
          <label for="title" class="form-label">優惠券標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"
                    required
                    v-model="tempVoucher.title">
        </div>
        <hr>
        <div class="mb-3">
          <label for="percent" class="form-label">折扣%</label>
            <input type="number" class="form-control" id="percent"
                      placeholder="請輸入折扣%"
                      v-model="tempVoucher.percent">
        </div>
        <div class="mb-3">
          <label for="due_date" class="form-label">到期日</label>
            <input type="date" class="form-control" id="due_date"
                      placeholder="請輸入優惠券到期日"
                      v-model="this.due_date">
        </div>
        <div class="mb-3">
          <label for="code" class="form-label">優惠代碼</label>
            <input type="text" class="form-control" id="code"
                      placeholder="請輸入優惠券代碼"
                      required
                      v-model="tempVoucher.code">
        </div>
        <div class="mb-3">
          <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempVoucher.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click="hideModal">取消
      </button>
      <button type="button" class="btn btn-primary"
        @click.prevent="$emit('update-voucher',tempVoucher)">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    voucher: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    voucher () {
      this.tempVoucher = this.voucher
      if (!this.voucher.percent) {
        this.tempVoucher.percent = 100
      }
      if (!this.voucher.is_enabled) {
        this.tempVoucher.is_enabled = 0
      }
    },
    due_date () {
      const dueDate = this.due_date
      this.tempVoucher.due_date = Math.floor(new Date(dueDate).getTime() / 1000)
    }
  },
  data () {
    return {
      modal: {},
      tempVoucher: {},
      due_date: ''
    }
  },
  mixins: [modalMixin]
}
</script>
