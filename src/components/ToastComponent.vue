<template>
  <div class="toast mt-3" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import ToastMsg from 'bootstrap/js/dist/toast'
export default {
  name: 'ToastMsg',
  props: [
    'msg'
  ],
  mounted () {
    const toastEl = this.$refs.toast
    const toast = new ToastMsg(toastEl, {
      delay: 3000
    })
    toast.show()
  }
}
</script>
