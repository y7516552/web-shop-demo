import Collapse from 'bootstrap/js/dist/collapse.js'

export default {
  methods: {
    CollapseToggle () {
      this.Collapse.toggle()
    }
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse)
  }
}
