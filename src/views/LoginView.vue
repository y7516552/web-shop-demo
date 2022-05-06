<template>
  <div class="container " style="height:98vh">
    <div class="row h-100">
      <div class="col-md-6 col-12 ">
        <div class="d-flex align-items-center h-100 bg-info">
          <h2 class="text-center">login</h2>
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
              v-model="user.password">
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-primary mx-0 px-5">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/dashboard/products')
          }
        })
    }
  }
}
</script>
