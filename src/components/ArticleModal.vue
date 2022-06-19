<template>
  <div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal"
  >
  <div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增文章</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-3">
            <label for="image" class="form-label">輸入圖片網址</label>
            <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempArticle.image">
          </div>
          <div class="mb-3">
            <label for="customFile" class="form-label">或 上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customFile" class="form-control"
              @change="uploadFile" ref="fileInput">
          </div>
          <img class="img-fluid" alt="" :src="tempArticle.image">
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">文章標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入文章標題"
                    required
                    v-model="tempArticle.title">
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="author" class="form-label">發布者</label>
              <input type="text" class="form-control" id="author"
                      placeholder="請輸入發布者"
                      v-model="tempArticle.author">
            </div>
            <div class="mb-3 col-md-6">
              <label for="tag" class="form-label">標籤</label>
              <input type="text" class="form-control" id="tag"
                      placeholder="請輸入標籤"
                      required
                      v-model="tempArticle.tag" >
            </div>
          </div>

          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">文章簡述</label>
            <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入文章簡述"
                      v-model="tempArticle.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">文章內容</label>
            <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入文章內容"
                      required
                      v-model="tempArticle.content"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      id="isPublic"
                      v-model="tempArticle.isPublic">
              <label class="form-check-label" for="isPublic">
                是否公開
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click="hideModal">取消
      </button>
      <button type="button" class="btn btn-primary"
        @click="$emit('update-article',tempArticle)">確認</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    article: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    article () {
      this.tempArticle = this.article
      this.tempArticle.create_at = Math.floor(new Date().getTime() / 1000)
      if (!this.article.isPublic) {
        this.tempArticle.isPublic = false
      }
    }
  },
  data () {
    return {
      modal: {},
      tempArticle: {}
    }
  },
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempArticle.image = res.data.imageUrl
          }
        })
    }
  },
  mixins: [modalMixin]
}
</script>
