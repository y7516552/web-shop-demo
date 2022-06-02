<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid px-5">
      <router-link class="navbar-brand" to="/">
        <img class="logo" src="../img/taco.svg" alt="由 Twitter, CC BY 4.0, https://commons.wikimedia.org/w/index.php?curid=59969682">
        塔可餅車車
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="isLogin" class="collapse navbar-collapse" id="navbarNavDropdown">
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
              <li v-if="isLogin">
                <a class="dropdown-item" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-else class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100">
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/cart">美味精選</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/story">車車故事</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/dashboard/vouchers">優惠資訊</router-link>
          </li>
        </ul>
      </div>
      <dropdown-cart></dropdown-cart>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar-brand{
  font-weight: 900;
  .logo{
    width: 40px;
    height: 40px;
  }
}
</style>

<script>
import DropdownCart from '../components/DropdownCart.vue'
export default {
  props: ['isLogin'],
  components: {
    DropdownCart
  },
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
