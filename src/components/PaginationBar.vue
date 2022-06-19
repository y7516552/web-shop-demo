<template>
   <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage (-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{ 'active': page === pages.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePages(page)"> {{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next"  @click.prevent="changePage (1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav{
  .pagination{
    .page-item{
      &.active{
        .page-link{
          border-color: #000;
          background-color: #fff;
          color: #000;
        }
      }
      .page-link{
        background-color: #000;
        color: #fff;
        font-weight: 700;
      }
    }
  }
}
</style>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePages (page) {
      this.$emit('emit-pages', page)
    },
    changePage (e) {
      this.$emit('emit-pages', this.pages.current_page + e)
    }
  }
}
</script>
