<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">後台</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/products">ProductsList</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/orders">OrdersList</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/vouchers">VoucherList</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/articles">ArticleList</router-link>
          </li>
          <li class="nav-item dropdown ms-auto me-5">
            <button class="btn btn-secondary dropdown-toggle" type="button" @click.prevent="dropdown">
              使用者
            </button >
            <ul class="dropdown-menu" :class="{'show':  dropdownNav}">
              <li>
                <router-link class="dropdown-item" to="/login">Login</router-link>
              </li>
              <li>
                <a class="dropdown-item" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  data () {
    return {
      dropdownNav: false
    }
  },
  methods: {
    dropdown () {
      if (this.dropdownNav) {
        this.dropdownNav = false
      } else {
        this.dropdownNav = true
      }
    },
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>
