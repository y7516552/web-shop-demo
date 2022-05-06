<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="text-end mt-5">
    <button class="btn btn-primary mt-5" type="button" @click.prevent="openModal(true)">新增文章</button>
  </div>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>發布日期</th>
          <th>文章標題</th>
          <th>發布人</th>
          <th>是否公開</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in articles" :key="item.id">
              <td>{{item.create_at}}</td>
              <td>{{item.title}}</td>
              <td>{{item.author}} %</td>
              <td>
                  <span class="text-success" v-if="item.isPublic"><strong>啟用</strong></span>
                  <span class="text-muted" v-else><strong>未啟用</strong></span>
              </td>
              <td>
                  <div class="btn-group  d-flex align-items-center">
                    <button class="btn btn-primary"
                      @click.prevent="">編輯</button>
                    <button class="btn btn-danger"
                      @click.prevent="">刪除</button>
                  </div>
              </td>
          </tr>
      </tbody>
    </table>
  </div>
  <pagination-bar :pages="pagination"
    @emit-pages="getArticles"></pagination-bar>
  <article-modal ref="articleModal"
    :article="tempArticle"
    @update-article="updateArticle"></article-modal>
  <del-modal ref="delModal"></del-modal>
</template>

<script>
import PaginationBar from '../components/PaginationBar.vue'
import ArticleModal from '../components/ArticleModal.vue'
import DelModal from '../components/DelModal.vue'

export default {
  data () {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    PaginationBar,
    ArticleModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getArticles (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.articles)
          this.isLoading = false
          if (res.data.success) {
            this.articles = res.data.articles
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (isNew, item, modal) {
      if (isNew) {
        this.tempArticle = {}
      } else {
        this.tempArticle = { ...item }
      }
      let ArticleComponent = this.$refs.articleModal
      if (modal === 'delete') {
        ArticleComponent = this.$refs.delModal
      }
      ArticleComponent.showModal()
      this.isNew = isNew
    },
    updateArticle (item) {
      this.tempArticle = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      // 判斷是否為編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`
        httpMethod = 'put'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          this.getArticles()
          this.$httpMessageState(res, '更新文章')
          articleComponent.hideModal()
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
