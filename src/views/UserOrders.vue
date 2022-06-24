<template>
    <banner-component
    :msg="msg"></banner-component>
    <div class="row my-3">
    <div class="input-group mb-3">
      <input
        v-model="orderSearch"
        type="text" class="form-control" placeholder="請輸入訂單編號" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button
        @click.prevent="getOrder()"
        class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="bi bi-search"></i>搜尋</button>
    </div>
      <div class="col-12">
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

        <table class="table" v-if="orderShow">
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
            </tbody>
        </table>
      </div>
    </div>
    <message-modal ref="messageModal"
  :msg="msgModal"></message-modal>
</template>

<script>
import BannerComponent from '../components/BannerComponent.vue'
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
      msg: {
        title: '訂單查詢'
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
    MessageModal
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderSearch}`
      this.isLoading = true
      const messageComponent = this.$refs.messageModal
      this.$http.get(api).then((res) => {
        if (res.data.order == null) {
          this.msgModal.success = false
          this.orderShow = false
        }
        if (res.data.order) {
          this.msgModal.success = res.data.success
          this.order = res.data.order
          this.isLoading = false
          this.msgModal.title = '查詢成功!!'
          this.orderShow = true
        }
        messageComponent.showModal()
      })
    }
  }
}
</script>
