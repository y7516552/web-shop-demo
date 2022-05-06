<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="text-end mt-5">
    <button class="btn btn-primary mt-5" type="button" @click.prevent="openModal(true)">新增產品</button>
  </div>
  <div class="container">
    <table class="table mt-4 ">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th width="120">圖片</th>
        <th width="200">商品名稱</th>
        <th width="80">原價</th>
        <th width="80">售價</th>
        <th width="80">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td >{{ item.category }}</td>
        <td ><img v-if="item.imageUrl" :src="item.imageUrl" height="100"> </td>
        <td >{{ item.title }}</td>
        <td >{{ $filters.currency(item.origin_price) }}</td>
        <td >{{ $filters.currency(item.price) }}</td>
        <td >
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
    @emit-pages="getProducts"></pagination-bar>
  <product-modal ref="productModal"
  :product="tempProduct"
  @update-product="updateProduct"></product-modal>
  <del-modal ref="delModal"
  :item="tempProduct"
  @delete-product="deleteProduct"></del-modal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
import DelModal from '../components/DelModal.vue'
import PaginationBar from '../components/PaginationBar.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    PaginationBar
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.products)
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (isNew, item, modal) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      let productComponent = this.$refs.productModal
      if (modal === 'delete') {
        productComponent = this.$refs.delModal
      }
      productComponent.showModal()
      this.isNew = isNew
    },
    updateProduct (item) {
      this.tempProduct = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 判斷是否為編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.getProducts()
          this.$httpMessageState(res, '更新產品')
          productComponent.hideModal()
        })
    },
    deleteProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      const productComponent = this.$refs.delModal
      this.$http.delete(api)
        .then((res) => {
          this.$httpMessageState(res, '刪除產品')
          productComponent.hideModal()
          this.getProducts()
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
