<template>
  <div class="container " style="height:98vh">
    <div class="row h-100">
      <div class="col-md-6 col-12 ">
        <div class="login-bg">
          <h2 class="text-center">後台管理</h2>
          <h3 class="text-center">塔可餅車車</h3>
        </div>
      </div>
      <div class="col-md-6 col-12 h-100 d-flex align-items-center ">
        <form class="flex-column justify-content-center align-items-center  w-100"  @submit.prevent="signIn">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              autofocus
              required
              v-model="user.username">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              autocomplete="on"
              v-model="user.password">
            <label for="floatingPassword">Password</label>
          </div>
          <button @click="signIn()" class="btn btn-primary mx-0 px-5">登入</button>
        </form>
      </div>
    </div>
    <message-modal ref="messageModal"
    :msg="msgModal"></message-modal>
  </div>
</template>

<style lang="scss">
.login-bg{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  background-image: url("../img/banner/b-2.jpg") ;
  background-size: 100%;
  background-repeat: no-repeat;
  h2,
  h3{
    transform: translateY(250%);
  }
}
</style>

<script>
import MessageModal from '../components/MessageModal.vue'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      msgModal: {
        title: '登入失敗...',
        success: ''
      }
    }
  },
  components: {
    MessageModal
  },
  methods: {
    signIn () {
      const messageComponent = this.$refs.messageModal
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/dashboard/products')
          } else {
            this.msgModal.success = false
            messageComponent.showModal()
          }
        })
    },
    checkLogin () {
      const url = `${process.env.VUE_APP_API}api/user/check`
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.post(url, token)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/dashboard/products')
          }
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
