<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="my-5 row justify-content-center">
    <div v-if="!order.is_paid" class="d-flex justify-content-between">
      <p class="fs-4">確認訂單</p>
      <p class="fs-4">填寫資料</p>
      <p class="fs-2 fw-bold">付款</p>
      <p class="fs-4 text-muted">完成</p>
    </div>
    <div v-else class="d-flex justify-content-between">
      <p class="fs-4">確認訂單</p>
      <p class="fs-4">填寫資料</p>
      <p class="fs-4">付款</p>
      <p class="fs-2 fw-bold">完成</p>
    </div>
    <div v-if="!order.is_paid" class="progress">
      <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div v-else class="progress">
      <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  <div class="row my-5">
    <form @submit.prevent="payOrder" class="col-12">
      <table class="table align-middle">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        </thead>
        <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }} / {{ item.product.unit }}</td>
          <td class="text-end">{{ $filters.currency(item.product.price) }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-end">總計</td>
          <td class="text-end">{{ order.total }}</td>
        </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="order.is_paid" class="text-success">付款完成 {{$filters.date(order.paid_date)}} </span>
            <span v-else>尚未付款</span>
          </td>
        </tr>
        <tr v-if="order.is_paid">
          <th>訂單編號</th>
          <td class="d-flex align-items-center">
            <p ref="orderId" class="fs-7 mb-0">{{ order.id }}</p>
            <button class="btn btn-outline-dark ms-5" type="button" @click.prevent="copyId()"><i class="bi bi-clipboard"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="text-end">
        <button v-if="!order.is_paid" class="btn btn-danger">確認付款去</button>
        <router-link v-else class="btn btn-primary" to="/user/product">繼續購物</router-link>
      </div>
    </form>
  </div>
  </div>
  <message-modal ref="messageModal"
  :msg="msg"></message-modal>
</template>

<script>
import emitter from '@/methods/emitter'
import MessageModal from '../components/MessageModal.vue'

export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      },
      isLoading: false,
      msg: {
        title: '',
        success: ''
      }
    }
  },
  components: {
    MessageModal
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data.order)
        if (res.data.success) {
          this.order = res.data.order
          this.isLoading = false
        }
      })
    },
    payOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(api).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.getOrder()
          this.$httpMessageState(res, '付款')
          emitter.emit('updateCart')
        }
      })
    },
    copyId () {
      const orderId = this.$refs.orderId
      const messageComponent = this.$refs.messageModal
      console.log(orderId.textContent)
      navigator.clipboard.writeText(orderId.textContent)
        .then(() => {
          this.msg.success = true
          this.msg.title = '訂單編號複製成功'
          messageComponent.showModal()
        })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
