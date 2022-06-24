<template>
  <div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal"
  >
  <div class="modal-dialog modal-dialog-centered  modal-sm" role="document">
  <div class="modal-content border-0">
    <div class="modal-header text-white"
      :class="{'bg-success': msg.success , 'bg-danger' : !msg.success}">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>{{msg.title}}</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row" v-if="msg.product">
        <div class="my-3"
          v-if="msg.success">
            <div class="logo-icon"></div>
            <p class="fs-2 text-center">{{ msg.product.title }}</p>
            <p class="fs-5 text-center">{{ msg.qty }} / {{ msg.product.unit }}</p>
        </div>
        <div v-else class="my-3">
            <p class="fs-2 text-center">{{ msg.product.title }}</p>
        </div>
      </div>
      <div v-else class="row">
        <div class="my-3">
          <p class="fs-2 text-center">{{ msg.title }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success"
        :class="{'btn-success': msg.success , 'btn-danger' : !msg.success}"
        @click.prevent="hideModal">確認</button>
    </div>
  </div>
</div>
</div>
</template>
<style lang="scss">
.logo-icon{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background-image: url('../img/taco.svg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 80px;
    height: 80px;
}
</style>
<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    msg: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      modal: {}
    }
  },
  mixins: [modalMixin]
}
</script>
