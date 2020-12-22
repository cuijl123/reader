<template>
  <div class="similar" v-if="book">
    <router-link :to="{ path: 'bookDetail', query: { bookId: book.id } }">
      <img :src="book.images" :alt="book.name" />
      <h6>{{ book.name }}</h6>
      <p>{{ book.author }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "similar",
  props: ["bookId"],
  data() {
    return {
      book: null,
    };
  },
  watch: {
    bookId(value) {
      this.getBookDetail(value)
    },
  },
  methods: {
    getBookDetail(id) {
      this.$axios.get(`/booklist?id=${id}`).then((res) => {
        if (res.data.state == "success") {
          this.book = res.data.data;
        } else {
          this.$toast({
            message: "接口错误",
            
          });
        }
      });
    },
  },
  created() {
    this.getBookDetail(this.bookId);
  },
};
</script>

<style lang="less">
.horizontal-list {
  white-space: nowrap;
  overflow-x: auto;
  li {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    > a {
      display: block;
    }
    &:first-child {
      margin-left: 10px;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 100%;
      height: 125px;
    }
  }
}
</style>