<template>
  <h3 class="section-title news">最新消息</h3>
  <div class="row position-relative py-5">
    <table class="table table-light table-striped">
      <tbody>
          <tr v-for="(item, key) in news" :key="item">
            <td>{{$filters.date(item.create_at)}}</td>
            <td>{{item.tag}}</td>
            <td width="50"><span v-if="key < 1" class="text-danger">New!!</span></td>
            <td><a class="news-link" href="/news">{{item.title}}</a></td>
          </tr>
      </tbody>
    </table>
    <div class="text-end mt-5">
      <router-link class="btn-more" to="/news">更多消息?</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.section-title.news{
  color:#666;
}
.news-link{
  color: #000;
  font-weight: 700;
  &:hover{
    color:#fff;
  }
}
</style>

<script>
export default {
  data () {
    return {
      news: {}
    }
  },
  methods: {
    getNews (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.articles)
          this.isLoading = false
          if (res.data.success) {
            this.news = res.data.articles
          }
        })
    }
  },
  created () {
    this.getNews()
  }
}
</script>
