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
        <span>新增產品</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-6">
          <h5>封面圖</h5>
          <div class="mb-3">
            <label for="image" class="form-label">輸入圖片網址</label>
            <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">
          </div>
          <div class="mb-3">
            <label for="customFile" class="form-label">或 上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customFile" class="form-control"
              ref="fileInput"
              @change="uploadFile(true)">
          </div>
          <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
          <!-- 延伸技巧，多圖 -->
          <div class="mt-5">
            <h5>其他圖</h5>
            <div>
              <button v-if="!openImgInput" type="button" class="btn btn-outline-primary btn-sm d-block w-100"
                @click="InputControl">
                新增圖片
              </button>
            </div>
            <div class="row">
              <div class="col-6"  v-if="openImgInput">
                <div class="mb-3" >
                  <input type="url" class="form-control form-control"
                    placeholder="請輸入連結"
                    v-model="tempImages">
                  <input type="file" id="customFile" class="form-control"
                    ref="fileInput"
                    @change="uploadFile(false)">
                  <img class="img-fluid" alt="" :src="tempImages">
                  <div class="mt-1">
                    <button type="button" class="btn btn-outline-danger"
                      @click="InputControl">
                        取消
                    </button>
                    <button type="button" class="btn btn-outline-success"
                      @click="addImages">
                        新增
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="tempProduct.imagesUrl">
              <div class="col-6" v-for="(img, index) in tempProduct.imagesUrl" :key="img">
                <div class="mb-3" >
                  <label for="images" class="form-label">圖片 {{ index+1 }}</label>
                  <input type="url" class="form-control form-control" id="images"
                          placeholder="請輸入連結"
                          v-model="tempProduct.imagesUrl[index]">
                  <img class="img-fluid" alt="" :src="tempProduct.imagesUrl[index]">
                  <button type="button" class="btn btn-outline-danger mt-1"
                    @click="deleteImg(index)">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"
                    required
                    v-model="tempProduct.title">
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input type="text" class="form-control" id="unit"
                      placeholder="請輸入單位"
                      required
                      v-model="tempProduct.unit" >
            </div>
          </div>

          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價"
                      required
                      v-model="tempProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價"
                      required
                      v-model="tempProduct.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容"
                      v-model="tempProduct.content"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
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
        @click="$emit('update-product',tempProduct)">確認</button>
    </div>
  </div>
</div>
</div>

</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    product: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {
        imagesUrl: []
      },
      tempImages: '',
      openImgInput: false
    }
  },
  methods: {
    showModal () {
      this.modal.show()
      this.tempImages = ''
      this.$refs.fileInput.value = ''
      this.openImgInput = false
    },
    hideModal () {
      this.tempProduct = {}
      this.tempImages = ''
      this.modal.hide()
    },
    uploadFile (type, index) {
      const uploadedFile = this.$refs.fileInput.files[0]
      console.dir(uploadedFile)
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      console.dir(formData)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData)
        .then((res) => {
          console.log(res.data)
          this.$httpMessageState(res, '新增檔案')
          if (res.data.success) {
            if (type) {
              this.tempProduct.imageUrl = res.data.imageUrl
            } else {
              this.tempImages = res.data.imageUrl
            }
          }
        })
    },
    InputControl () {
      if (!this.openImgInput) {
        this.openImgInput = true
      } else {
        this.openImgInput = false
      }
    },
    deleteImg (index) {
      this.tempProduct.imagesUrl.splice(index, 1)
    },
    addImages () {
      console.log(this.tempProduct.imagesUrl)
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      this.tempProduct.imagesUrl.push(this.tempImages)
      this.tempImages = ''
      this.openImgInput = false
    }
  },
  mixins: [modalMixin]
}
</script>
