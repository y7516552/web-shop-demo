<template>
  <nav class="navbar navbar-expand-lg  fixed-top" :class=" active? 'navbar-dark bg-dark':'navbar-unactive' ">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img class="logo" src="../img/taco.svg" alt="由 Twitter, CC BY 4.0, https://commons.wikimedia.org/w/index.php?curid=59969682">
        塔可餅車車
      </router-link>
      <button class="navbar-toggler " type="button"
        @click.prevent="dropdown('dropdownNav')">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="isLogin" class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">前台</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/orders">訂單列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/vouchers">優惠券列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/articles">消息列表</router-link>
          </li>
          <li class="nav-item dropdown ms-auto">
            <button class="btn btn-secondary dropdown-toggle" type="button" @click.prevent="dropdown('dropdownAdmin')">
              使用者
            </button >
            <ul class="dropdown-menu" :class="{'show':  dropdownAdmin}">
              <li v-if="isLogin">
                <a class="dropdown-item" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-else class="navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100 justify-content-center align-items-center"
         :class="{'show':  dropdownNav}">
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/product">美味精選</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/story">車車故事</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/news">優惠資訊</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link" to="/user/orders">訂單查詢</router-link>
          </li>
        </ul>
      </div>
      <dropdown-likes :active="active"></dropdown-likes>
      <dropdown-cart :active="active"></dropdown-cart>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar-unactive{
  background-color: transparent;
  .container{

    a{
      color: #000;
    }
    .navbar-toggler{
      .navbar-toggler-icon{
        color: #000;
      }
    }
  }
}
.navbar-toggler{
  order: 1;
}
#navbarNavDropdown.navbar-collapse{
  order: 0;
}
@media (max-width: 992px) {
  #navbarNavDropdown.navbar-collapse{
    order: 1;
    transition: 1s;
    .navbar-nav{
      display: none;
      transition: 1s;
      &.show{
        display: flex;
      }
    }
  }
}
.navbar-brand{
  font-weight: 900;
  font-size: 2em;
  .logo{
    width: 40px;
    height: 40px;
  }
}
</style>

<script>
import DropdownLikes from '../components/DropdownLikes.vue'
import DropdownCart from '../components/DropdownCart.vue'
export default {
  props: ['isLogin'],
  components: {
    DropdownLikes,
    DropdownCart
  },
  data () {
    return {
      active: false,
      dropdownAdmin: false,
      dropdownNav: false
    }
  },
  methods: {
    handleScroll () {
      if (window.scrollY <= 0) this.active = false
      if (window.scrollY > 0) this.active = true
    },
    dropdown (item) {
      if (item === 'dropdownAdmin') {
        if (this.dropdownAdmin) {
          this.dropdownAdmin = false
        } else {
          this.dropdownAdmin = true
        }
      } else if (item === 'dropdownNav') {
        if (this.dropdownNav) {
          this.dropdownNav = false
        } else {
          this.dropdownNav = true
        }
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
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
