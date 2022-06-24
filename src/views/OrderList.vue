<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="container pt-3">
    <table class="table mt-5 ">
      <thead>
          <tr>
            <th>訂單日期</th>
            <th>電子信箱</th>
            <th>訂單內容</th>
            <th>訂單金額</th>
            <th>是否付款</th>
            <th>備註</th>
            <th>操作</th>
          </tr>
      </thead>
      <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td>{{$filters.date(item.create_at)}}</td>
              <td>{{item.user.email}}</td>
              <td>
                  <ul v-for="product in item.products" :key="product">
                      <li>
                          {{product.product.title}}
                          {{product.qty}}
                          {{product.product.unit}}
                      </li>
                  </ul>
              </td>
              <td>{{$filters.currency(item.total)}}元</td>
              <td>
                <p v-if="item.is_paid" class="fs-5 text-success">已付款</p>
                <p v-else class="fs-5 text-danger">未付款</p>
              </td>
              <td>{{item.message}}</td>
              <td>
                  <div class="btn-group  d-flex align-items-center">
                    <button class="btn btn-primary"
                      @click.prevent="openModal(item)"
                      >詳細</button>
                    <button class="btn btn-danger"
                      @click.prevent="openModal(item,'delete')"
                      >刪除</button>
                  </div>
              </td>
            </tr>
      </tbody>
    </table>
  </div>
  <pagination-bar :pages="pagination"
    @emit-pages="getOrders"></pagination-bar>
  <order-modal ref="orderModal"
    :order="tempOrder"></order-modal>
  <del-modal ref="delModal"
    :item="tempOrder"
    @delete-order="deleteOrder"></del-modal>
</template>

<script>
import PaginationBar from '../components/PaginationBar.vue'
import OrderModal from '../components/OrderModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false
    }
  },
  components: {
    PaginationBar,
    OrderModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.orders)
          this.isLoading = false
          if (res.data.success) {
            this.orders = res.data.orders
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (item, modal) {
      this.tempOrder = { ...item }
      let orderComponent = this.$refs.orderModal
      if (modal === 'delete') {
        orderComponent = this.$refs.delModal
      }
      orderComponent.showModal()
    },
    deleteOrder (item) {
      this.tempOrder = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const orderComponent = this.$refs.delModal
      this.$http.delete(api)
        .then((res) => {
          this.$httpMessageState(res, '刪除訂單')
          orderComponent.hideModal()
          this.getOrders()
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
