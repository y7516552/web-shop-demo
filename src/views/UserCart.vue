<template>
  <loading-component :active="isLoading"></loading-component>
  <div v-if="cartShow">
    <div class="d-flex justify-content-between">
      <p  :class="{'fs-4': cartConfirm , 'fs-2':!cartConfirm,'fw-bold':!cartConfirm}">確認訂單</p>
      <p  :class="{'fs-4': !cartConfirm ,'text-muted': !cartConfirm , 'fs-2':cartConfirm,'fw-bold':cartConfirm}">填寫資料</p>
      <p class="fs-4 text-muted">付款</p>
      <p class="fs-4 text-muted">完成</p>
    </div>
    <div v-if="!cartConfirm" class="progress">
      <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div v-else class="progress">
      <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
  <div class="row mt-5">
    <div v-if="!cartShow" class="col-12">
      <div  class="cart-clear-veiw">
        <div class="logo-icon"></div>
        <p class="fs-1">目前購物車內是空的喔...</p>
        <p class="fs-6 text-black-50">好可惜喔，這樣沒辦法開車耶。</p>
        <button class="btn btn-dark"
        @click.passive="pushToProduct()">重新上車</button>
      </div>
    </div>
    <div v-else class="col-12 col-md-5" >
      <button v-if="!cartConfirm" type="button" class="btn btn-danger"
        @click.prevent="deleteAllCart">清空購物車</button>
      <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>名稱</th>
              <th style="width:120px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button v-if="!cartConfirm" type="button" class="btn btn-outline-danger btn-sm"
                    @click.prevent="deleteCart(item.id)">
                  <i class="bi bi-x"></i>
                </button>
                </td>
                <td>
                  {{item.product.title}}
                  <div v-if="item.coupon" class="text-success">
                    已套用優惠券 {{item.coupon.title}}
                  </div>
                </td>
                <td>
                  <div v-if="!cartConfirm" class="input-group input-group-sm">
                    <input type="number" class="form-control" v-model="item.qty"
                      min="1"
                      :disabled="item.id === status.loadingItem"
                      @change="updateCart(item)">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                  <div v-else class="d-flex">
                    {{item.qty}} / {{ item.product.unit }}
                  </div>
                </td>
                <td><small v-if="item.coupon" class="text-success">折扣價：</small>{{ $filters.currency(item.final_total) }} 元</td>
              </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }} 元</td>
            </tr>
            <tr v-if="cart.total > cart.final_total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
      </table>
      <div v-if="!cartConfirm" class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼"
            v-model="voucherCode">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click.prevent="addVoucherCode">
              套用優惠碼
            </button>
          </div>
      </div>
      <div v-if="!cartConfirm" class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary"
          @click.prevent="cartConfirm = true">下一步</button>
      </div>
    </div>
  <div v-if="cartShow" class="col-12 col-md-7">
    <div v-if="cartConfirm" class="container p-3">
      <vee-form v-slot="{ errors, validate } " @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <vee-field type="email" class="form-control" id="email" placeholder="請輸入Email" name="email" required
            rules="email|required"
            :class="{ 'is-invalid': errors['email'] }"
            v-model="form.user.email"></vee-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <vee-field type="text" class="form-control" id="name" placeholder="請輸入姓名" name="name" required
            rules="required"
            :class="{ 'is-invalid': errors['name'] }"
            v-model="form.user.name"></vee-field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <vee-field type="text" class="form-control" id="tel" placeholder="請輸入電話" name="tel" required
            :rules="isPhone"
            :class="{ 'is-invalid': errors['tel'] }"
            v-model="form.user.tel"></vee-field>
          <error-message name="tel" class="invalid-feedback"></error-message>
        </div>
        <div class=" mb-3">
          <label for="pickup" class="form-label">自取或外送</label>
          <button class="btn btn-primary form-control mb-1" type="button" name="pickUp"
            @click.prevent="pickUp = true" :checked="pickUp">自取</button>
          <button class="btn btn-primary form-control mb-1" type="button" name="pickUp"
            :class="{'active' : !pickUp}"
            @click.prevent="pickUp = false" :checked="!pickUp">外送</button>
        </div>
        <div class="mb-3"
          v-if="!pickUp">
          <label for="address" class="form-label">收件人地址</label>
          <vee-field type="text" class="form-control" id="address" placeholder="請輸入收件地址" name="address" required
            :rules="addressValidate"
            :class="{ 'is-invalid': errors['address'] }"
            :disabled="pickUp"
            v-model="form.user.address"></vee-field>
          <error-message name="address" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <vee-field class="form-control" id="message" rows="3" name="message"
            v-model="form.message"></vee-field>
        </div>
        <div class="mb-3 d-flex justify-content-between ">
          <button class="btn btn-primary"
          @click.prevent="cartConfirm = false">上一步</button>
          <button type="submit" class="btn btn-primary ms-auto" @click="validate">送出訂單</button>
        </div>
      </vee-form>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
.cart-clear-veiw{
  position: relative;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo-icon{
    position: relative;
    background-image: url('../img/taco.svg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 80px;
    height: 80px;
    animation:  iconAni 3s 2.5s 1 linear;
    &::before{
      content: "";
      position: absolute;
      bottom: 0;
      left: -5px;
      background-color: #333;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 60px 0px 0px 0px  #333;
    }
    &::after{
      content: "";
      position: absolute;
      bottom: 5px;
      left: 0;
      background-color: #999;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: 60px 0px 0px 0px  #999;
    }
    @keyframes iconAni {
      0%{
        opacity: 0;
        transform: translate(100px,0);
      }
      25%{
        opacity: 0.5;
        transform: translate(75px,0);
      }
      50%{
        opacity: 1;
        transform: translate(50px,0);
      }
      75%{
        opacity: 1;
        transform: translate(25px,0);
      }
      100%{
        opacity: 1;
        transform: translate(0,0);
      }
    }
  }
}
</style>

<script>
import emitter from '@/methods/emitter'
export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      isLoading: false,
      pagination: {},
      cart: {},
      cartShow: false,
      cartConfirm: false,
      voucherCode: '',
      pickUp: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '台中市'
        },
        message: ''
      }
    }
  },
  provide () {
    return {
      emitter
    }
  },
  watch: {
    pickUp () {
      if (this.pickUp) {
        this.form.user.address = '塔可餅車車自取'
      } else if (!this.pickUp) {
        this.form.user.address = ''
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(api, { data: cart }).then((res) => {
        console.log(res)
        emitter.emit('updateCart')
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        this.cart = res.data.data
        this.isLoading = false
        this.cartShow = false
        if (res.data.data.carts.length > 0) {
          this.cartShow = true
        }
      })
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.isLoading = true
      this.status.loadingItem = item.id
      this.$http.put(api, { data: cart }).then((res) => {
        this.isLoading = false
        this.getCart()
        this.status.loadingItem = ''
      })
    },
    deleteCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        emitter.emit('updateCart')
        this.getCart()
      })
    },
    deleteAllCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.$httpMessageState(res, '清空購物車')
        this.isLoading = false
        emitter.emit('updateCart')
        this.getCart()
        this.pushToProduct()
      })
    },
    addVoucherCode () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const voucherCode = {
        code: this.voucherCode
      }
      this.isLoading = true
      this.$http.post(api, { data: voucherCode }).then((res) => {
        console.log(res)
        this.$httpMessageState(res, '使用優惠券')
        this.isLoading = false
        this.getCart()
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.isLoading = true
      this.$http.post(api, { data: order }).then((res) => {
        console.log(res.data.orderId)
        this.$httpMessageState(res, '新增訂單')
        this.isLoading = false
        this.getCart()
        this.form = {
          user: {
            name: '',
            email: '',
            tel: '',
            address: ''
          },
          message: ''
        }
        this.$router.push(`/user/checkout/${res.data.orderId}`)
      })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '手機號碼格式錯誤'
    },
    addressValidate (text) {
      const address = /^台中市/
      return address.test(text) ? true : '外送限定台中市'
    },
    pushToProduct () {
      this.$router.push('/user/product')
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
