<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="text-end mt-5">
    <button class="btn btn-primary mt-5" type="button" @click.prevent="openModal(true)">新增優惠券</button>
  </div>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠名稱</th>
          <th>折扣</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in vouchers" :key="item.id">
              <td>{{item.title}}</td>
              <td>{{item.percent}} %</td>
              <td>{{$filters.date(item.due_date)}}</td>
              <td>
                  <span class="text-success" v-if="item.is_enabled"><strong>啟用</strong></span>
                  <span class="text-muted" v-else><strong>未啟用</strong></span>
              </td>
              <td>
                  <div class="btn-group  d-flex align-items-center">
                    <button class="btn btn-primary"
                      @click.prevent="openModal(false, item)">編輯</button>
                    <button class="btn btn-danger"
                      @click.prevent="openModal(false, item,'delete')">刪除</button>
                  </div>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
  <pagination-bar :pages="pagination"
    @emit-pages="getVouchers"></pagination-bar>
    <voucher-modal ref="voucherModal"
      :voucher="tempVoucher"
      @update-voucher="updateVoucher"></voucher-modal>
    <del-modal ref="delModal"
      :item="tempVoucher"
      @delete-voucher="deleteVoucher"></del-modal>
</template>

<script>
import PaginationBar from '../components/PaginationBar.vue'
import VoucherModal from '../components/VoucherModal.vue'
import DelModal from '../components/DelModal.vue'

export default {
  data () {
    return {
      vouchers: [],
      tempVoucher: {},
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    PaginationBar,
    VoucherModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getVouchers (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.coupons)
          this.isLoading = false
          if (res.data.success) {
            this.vouchers = res.data.coupons
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (isNew, item, modal) {
      if (isNew) {
        this.tempVoucher = {}
      } else {
        this.tempVoucher = { ...item }
      }
      let voucherComponent = this.$refs.voucherModal
      if (modal === 'delete') {
        voucherComponent = this.$refs.delModal
      }
      voucherComponent.showModal()
      this.isNew = isNew
    },
    updateVoucher (item) {
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 判斷是否為編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      const voucherComponent = this.$refs.voucherModal
      this.$http[httpMethod](api, { data: this.tempVoucher })
        .then((res) => {
          this.getVouchers()
          this.$httpMessageState(res, '更新優惠券')
          voucherComponent.hideModal()
        })
    },
    deleteVoucher (item) {
      this.tempVoucher = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      const VoucherComponent = this.$refs.delModal
      this.$http.delete(api)
        .then((res) => {
          this.$httpMessageState(res, '刪除優惠券')
          VoucherComponent.hideModal()
          this.getVouchers()
        })
    }
  },
  created () {
    this.getVouchers()
  }
}
</script>
