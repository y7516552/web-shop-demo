import Modal from 'bootstrap/js/dist/modal.js'

export default {
  methods: {
    showModal () {
      this.modal.show()
    },
    hideModal () {
      // this.tempProduct = {}
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
